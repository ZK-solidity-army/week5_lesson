"use client";

import { useCallback, useContext, useRef, useState } from "react";
import TransactionList from "./TransactionList";
import Lottie, { LottieRef } from "lottie-react";
import { formatUnits } from "viem";
import { useContractWrite } from "wagmi";
import * as chains from "wagmi/chains";
import bet from "~~/assets/lottie/bet.json";
import ErrorBlock from "~~/components/Error";
import InfoRow from "~~/components/base/InfoRow";
import { ContractContext } from "~~/context";
import deployedContracts from "~~/contracts/deployedContracts";

export default function MakeBet({ className }: { className?: string }) {
  const [amount, setAmount] = useState<string>("1");
  const [txHashes, setTxHashes] = useState<string[]>([]);

  const lottieRef: LottieRef = useRef(null);
  const contractContext = useContext(ContractContext);

  const { write, error } = useContractWrite({
    address: contractContext.lotteryAddress,
    abi: deployedContracts[chains.sepolia.id].Lottery.abi,
    functionName: "betMany",
    onSuccess: useCallback(
      (data: { hash: string }) => {
        setTxHashes(prev => [data.hash, ...prev]);
      },
      [setTxHashes],
    ),
  });

  const onSubmit = useCallback(async () => {
    if (!amount) return;
    write({
      args: [BigInt(amount)],
    });
    lottieRef.current && lottieRef.current.goToAndPlay(5, true);
  }, [lottieRef, amount, write]);

  const onLottieClick = useCallback(() => {
    lottieRef.current && lottieRef.current.goToAndPlay(10, true);
  }, [lottieRef]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(e.target.value);
    },
    [setAmount],
  );

  // calculate totalPrice and totalFee
  const amountNum = BigInt(amount) || 0n;
  const totalPrice = contractContext.betPrice ? contractContext.betPrice * amountNum : 0n;
  const totalFee = contractContext.betFee ? contractContext.betFee * amountNum : 0n;

  return (
    <div className={className}>
      <label className="label">
        <span className="label-text">How many tickets would you like to buy?</span>
      </label>
      <div className="md:w-56 md:mx-auto">
        <Lottie
          animationData={bet}
          className="w-56 h-56 mx-auto"
          loop={false}
          onClick={onLottieClick}
          lottieRef={lottieRef}
        />
        <div className="w-full">
          <input
            type="text"
            maxLength={10}
            placeholder="Amount of tickets"
            className="input input-bordered w-full"
            value={amount}
            onChange={onChange}
          />
        </div>
        <button className="btn w-full mt-2" onClick={onSubmit}>
          🎰 Buy Tickets
        </button>
        <div className="mt-4 text-sm">
          {amountNum > 0 && (
            <>
              {totalPrice && contractContext.tokenDecimals && (
                <InfoRow title="Price" bg="bg-base-100">
                  {formatUnits(totalPrice, contractContext.tokenDecimals)} {contractContext.tokenSymbol}
                </InfoRow>
              )}
              {totalFee && contractContext.tokenDecimals && (
                <InfoRow title="Fee" bg="bg-base-100">
                  {formatUnits(totalFee, contractContext.tokenDecimals)} {contractContext.tokenSymbol}
                </InfoRow>
              )}
              {contractContext.tokenDecimals && (
                <InfoRow title="Total" bg="bg-base-100">
                  {formatUnits(totalFee + totalPrice || 0n, contractContext.tokenDecimals)}{" "}
                  {contractContext.tokenSymbol}
                </InfoRow>
              )}
            </>
          )}
        </div>
      </div>

      <ErrorBlock className="md:w-56 text-center mt-5 mx-auto" error={error} />
      <TransactionList className="mt-8 text-center" txHashes={txHashes} size={20} />
    </div>
  );
}
