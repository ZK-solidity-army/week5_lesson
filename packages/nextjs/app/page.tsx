"use client";

import { useEffect, useState } from "react";
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
  // workaround for removing non-auth page blinking
  // when user has connected wallet we would like to show blank page
  // until we get the account data
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 150);
  }, []);

  const account = useAccount();
  if (isLoading) {
    return null;
  }
  if (account.isDisconnected) {
    return (
      <>
        <div className="overflow-hidden w-full h-[20rem] relative">
          <Lottie
            animationData={lottery}
            className="w-[30rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <h1 className="text-center text-3xl">Welcome to the Lottery!</h1>
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
      <div className="text-center lg:sticky top-[-1.5625rem] z-10">
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
