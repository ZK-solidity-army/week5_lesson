import Transaction from "./Transaction";
import { twMerge } from "tailwind-merge";

export default function TransactionList({
  txHashes,
  className,
  size,
}: {
  txHashes: string[];
  className?: string;
  size?: number;
}) {
  if (!txHashes.length) return null;
  return (
    <p className={twMerge("mt-5 mb-2", className)}>
      <ul>
        {txHashes.map(txHash => (
          <li key={txHash}>
            <Transaction txHash={txHash as `0x${string}`} size={size} />
          </li>
        ))}
      </ul>
    </p>
  );
}
