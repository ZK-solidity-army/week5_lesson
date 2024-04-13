"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Lottie from "lottie-react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import lottery from "~~/assets/lottie/lottery.json";
import AdminPanel from "~~/components/lottery-page/AdminPanel";
import BettingPanel from "~~/components/lottery-page/BettingPanel";
import ContractInfo from "~~/components/viem/ContractInfo";
import PurchaseTokens from "~~/components/viem/PurchaseTokens";

const Home: NextPage = () => {
  const account = useAccount();
  if (!account || !account.isConnected) {
    return (
      <>
        <Lottie animationData={lottery} className="w-[500px] mx-auto mt-[-50px]" />
        <h1 className="text-center text-3xl mt-[-100px]">Welcome to the Lottery!</h1>
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button className="btn btn-neutral mt-10 mx-auto block" onClick={openConnectModal}>
              Connect Wallet
            </button>
          )}
        </ConnectButton.Custom>
      </>
    );
  }
  return (
    <div>
      <div className="text-center lg:sticky top-[-25px] z-10">
        <ContractInfo className="my-10" />
      </div>
      <div className="text-center">
        <PurchaseTokens className="mx-auto inline-block" />
      </div>
      <BettingPanel />

      <div className="px-4">
        {/* TODO: move to AdminPanel */}
        <div tabIndex={0} className="collapse collapse-arrow bg-base-200 max-w-[1000px] mx-auto">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-medium">READONLY: Admin panel</div>
          <div className="collapse-content">
            <p className="-mt-2">
              ⚠️ Admin panel is accessible for the owner of Lottery smartcontract and showing for review only
            </p>
            <AdminPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
