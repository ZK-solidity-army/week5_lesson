"use client";

export default function BalanceOfTokens() {
  const tokens = "NAME_OF_THE_TOKEN";
  const balance_of_tokens = "01234567890";
  return (
    <div className="card bg-primary text-primary-content mt-2">
      <div className="card-body">
        <label className="label">
          <span className="label-text">Balance ${tokens}:</span>
        </label>
        <div className="flex flex-row items-center">
          <h1>${balance_of_tokens}</h1>
        </div>
      </div>
    </div>
  );
}
