"use client";

import { useCallback, useRef, useState } from "react";
import Lottie, { LottieRef } from "lottie-react";
import bet from "~~/assets/lottie/bet.json";

export default function MakeBet({ className }: { className?: string }) {
  const [amount, setAmount] = useState<string>("1");
  const [isLoading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const lottieRef: LottieRef = useRef(null);

  console.log(isLoading);
  console.log(requestError);

  const onClick = useCallback(async () => {
    if (!amount) return;
    setLoading(true);
    lottieRef.current && lottieRef.current.goToAndPlay(5, true);
  }, [amount, setLoading]);

  const onLottieClick = useCallback(() => {
    lottieRef.current && lottieRef.current.goToAndPlay(10, true);
  }, [lottieRef]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestError(null);
    setAmount(e.target.value);
  };

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
        <button className="btn w-full mt-2" onClick={onClick}>
          🎰 Bet
        </button>
      </div>

      {/* TODO: move to a separate component */}
      {/*
        <div className="mt-2">
          <h1>⚠️ Result:</h1>
          <p>[text result]</p>
        </div>
        */}
    </div>
  );
}
