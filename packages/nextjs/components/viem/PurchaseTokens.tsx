"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import TransactionList from "./TransactionList";
import cn from "classnames";
import { twMerge } from "tailwind-merge";
import { encodeFunctionData, parseEther, parseUnits } from "viem";
import { useAccount, useBalance, useContractWrite, useFeeData, usePublicClient } from "wagmi";
import * as chains from "wagmi/chains";
import ErrorBlock from "~~/components/Error";
import { ContractContext } from "~~/context";
import deployedContracts from "~~/contracts/deployedContracts";
import formatUnits from "~~/utils/formatUnits";

export default function PurchaseTokens({ className }: { className?: string }) {
  const account = useAccount();
  const publicClient = usePublicClient({ chainId: chains.sepolia.id });
  const [amount, setAmount] = useState<string>("");
  const [txHashes, setTxHashes] = useState<string[]>([]);
  const [gasPrice, setGasPrice] = useState<bigint>(0n);

  const contractContext = useContext(ContractContext);
  const tokenSymbol = contractContext.tokenSymbol || "Unknown";
  const { data: balance } = useBalance({ address: account.address, watch: true });
  const { data: feeData } = useFeeData({ watch: true });

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

  useEffect(() => {
    if (!amount) return;
    if (!contractContext.purchaseRatio) return;
    if (!account) return;
    if (!feeData) return;

    const ethAmount = getEthAmount(amount, contractContext.purchaseRatio);
    if (!ethAmount) return;

    publicClient
      .estimateGas({
        account: account.address as `0x${string}`,
        to: contractContext.lotteryAddress,
        data: encodeFunctionData({
          abi: deployedContracts[chains.sepolia.id].Lottery.abi,
          functionName: "purchaseTokens",
        }),
        value: ethAmount,
      })
      .then(gas => {
        if (!feeData.maxFeePerGas) return;
        setGasPrice(gas * feeData.maxFeePerGas);
      });
  }, [account, amount, contractContext, publicClient, setGasPrice, feeData]);

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
            <span className="absolute block right-3 top-4 text-2xl text-neutral-500 md:max-w-[6.25rem] whitespace-nowrap text-ellipsis overflow-hidden">
              {tokenSymbol}
            </span>
            <input
              type="text"
              placeholder="Amount"
              className="input input-bordered w-full input-lg text-2xl pr-20"
              defaultValue={amount}
              onChange={onChange}
            />
          </div>
          {parseFloat(amount) && contractContext.purchaseRatio ? (
            <div
              className={cn(
                "text-sm my-3",
                getEthAmount(amount, contractContext.purchaseRatio) + (gasPrice || 0n) >
                  ((balance && balance.value) || 0n)
                  ? "text-error"
                  : "text-neutral-500",
              )}
            >
              <div>
                It costs{" "}
                {formatUnits(
                  getEthAmount(amount, contractContext.purchaseRatio) + gasPrice,
                  contractContext.tokenDecimals || 0,
                )}{" "}
                SEP to buy
              </div>
              {gasPrice ? (
                <div>
                  {formatUnits(getEthAmount(amount, contractContext.purchaseRatio), contractContext.tokenDecimals || 0)}{" "}
                  price and {formatUnits(gasPrice, contractContext.tokenDecimals || 0)} gas fee
                </div>
              ) : null}
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
