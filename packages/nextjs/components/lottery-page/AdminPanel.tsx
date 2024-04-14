"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { twMerge } from "tailwind-merge";
import * as chains from "wagmi/chains";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CloseBets from "~~/components/viem/CloseBets";
import OpenBets from "~~/components/viem/OpenBets";
import { LOTTERY_ADDRESSES } from "~~/config";
import { ContractContext } from "~~/context";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";
import { middleTruncate } from "~~/utils/truncate";

const AdminPanel: NextPage = () => {
  const contractContext = useContext(ContractContext);
  const dotClassName = twMerge(
    "relative",
    "before:content-[''] before:absolute before:w-full before:h-0 before:border-b-[0.125rem] before:border-dotted",
    "before:leading-0 before:bottom-1 before:border-base-content before:z-0",
    "flex flex-row justify-between items-center my-2",
  );
  const dotItemClassName = "bg-base-200 relative px-2";
  const dropdownRef = useRef(null);
  useOutsideClick(
    dropdownRef,
    useCallback(() => {
      if (dropdownRef.current) {
        (dropdownRef.current as any).open = false;
      }
    }, [dropdownRef]),
  );

  const defaultLotteryContractAddress = LOTTERY_ADDRESSES.length ? LOTTERY_ADDRESSES[0] : "";
  const [lotteryContractAddress, setLotteryContractAddress] = useState<string>(() => {
    return localStorage.getItem("lotteryContractAddress") || defaultLotteryContractAddress;
  });

  useEffect(() => {
    if (contractContext.lotteryAddress === lotteryContractAddress) return;
    if (!contractContext.setContractContext) return;
    contractContext.setContractContext({
      ...contractContext,
      lotteryAddress: lotteryContractAddress as `0x${string}`,
    });
  }, [lotteryContractAddress, contractContext]);

  const onSelectContract = useCallback(
    (address: `0x${string}`) => {
      setLotteryContractAddress(address);
      if (contractContext.setContractContext) {
        contractContext.setContractContext({
          ...contractContext,
          lotteryAddress: address,
        });
      }

      if (dropdownRef.current) {
        (dropdownRef.current as any).open = false;
      }
    },
    [setLotteryContractAddress, contractContext],
  );
  const onChangeContract = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLotteryContractAddress(e.target.value);
      //TODO: add throttle
      if (contractContext.setContractContext) {
        contractContext.setContractContext({
          ...contractContext,
          lotteryAddress: e.target.value as `0x${string}`,
        });
      }
    },
    [setLotteryContractAddress, contractContext],
  );

  useEffect(() => {
    localStorage.setItem("lotteryContractAddress", lotteryContractAddress);
  }, [lotteryContractAddress]);

  return (
    <div className="card">
      <div className="text-center">
        <div className="my-2">You can point any address for Lottery smartcontract</div>
        <input
          type="text"
          className="input sm:w-96 text-sm"
          value={lotteryContractAddress}
          onChange={onChangeContract}
        ></input>

        <details className="dropdown" ref={dropdownRef}>
          <summary className="btn m-1 shadow-none">
            {middleTruncate(lotteryContractAddress, 20)}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </summary>
          <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] rounded-box bg-base-300">
            {LOTTERY_ADDRESSES.map(address => (
              <li
                key={address}
                role="menuitem"
                tabIndex={-1}
                onClick={() => onSelectContract(address)}
                className="btn btn-ghost"
              >
                {middleTruncate(address, 20)}
              </li>
            ))}
          </ul>
        </details>
        <div className="max-w-[31.25rem] mx-auto my-5 text-sm">
          <div className={dotClassName}>
            <div className={dotItemClassName}>Lottery address</div>
            <div className={dotItemClassName}>
              {contractContext.lotteryAddress ? (
                <Link
                  href={getBlockExplorerAddressLink(chains.sepolia, contractContext.lotteryAddress)}
                  target="_blank"
                  className="link"
                >
                  {middleTruncate(contractContext.lotteryAddress, 20)}
                </Link>
              ) : (
                "Unknown"
              )}
            </div>
          </div>
          <div className={dotClassName}>
            <div className={dotItemClassName}>Token address</div>
            <div className={dotItemClassName}>
              {contractContext.tokenAddress ? (
                <Link
                  href={getBlockExplorerAddressLink(chains.sepolia, contractContext.tokenAddress)}
                  target="_blank"
                  className="link"
                >
                  {middleTruncate(contractContext.tokenAddress, 20)}
                </Link>
              ) : (
                "Unknown"
              )}
            </div>
          </div>
          <div className={dotClassName}>
            <div className={dotItemClassName}>Token name</div>
            <div className={dotItemClassName}>{contractContext.tokenName || "Unknown"}</div>
          </div>
          <div className={dotClassName}>
            <div className={dotItemClassName}>Token symbol</div>
            <div className={dotItemClassName}>{contractContext.tokenSymbol || "Unknown"}</div>
          </div>
          <div className={dotClassName}>
            <div className={dotItemClassName}>Purchase ratio</div>
            <div className={dotItemClassName}>
              {contractContext.purchaseRatio ? `1/${contractContext.purchaseRatio}` : "Unknown"}
            </div>
          </div>
        </div>
      </div>
      <div className="card-body md:flex md:flex-row md:justify-around">
        <OpenBets className="md:w-[18.75rem]" />
        <div className="divider md:divider-horizontal"></div>
        <CloseBets className="md:w-[18.75rem]" />
      </div>
    </div>
  );
};

export default AdminPanel;
