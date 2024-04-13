"use client";

import { useCallback, useState } from "react";
import TransactionList from "./TransactionList";
import { twMerge } from "tailwind-merge";
import { parseEther } from "viem";
import { useContractRead, useContractWrite } from "wagmi";
import * as chains from "wagmi/chains";
import { LOTTERY_ADDRESS } from "~~/config";
import deployedContracts from "~~/contracts/deployedContracts";
import { formatEth } from "~~/utils/formatEth";

// TODO: retrieve decimals from contract
const DECIMALS = 18;

export default function PurchaseTokens({ className }: { className?: string }) {
  const [amount, setAmount] = useState<string>("");
  const [txHashes, setTxHashes] = useState<string[]>([]);

  const { data: purchaseRatio } = useContractRead({
    address: LOTTERY_ADDRESS,
    abi: deployedContracts[chains.sepolia.id].Lottery.abi,
    functionName: "purchaseRatio",
  });

  const { isLoading, write } = useContractWrite({
    address: LOTTERY_ADDRESS,
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
          {amount && purchaseRatio ? (
            <div className="text-neutral-500 text-sm my-3">
              You will receive {getG9LTAmount(amount, purchaseRatio)} G9LT tokens
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

const getG9LTAmount = (_amount: string, ratio: bigint) => {
  let amount: bigint;
  try {
    amount = parseEther(_amount);
  } catch {
    return "0";
  }

  console.log(BigInt(amount) * ratio);
  console.log(amount, ratio, formatEth(BigInt(amount) * ratio, DECIMALS));

  return formatEth(BigInt(amount) * ratio, DECIMALS);
};
