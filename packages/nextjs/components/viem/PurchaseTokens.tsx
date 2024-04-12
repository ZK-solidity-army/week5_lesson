"use client";

import { useState } from "react";

export default function PurchaseTokens() {
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
    <div className="card bg-primary text-primary-content mt-2">
      <div className="card-body">
        <h2 className="card-title">Mint tokens</h2>
        <label className="label">
          <span className="label-text">Enter amount of tokens:</span>
        </label>
        <div className="flex flex-row items-center">
          <div className="w-56 my-1">
            <input
              type="text"
              placeholder="123456..."
              className="input input-bordered w-full max-w-xs"
              value={amount}
              onChange={onChange}
            />
          </div>
          <div className="ml-4">
            <button className="btn btn-active btn-neutral" onClick={onClick}>
              Purchase Tokens to bet!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
