import { useContext } from "react";
import { useContractRead } from "wagmi";
import * as chains from "wagmi/chains";
import TokenIcon from "~~/components/svg/TokenIcon";
import { ContractContext } from "~~/context";
import deployedContracts from "~~/contracts/deployedContracts";
import formatUnits from "~~/utils/formatUnits";

export default function BalanceOfTokens({ address }: { address: `0x${string}` }) {
  const contractContext = useContext(ContractContext);
  const tokenSymbol = contractContext.tokenSymbol || "??";
  const tokenDecimals = contractContext.tokenDecimals;
  const tokenAddress = contractContext.tokenAddress;

  return (
    <div className="stat">
      <div className="stat-figure text-secondary">
        <TokenIcon className="inline-block w-8 h-8 stroke-current" />
      </div>
      <div className="stat-title">Token {contractContext.tokenSymbol}</div>
      <div className="stat-value text-secondary">
        {address && typeof tokenDecimals !== "undefined" ? (
          <Balance tokenAddress={tokenAddress} address={address} decimals={tokenDecimals} />
        ) : (
          "..."
        )}
      </div>
      <div className="stat-desc">Amount of {tokenSymbol} token</div>
    </div>
  );
}

function Balance({
  tokenAddress,
  address,
  decimals,
}: {
  tokenAddress?: `0x${string}`;
  address: `0x${string}`;
  decimals: number;
}) {
  const { data } = useContractRead({
    address: tokenAddress,
    abi: deployedContracts[chains.sepolia.id].LotteryToken.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });
  return <>{data ? formatUnits(data, decimals) : 0}</>;
}
