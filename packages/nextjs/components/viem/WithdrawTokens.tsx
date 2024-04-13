"use client";

import { useCallback, useRef, useState } from "react";
import Lottie, { LottieRef } from "lottie-react";
import prize from "~~/assets/lottie/prize.json";

export default function WithdrawTokens({ className }: { className?: string }) {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const lottieRef: LottieRef = useRef(null);

  console.log(isLoading);
  console.log(requestError);

  const onClick = useCallback(async () => {
    if (!amount) return;

    lottieRef.current && lottieRef.current.goToAndPlay(5, true);
    setLoading(true);
  }, [amount, setLoading, lottieRef]);

  const onLottieClick = useCallback(() => {
    lottieRef.current && lottieRef.current.goToAndPlay(18, true);
  }, [lottieRef]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestError(null);
    setAmount(e.target.value);
  };

  return (
    <div className={className}>
      {/*
        <h2 className="card-title">Price Withdraw</h2>
        <label className="label">
          <span className="label-text">Choose betting numbers:</span>
        </label>
        */}
      <label className="label">
        <span className="label-text">Enter amount of tokens to withdraw</span>
      </label>
      <div className="md:w-56">
        <Lottie
          animationData={prize}
          className="w-56 h-56 mx-auto"
          loop={false}
          onClick={onLottieClick}
          lottieRef={lottieRef}
        />
        <div className="w-full">
          <input
            type="text"
            placeholder="G9LT amount"
            className="input input-bordered w-full"
            value={amount}
            onChange={onChange}
          />
        </div>
        <button className="btn w-full mt-2" onClick={onClick}>
          Claim Tokens
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
