"use client";

import type { NextPage } from "next";
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
          <PurchaseTokens />
        </div>
      </div>
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <div className="col-span-1"></div>
        <div className="col-span-2">
          <PurchaseTokens />
        </div>
      </div>
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <div className="col-span-1"></div>
        <PurchaseTokens />
        <div className="col-span-1"></div>
      </div>
    </>
  );
};

export default BettingPanel;
