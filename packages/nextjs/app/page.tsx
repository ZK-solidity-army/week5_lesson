"use client";

import type { NextPage } from "next";
import AdminPanel from "~~/components/lottery-page/AdminPanel";
import BalancePanel from "~~/components/lottery-page/BalancePanel";
import BettingPanel from "~~/components/lottery-page/BettingPanel";

const Home: NextPage = () => {
  return (
    <div className="mt-10 grid grid-cols-3 gap-4 p-4">
      <BalancePanel />
      <AdminPanel />
      <BettingPanel />
    </div>
  );
};

export default Home;
