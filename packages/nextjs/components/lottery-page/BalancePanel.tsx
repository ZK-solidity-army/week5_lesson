"use client";

import type { NextPage } from "next";
import PurchaseTokens from "~~/components/viem/PurchaseTokens";

const BalancePanel: NextPage = () => {
  return (
    <>
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <PurchaseTokens />
        </div>
        <div className="col-span-1">
          <PurchaseTokens />
        </div>
      </div>
    </>
  );
};

export default BalancePanel;
