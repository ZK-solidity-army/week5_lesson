"use client";

import type { NextPage } from "next";
import CloseBets from "~~/components/viem/CloseBets";
import OpenBets from "~~/components/viem/OpenBets";

const AdminPanel: NextPage = () => {
  return (
    <>
      <div className="col-span-3">
        <h1 className="text-center ">Pit Boss menu</h1>
      </div>
      <div className="col-span-3 grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <OpenBets />
        </div>
        <div className="col-span-1">
          <CloseBets />
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
