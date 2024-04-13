"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Lottie from "lottie-react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import lottery from "~~/assets/lottie/lottery.json";
import AdminPanel from "~~/components/lottery-page/AdminPanel";
import BettingPanel from "~~/components/lottery-page/BettingPanel";
import Contract from "~~/components/lottery-page/Contract";
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
    <Contract>
      {/*
      <h1 className="text-4xl sm:text-6xl text-center font-medium flex flex-col">
        <span className="text-5xl sm:text-7xl text-base-content drop-shadow-lg">Etherium Lottery</span>
        <span className="animate-text-gradient bg-gradient-to-r from-success via-slate-400 to-green-300 bg-[200%_auto] bg-clip-text leading-tight text-transparent">
          Open
        </span>
      </h1>
      */}
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
          <div className="collapse-title text-xl font-medium">
            <Cog6ToothIcon className="w-7 h-7 inline-block" /> <span className="align-middle">Admin panel</span>
          </div>
          <div className="collapse-content">
            <AdminPanel />
          </div>
        </div>
      </div>
    </Contract>
  );
};

export default Home;
