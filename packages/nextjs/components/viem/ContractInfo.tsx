import { useContext } from "react";
import Image from "next/image";
import EthIcon from "../svg/EthIcon";
import BalanceOfTokens from "./BalanceOfTokens";
import { blo } from "blo";
import { twMerge } from "tailwind-merge";
import { formatEther } from "viem";
import { useAccount, useBalance, useContractRead } from "wagmi";
import * as chains from "wagmi/chains";
import { CurrencyDollarIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { ContractContext } from "~~/context";
import deployedContracts from "~~/contracts/deployedContracts";
import formatUnits from "~~/utils/formatUnits";

export default function ContractInfo({ className }: { className?: string }) {
  const account = useAccount();
  const { data: ethBalance } = useBalance({ address: account.address, watch: true });
  const contractContext = useContext(ContractContext);

  let tokenPrice = "...";
  const tokenDecimals = contractContext.tokenDecimals;

  //TODO: merge requests in one
  const { data: prize } = useContractRead({
    address: contractContext.lotteryAddress,
    abi: deployedContracts[chains.sepolia.id].Lottery.abi,
    functionName: "prize",
    args: [account.address as "string"],
    watch: true,
  });

  const { data: prizePool } = useContractRead({
    address: contractContext.lotteryAddress,
    abi: deployedContracts[chains.sepolia.id].Lottery.abi,
    functionName: "prizePool",
    watch: true,
  });

  if (!account || !account.isConnected) return null;
  if (!account.address) return null;

  if (contractContext.betPrice && typeof contractContext.tokenDecimals !== "undefined") {
    tokenPrice = formatUnits(contractContext.betPrice, contractContext.tokenDecimals, 5);
  }

  return (
    <div className="mx-4 md:mx-0">
      <div className={twMerge("stats shadow text-left stats-vertical lg:stats-horizontal w-full md:w-auto", className)}>
        <div className="stat">
          <div className="stat-figure text-primary">
            <EthIcon className="inline-block w-8 h-8 stroke-current" />
          </div>
          <span className="stat-title">Sepolia ETH</span>

          <div className="stat-value text-primary">
            {ethBalance ? Number(ethBalance.formatted).toFixed(4) : "error"}
          </div>
          <div className="stat-desc">Your sepolia network balance</div>
        </div>

        <BalanceOfTokens address={account.address as `0x{string}`} />

        <div className="stat">
          <div className="stat-figure text-accent">
            <CurrencyDollarIcon className="inline-block w-7 h-7 stroke-current stroke-1" />
          </div>
          <div className="stat-title">Bet price</div>
          <div className="stat-value text-accent">{tokenPrice}</div>
          <div className="stat-desc">Min bet price</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-warning">
            <TrophyIcon className="inline-block w-7 h-7 stroke-current stroke-2" />
            {/*
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            */}
          </div>
          <div className="stat-title">Price pool</div>
          <div className="stat-value text-warning">
            {prizePool && typeof tokenDecimals !== "undefined" ? formatUnits(prizePool, tokenDecimals, 5) : 0}
          </div>
          <div className="stat-desc">Total prize pool</div>
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
          <div className="stat-title">Won</div>
          <div className="stat-value">{prize ? formatEther(prize) : 0}</div>
          <div className="stat-desc">You can withdraw</div>
        </div>
      </div>
    </div>
  );
}
