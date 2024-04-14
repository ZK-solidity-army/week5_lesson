"use client";

import { useCallback, useContext, useState } from "react";
import TransactionList from "./TransactionList";
import { twMerge } from "tailwind-merge";
import { parseEther, parseUnits } from "viem";
import { useContractWrite } from "wagmi";
import * as chains from "wagmi/chains";
import ErrorBlock from "~~/components/Error";
import { ContractContext } from "~~/context";
import deployedContracts from "~~/contracts/deployedContracts";
import formatUnits from "~~/utils/formatUnits";

export default function PurchaseTokens({ className }: { className?: string }) {
  const [amount, setAmount] = useState<string>("");
  const [txHashes, setTxHashes] = useState<string[]>([]);

  const contractContext = useContext(ContractContext);
  const tokenSymbol = contractContext.tokenSymbol || "'Unknown'";

  const { isLoading, write, error } = useContractWrite({
    address: contractContext.lotteryAddress,
    abi: deployedContracts[chains.sepolia.id].Lottery.abi,
    functionName: "purchaseTokens",
    onSuccess: useCallback(
      (data: { hash: string }) => {
        setTxHashes(prev => [data.hash, ...prev]);
      },
      [setTxHashes],
    ),
  });

  const {
    isLoading: approveIsLoading,
    write: approve,
    error: approveError,
  } = useContractWrite({
    address: contractContext.tokenAddress,
    abi: deployedContracts[chains.sepolia.id].LotteryToken.abi,
    functionName: "approve",
    onSuccess: useCallback(
      (data: { hash: string }) => {
        setTxHashes(prev => [data.hash, ...prev]);
      },
      [setTxHashes],
    ),
  });

  const onSubmit = useCallback(() => {
    if (!amount) return;
    if (isLoading) return;
    if (!contractContext.purchaseRatio) return;

    const ethAmount = getEthAmount(amount, contractContext.purchaseRatio);
    if (!ethAmount) return;

    write({
      value: ethAmount,
    });
  }, [amount, isLoading, write, contractContext]);

  const onApprove = useCallback(() => {
    if (!amount) return;
    if (approveIsLoading) return;
    if (!contractContext.lotteryAddress) return;
    if (!contractContext.tokenDecimals) return;

    const unitsAmount = parseUnits(amount, contractContext.tokenDecimals);
    if (!unitsAmount) return;

    approve({
      args: [contractContext.lotteryAddress, unitsAmount],
    });
  }, [amount, approveIsLoading, approve, contractContext]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <div className={twMerge("card mt-2", className)}>
      <div className="card-body">
        <div className="md:w-[19.375rem]">
          <div className="w-full mb-2 relative">
            <span className="absolute right-3 top-4 text-2xl text-neutral-500">{tokenSymbol}</span>
            <input
              type="text"
              placeholder="Amount"
              className="input input-bordered w-full max-w-xs input-lg text-2xl pr-20"
              defaultValue={amount}
              onChange={onChange}
            />
          </div>
          {amount && contractContext.purchaseRatio ? (
            <div className="text-neutral-500 text-sm my-3">
              It costs{" "}
              {formatUnits(getEthAmount(amount, contractContext.purchaseRatio), contractContext.tokenDecimals || 0)} SEP
              to buy
            </div>
          ) : null}
          <div>
            <button className="btn btn-lg w-full mb-2" onClick={onSubmit}>
              Buy Tokens
            </button>
            <button className="btn btn-lg w-full" onClick={onApprove}>
              Approve
            </button>
          </div>
          <ErrorBlock className="text-center mt-4" error={error} />
          <ErrorBlock className="text-center mt-4" error={approveError} />
          <TransactionList className="mt-8" txHashes={txHashes} />
        </div>
      </div>
    </div>
  );
}

const getEthAmount = (_amount: string, ratio: bigint) => {
  let amount: bigint;
  try {
    amount = parseEther(_amount);
  } catch {
    return 0n;
  }

  return amount / ratio;
};
