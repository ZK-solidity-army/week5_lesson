"use client";

import { useCallback, useContext, useRef, useState } from "react";
import TransactionList from "./TransactionList";
import Lottie, { LottieRef } from "lottie-react";
import { useContractWrite } from "wagmi";
import * as chains from "wagmi/chains";
import bet from "~~/assets/lottie/bet.json";
import ErrorBlock from "~~/components/Error";
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

  return (
    <div className={className}>
      {/*
        <h2 className="card-title">Make a bet</h2>
        */}
      <label className="label">
        <span className="label-text">How many bets would you like to make?</span>
      </label>
      <div className="md:w-56">
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
            placeholder="Bets amount"
            className="input input-bordered w-full"
            value={amount}
            onChange={onChange}
          />
        </div>
        <button className="btn w-full mt-2" onClick={onSubmit}>
          🎰 Bet
        </button>
      </div>

      <ErrorBlock className="md:w-56 text-center mt-5" error={error} />
      <TransactionList className="mt-8" txHashes={txHashes} />
    </div>
  );
}
