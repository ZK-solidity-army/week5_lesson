"use client";

import type { NextPage } from "next";
import CloseBets from "~~/components/viem/CloseBets";
import OpenBets from "~~/components/viem/OpenBets";

const AdminPanel: NextPage = () => {
  return (
    <div className="card">
      {/*
      <div className="col-span-3">
        <h1 className="text-center ">Pit Boss menu</h1>
      </div>
      */}
      <div className="card-body md:flex md:flex-row md:justify-around md:items-end">
        <OpenBets />
        <div className="divider md:divider-horizontal"></div>
        <CloseBets />
      </div>
    </div>
  );
};

export default AdminPanel;
