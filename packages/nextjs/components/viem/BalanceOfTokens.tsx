import { useContractRead } from "wagmi";
import * as chains from "wagmi/chains";
import TokenIcon from "~~/components/svg/TokenIcon";
import { LOTTERY_TOKEN_ADDRESS } from "~~/config";
import deployedContracts from "~~/contracts/deployedContracts";
import { formatEth } from "~~/utils/formatEth";

// TODO: retrieve decimals from contract
const DECIMALS = 18;

export default function BalanceOfTokens({ address }: { address: `0x${string}` }) {
  return (
    <div className="stat">
      <div className="stat-figure text-secondary">
        <TokenIcon className="inline-block w-8 h-8 stroke-current" />
      </div>
      <div className="stat-title">Lottery Token</div>
      <div className="stat-value text-secondary">{address ? <Balance address={address} /> : "..."}</div>
      <div className="stat-desc">Amount of G9LT token</div>
    </div>
  );
}

function Balance({ address }: { address: `0x${string}` }) {
  const { data } = useContractRead({
    address: LOTTERY_TOKEN_ADDRESS,
    abi: deployedContracts[chains.sepolia.id].LotteryToken.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });
  const formattedData = data ? formatEth(data, DECIMALS) : 0;
  console.log(data, formattedData);
  return <>{formattedData}</>;
}
