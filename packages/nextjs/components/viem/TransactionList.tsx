import Transaction from "./Transaction";
import { twMerge } from "tailwind-merge";

export default function TransactionList({ txHashes, className }: { txHashes: string[]; className?: string }) {
  return (
    <p className={twMerge("mt-5 mb-2", className)}>
      <ul>
        {txHashes.map(txHash => (
          <li key={txHash}>
            <Transaction txHash={txHash as `0x${string}`} />
          </li>
        ))}
      </ul>
    </p>
  );
}
