"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Lottie from "lottie-react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import lottery from "~~/assets/lottie/lottery.json";
//import AdminPanel from "~~/components/lottery-page/AdminPanel";
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
      <div className="text-center sticky top-[-25px] z-10">
        <ContractInfo className="my-10" />
      </div>
      <div className="text-center">
        <PurchaseTokens className="mx-auto inline-block" />
      </div>
      {/*
      <AdminPanel />
      */}
      <BettingPanel />
    </div>
  );
};

export default Home;
