import { useState } from "react";
import { useContractReads } from "wagmi";
import * as chains from "wagmi/chains";
import { ContractContext, ContractContextType } from "~~/context";
import deployedContracts from "~~/contracts/deployedContracts";

export default function Contract({ children }: { children: React.ReactNode }) {
  const [contractContext, setContractContext] = useState<ContractContextType>({});

  const lotteryContract = {
    address: contractContext.lotteryAddress,
    abi: deployedContracts[chains.sepolia.id].Lottery.abi,
  };
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...lotteryContract,
        functionName: "paymentToken",
      },
      {
        ...lotteryContract,
        functionName: "purchaseRatio",
      },
      {
        ...lotteryContract,
        functionName: "betPrice",
      },
      {
        ...lotteryContract,
        functionName: "betFee",
      },
      {
        ...lotteryContract,
        functionName: "betsOpen",
      },
      {
        ...lotteryContract,
        functionName: "owner",
      },
      {
        ...lotteryContract,
        functionName: "betsClosingTime",
      },
      {
        ...lotteryContract,
        functionName: "prizePool",
      },
      {
        ...lotteryContract,
        functionName: "ownerPool",
      },
    ],
    watch: true,
  });

  const tokenContract = {
    address: data ? (data[0].result as `0x${string}`) : undefined,
    abi: deployedContracts[chains.sepolia.id].LotteryToken.abi,
  };
  const {
    data: tokenData,
    isError: isTokenError,
    isLoading: isTokenLoading,
  } = useContractReads({
    contracts: [
      { ...tokenContract, functionName: "symbol" },
      { ...tokenContract, functionName: "decimals" },

      { ...tokenContract, functionName: "name" },
    ],
  });

  const tokenAddress = data && data[0].result ? (`${data[0].result}`.toLowerCase() as `0x${string}`) : undefined;
  const ownerAddress = data && data[5].result ? (`${data[5].result}`.toLowerCase() as `0x${string}`) : undefined;
  const _contractContext = {
    ...contractContext,
    // lottery
    contractAddress: contractContext.lotteryAddress && (contractContext.lotteryAddress.toLowerCase() as `0x${string}`),
    purchaseRatio: data ? (data[1].result as bigint) : undefined,
    betPrice: data ? (data[2].result as bigint) : undefined,
    betFee: data ? (data[3].result as bigint) : undefined,
    betsOpen: data ? (data[4].result as boolean) : undefined,
    betsClosingTime: data ? (data[6].result as bigint) : undefined,
    prizePool: data ? (data[7].result as bigint) : undefined,
    ownerPool: data ? (data[8].result as bigint) : undefined,
    ownerAddress,
    // token
    tokenAddress,
    tokenSymbol: tokenData ? `${tokenData[0].result}` : undefined,
    tokenDecimals: tokenData ? Number(tokenData[1].result) : undefined,
    tokenName: tokenData ? `${tokenData[2].result}` : undefined,
    isLoading: isLoading || isTokenLoading,
    isError: isError || isTokenError,
    setContractContext,
  };

  return (
    <ContractContext.Provider value={_contractContext}>
      <div>{children}</div>
    </ContractContext.Provider>
  );
}
