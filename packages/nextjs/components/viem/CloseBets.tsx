import { useCallback, useContext, useState } from "react";
import TransactionList from "./TransactionList";
import { useContractWrite } from "wagmi";
import * as chains from "wagmi/chains";
import ErrorBlock from "~~/components/Error";
import { ContractContext } from "~~/context";
import deployedContracts from "~~/contracts/deployedContracts";

export default function CloseBets({ className }: { className?: string }) {
  const [txHashes, setTxHashes] = useState<string[]>([]);

  const contractContext = useContext(ContractContext);

  const { write, error } = useContractWrite({
    address: contractContext.lotteryAddress,
    abi: deployedContracts[chains.sepolia.id].Lottery.abi,
    functionName: "closeLottery",
    onSuccess: useCallback(
      (data: { hash: string }) => {
        setTxHashes(prev => [data.hash, ...prev]);
      },
      [setTxHashes],
    ),
  });

  const onSubmit = useCallback(() => {
    write();
  }, [write]);

  return (
    <div className={className}>
      <div>
        <div className="md:mt-[5.8rem]">
          <button className="btn btn-neutral w-full" onClick={onSubmit}>
            Close Lottery
          </button>
        </div>
        <ErrorBlock className="text-center mt-5" error={error} />
        <TransactionList className="mt-8" txHashes={txHashes} />
      </div>
    </div>
  );
}
