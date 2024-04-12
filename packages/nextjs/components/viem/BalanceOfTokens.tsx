"use client";

export default function BalanceOfTokens() {
  const tokens = "NAME_OF_THE_TOKEN";
  const balance_of_tokens = "01234567890";
  return (
    <div className="card bg-base-100 shadow-xl mt-2">
      <div className="card-body">
        <h2 className="card-title">Balance ${tokens}</h2>
        <div className="flex flex-row items-center">${balance_of_tokens}</div>
      </div>
    </div>
  );
}
