"use client";

import type { NextPage } from "next";
import BalanceOfTokens from "~~/components/viem/BalanceOfTokens";
import Claim from "~~/components/viem/Claim";
import MakeBet from "~~/components/viem/MakeBet";
import PriceWithdraw from "~~/components/viem/PriceWithdraw";
import PurchaseTokens from "~~/components/viem/PurchaseTokens";

const BettingPanel: NextPage = () => {
  return (
    <>
      <div className="col-span-3">
        <h1 className="text-center">Player space</h1>
      </div>
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <PurchaseTokens />
        </div>
        <div className="col-span-2">
          <MakeBet />
        </div>
      </div>
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <BalanceOfTokens />
        </div>
        <div className="col-span-2">
          <PriceWithdraw />
        </div>
      </div>
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <div className="col-span-1"></div>
        <Claim />
        <div className="col-span-1"></div>
      </div>
    </>
  );
};

export default BettingPanel;
