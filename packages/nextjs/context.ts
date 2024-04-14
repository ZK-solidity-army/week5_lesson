import { createContext } from "react";

export type ContractContextType = {
  contractAddress?: `0x${string}`;
  lotteryAddress?: `0x${string}`;
  tokenAddress?: `0x${string}`;
  ownerAddress?: `0x${string}`;
  tokenSymbol?: string;
  tokenDecimals?: number;
  amountNum?: bigint;
  purchaseRatio?: bigint;
  totalWithFee?: bigint;
  betPrice?: bigint;
  betFee?: bigint;
  betsClosingTime?: bigint;
  prizePool?: bigint;
  ownerPool?: bigint;
  tokenName?: string;
  betsOpen?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  setContractContext?: (contractContext: ContractContextType) => void;
};

export const ContractContext = createContext<ContractContextType>({});
