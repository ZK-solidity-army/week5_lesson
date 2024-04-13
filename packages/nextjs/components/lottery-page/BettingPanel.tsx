import type { NextComponentType } from "next";
import BalanceOfTokens from "~~/components/viem/BalanceOfTokens";
import Claim from "~~/components/viem/Claim";
import MakeBet from "~~/components/viem/MakeBet";
import PriceWithdraw from "~~/components/viem/PriceWithdraw";
import PurchaseTokens from "~~/components/viem/PurchaseTokens";

const BettingPanel: NextComponentType = () => {
  return (
    <div className="cardrelative m-4 pb-10">
      <div className="card-title">
        <h2 className="text-2xl my-4 indent-10">Player space</h2>
      </div>
      <div className="card-body">
        <PurchaseTokens />
        <MakeBet />
        <BalanceOfTokens />
        <PriceWithdraw />
        <Claim />
      </div>
    </div>
  );
};

export default BettingPanel;
