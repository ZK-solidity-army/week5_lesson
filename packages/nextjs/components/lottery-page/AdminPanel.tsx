"use client";

import type { NextPage } from "next";
import PurchaseTokens from "~~/components/viem/PurchaseTokens";

const AdminPanel: NextPage = () => {
  return (
    <>
      <div className="col-span-3">
        <h1 className="text-center">Pit Boss menu</h1>
      </div>
      <div className="col-span-3 grid grid-cols-2 gap-4">
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

export default AdminPanel;
