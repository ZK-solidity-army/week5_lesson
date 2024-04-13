"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function PurchaseTokens({ className }: { className?: string }) {
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
    <div className={twMerge("card mt-2", className)}>
      <div className="card-body">
        <div className="md:w-56">
          <div className="w-full mb-2">
            <input
              type="text"
              placeholder="10"
              className="input input-bordered w-full max-w-xs input-lg text-2xl"
              value={amount}
              onChange={onChange}
            />
          </div>
          <div>
            <button className="btn btn-lg w-full" onClick={onClick}>
              Buy Tokens
            </button>
          </div>
          {/* TODO: write ratio */}
        </div>
      </div>
    </div>
  );
}
