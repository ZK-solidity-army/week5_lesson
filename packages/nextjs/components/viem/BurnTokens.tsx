"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import etherium from "~~/assets/lottie/etherium.json";

export default function BurnTokens({ className }: { className?: string }) {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  console.log(isLoading);
  console.log(requestError);

  const onClick = async () => {
    if (!amount) return;

    setLoading(true);
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestError(null);
    setAmount(e.target.value);
  };

  return (
    <div className={className}>
      {/*
        <h2 className="card-title">🎁 Claim</h2>
        */}
      <label className="label">
        <span className="label-text">Enter amount of tokens to excange for SEP</span>
      </label>
      <div className="md:w-56">
        <Lottie animationData={etherium} className="w-44 h-56 mx-auto" loop={false} />
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
          Excange Tokens
        </button>
      </div>
    </div>
  );
}
