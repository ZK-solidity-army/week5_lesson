import { useState } from "react";
import Link from "next/link";
import * as chains from "viem/chains";
import { useWaitForTransaction } from "wagmi";
import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";
import { getBlockExplorerTxLink } from "~~/utils/scaffold-eth";

export default function Transaction({ txHash, size }: { txHash: `0x${string}`; size?: number }) {
  const [isSuccess, setIsSuccess] = useState(false);

  useWaitForTransaction({
    chainId: chains.sepolia.id,
    hash: txHash,
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  return (
    <Link target="_blank" href={getBlockExplorerTxLink(chains.sepolia.id, txHash)} className="whitespace-nowrap">
      <span className="pb-1">
        {isSuccess ? (
          <CheckIcon className="w-5 h-5 inline-block" />
        ) : (
          <ArrowPathIcon className="w-5 h-5 inline-block" />
        )}{" "}
      </span>
      <span className="align-middle">{truncate(txHash, size || 30)}</span>
      {/*
      {isSuccess ? "✅": "⏳ "} {truncate(txHash, 20)}
      */}
    </Link>
  );
}

const truncate = (str: string, n: number) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};
