import Image from "next/image";
import EthIcon from "../svg/EthIcon";
import BalanceOfTokens from "./BalanceOfTokens";
import { blo } from "blo";
import { twMerge } from "tailwind-merge";
import { useAccount } from "wagmi";

export default function ContractInfo({ className }: { className?: string }) {
  const account = useAccount();
  if (!account || !account.isConnected) return null;
  if (!account.address) return null;

  return (
    <div className={twMerge("stats shadow text-left", className)}>
      <div className="stat">
        <div className="stat-figure text-primary">
          <EthIcon className="inline-block w-8 h-8 stroke-current" />
        </div>
        <div className="stat-title">Sepolia ETH</div>
        <div className="stat-value text-primary">25.612</div>
        <div className="stat-desc">Your sepolia network balance</div>
      </div>

      <BalanceOfTokens />

      <div className="stat">
        <div className="stat-figure text-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div className="stat-title">Won</div>
        <div className="stat-value text-accent">31</div>
        <div className="stat-desc">How many G9LT you won</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <Image
                src={blo(account.address as `0x${string}`)}
                alt="Etherium identicon"
                fill={true}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="stat-value">7 </div>
        <div className="stat-title">Bets done</div>
        <div className="stat-desc text-secondary">of 80 bets total</div>
      </div>
    </div>
  );
}