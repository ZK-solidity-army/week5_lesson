"use client";

import TokenIcon from "../svg/TokenIcon";

export default function BalanceOfTokens() {
  const balance_of_tokens = "2.007";
  return (
    <div className="stat">
      <div className="stat-figure text-secondary">
        <TokenIcon className="inline-block w-8 h-8 stroke-current" />
      </div>
      <div className="stat-title">Lottery Token</div>
      <div className="stat-value text-secondary">{balance_of_tokens}</div>
      <div className="stat-desc">Amount of G9LT token</div>
    </div>
  );
}
