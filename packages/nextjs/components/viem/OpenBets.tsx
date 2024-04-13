"use client";

import { useState } from "react";

export default function OpenBets() {
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
    <div>
      <div>
        <label className="label">
          <span className="label-text">Close bets in X hours</span>
        </label>
        <div className="md:w-56">
          <div>
            <input
              type="text"
              placeholder="Enter amount of hours"
              className="input input-bordered w-full"
              value={amount}
              onChange={onChange}
            />
          </div>
          <div className="mt-2">
            <button className="btn btn-neutral w-full" onClick={onClick}>
              Open Bets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
