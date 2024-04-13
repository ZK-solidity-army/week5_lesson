"use client";

import { useCallback, useContext, useState } from "react";
import TransactionList from "./TransactionList";
import { twMerge } from "tailwind-merge";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import * as chains from "wagmi/chains";
import { ContractContext } from "~~/context";
import deployedContracts from "~~/contracts/deployedContracts";
import { formatEth } from "~~/utils/formatEth";

export default function PurchaseTokens({ className }: { className?: string }) {
  const [amount, setAmount] = useState<string>("");
  const [txHashes, setTxHashes] = useState<string[]>([]);

  const contractContext = useContext(ContractContext);
  const tokenSymbol = contractContext.tokenSymbol || "'Unknown'";

  const { isLoading, write } = useContractWrite({
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

  const onSubmit = useCallback(() => {
    if (!amount) return;
    if (isLoading) return;

    write({
      value: parseEther(amount),
    });
  }, [amount, isLoading, write]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <div className={twMerge("card mt-2", className)}>
      <div className="card-body">
        <div className="md:w-[310px]">
          <div className="w-full mb-2 relative">
            <span className="absolute right-3 top-4 text-2xl text-neutral-500">SEP</span>
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
              You will receive{" "}
              {getTokenAmount(amount, contractContext.purchaseRatio, contractContext.tokenDecimals || 0)} {tokenSymbol}{" "}
              tokens
            </div>
          ) : null}
          <div>
            <button className="btn btn-lg w-full" onClick={onSubmit}>
              Buy Tokens
            </button>
          </div>
          <TransactionList className="mt-8" txHashes={txHashes} />
        </div>
      </div>
    </div>
  );
}

const getTokenAmount = (_amount: string, ratio: bigint, decimals: number) => {
  let amount: bigint;
  try {
    amount = parseEther(_amount);
  } catch {
    return "0";
  }

  console.log(BigInt(amount) * ratio);
  console.log(amount, ratio, formatEth(BigInt(amount) * ratio, decimals));

  return formatEth(BigInt(amount) * ratio, decimals);
};
