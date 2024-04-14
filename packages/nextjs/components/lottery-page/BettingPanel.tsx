import BurnTokens from "../viem/BurnTokens";
import WithdrawTokens from "../viem/WithdrawTokens";
import type { NextComponentType } from "next";
import MakeBet from "~~/components/viem/MakeBet";

const BettingPanel: NextComponentType = () => {
  return (
    <div className="px-4">
      <div className="card border dark:border-base-300 bg-base-100 m-4 py-2 mt-12 max-w-[62.5rem] mx-auto">
        {/*
      <div className="card-title">
        <h2 className="text-2xl my-4 indent-10">Player space</h2>
      </div>
      */}
        <div className="card-body md:flex md:flex-row justify-around">
          <MakeBet className="my-8" />
          <div className="divider md:divider-horizontal"></div>
          <WithdrawTokens className="my-8" />
          <div className="divider md:divider-horizontal"></div>
          <BurnTokens className="my-8" />
        </div>
      </div>
    </div>
  );
};

export default BettingPanel;
