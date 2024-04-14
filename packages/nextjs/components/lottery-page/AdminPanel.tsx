"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import * as chains from "wagmi/chains";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import InfoRow from "~~/components/base/InfoRow";
import CloseBets from "~~/components/viem/CloseBets";
import OpenBets from "~~/components/viem/OpenBets";
import { LOTTERY_ADDRESSES } from "~~/config";
import { ContractContext } from "~~/context";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import formatUnits from "~~/utils/formatUnits";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";
import { middleTruncate } from "~~/utils/truncate";

const AdminPanel: NextPage = () => {
  const contractContext = useContext(ContractContext);
  const account = useAccount();
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

  const isOwner = useCallback(() => {
    if (!account || !account.address) return false;
    return contractContext.ownerAddress === account.address.toLowerCase();
  }, [contractContext, account]);

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
          <InfoRow title="Lottery address">
            <>
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
            </>
          </InfoRow>
          <InfoRow title="Token address">
            <>
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
            </>
          </InfoRow>
          <InfoRow title="Token name">{contractContext.tokenName || "Unknown"}</InfoRow>
          <InfoRow title="Token symbol">{contractContext.tokenSymbol || "Unknown"}</InfoRow>
          <InfoRow title="Purchase ratio">
            {contractContext.purchaseRatio ? `1/${contractContext.purchaseRatio}` : "Unknown"}
          </InfoRow>
          <InfoRow title="Bet price">
            {contractContext.betPrice &&
            typeof contractContext.tokenDecimals !== "undefined" &&
            contractContext.tokenSymbol
              ? `${formatUnits(contractContext.betPrice, contractContext.tokenDecimals, 5)} ${
                  contractContext.tokenSymbol
                }`
              : "Unknown"}
          </InfoRow>
          <InfoRow title="Bet fee">
            {contractContext.betFee &&
            typeof contractContext.tokenDecimals !== "undefined" &&
            contractContext.tokenSymbol
              ? `${formatUnits(contractContext.betFee, contractContext.tokenDecimals, 5)} ${
                  contractContext.tokenSymbol
                }`
              : "Unknown"}
          </InfoRow>
          <InfoRow title="Prize pool">
            {contractContext.prizePool &&
            typeof contractContext.tokenDecimals !== "undefined" &&
            contractContext.tokenSymbol
              ? `${formatUnits(contractContext.prizePool, contractContext.tokenDecimals, 5)} ${
                  contractContext.tokenSymbol
                }`
              : 0}
          </InfoRow>
          <InfoRow title="Owner pool">
            {contractContext.ownerPool &&
            typeof contractContext.tokenDecimals !== "undefined" &&
            contractContext.tokenSymbol
              ? `${formatUnits(contractContext.ownerPool, contractContext.tokenDecimals, 5)} ${
                  contractContext.tokenSymbol
                }`
              : 0}
          </InfoRow>
          <InfoRow title="Status">
            {typeof contractContext.betsOpen !== "undefined" ? (
              contractContext.betsOpen ? (
                <span className="text-success">Open</span>
              ) : (
                <span className="text-error">Closed</span>
              )
            ) : (
              "Unknown"
            )}
          </InfoRow>
          {contractContext.betsOpen && contractContext.betsClosingTime ? (
            <InfoRow title="Bets closing time">
              {new Date(Number(contractContext.betsClosingTime) * 1000).toLocaleString()}
            </InfoRow>
          ) : null}
          <InfoRow title="Is owner">
            {typeof contractContext.ownerAddress !== "undefined" ? (
              isOwner() ? (
                <span className="text-success">Yes</span>
              ) : (
                <span className="text-error">No</span>
              )
            ) : (
              "Unknown"
            )}
          </InfoRow>
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
