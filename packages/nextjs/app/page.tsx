"use client";

import type { NextPage } from "next";
//import AdminPanel from "~~/components/lottery-page/AdminPanel";
import BettingPanel from "~~/components/lottery-page/BettingPanel";
import ContractInfo from "~~/components/viem/ContractInfo";

const Home: NextPage = () => {
  return (
    <div>
      <div className="text-center sticky top-[-25px] z-10">
        <ContractInfo className="my-10" />
      </div>
      {/*
      <AdminPanel />
      */}
      <BettingPanel />
    </div>
  );
};

export default Home;
