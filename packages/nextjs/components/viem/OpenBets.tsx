import { useCallback, useContext, useState } from "react";
import TransactionList from "./TransactionList";
import { useContractWrite } from "wagmi";
import * as chains from "wagmi/chains";
import ErrorBlock from "~~/components/Error";
import { ContractContext } from "~~/context";
import deployedContracts from "~~/contracts/deployedContracts";

export default function OpenBets({ className }: { className?: string }) {
  const [amount, setAmount] = useState<string>("");
  const [txHashes, setTxHashes] = useState<string[]>([]);

  const contractContext = useContext(ContractContext);

  const { write, error } = useContractWrite({
    address: contractContext.lotteryAddress,
    abi: deployedContracts[chains.sepolia.id].Lottery.abi,
    functionName: "openBets",
    onSuccess: useCallback(
      (data: { hash: string }) => {
        setTxHashes(prev => [data.hash, ...prev]);
      },
      [setTxHashes],
    ),
  });

  const onSubmit = useCallback(() => {
    const amountNum = parseInt(amount, 10);
    if (isNaN(amountNum)) return;

    // add 5 minutes if 0 hours
    const add = amountNum === 0 ? 60 * 5 : amountNum;
    const timestamp = Math.ceil(new Date().valueOf() / 1000) + amountNum * 3600 + add;
    write({
      args: [BigInt(timestamp)],
    });
  }, [amount, write]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <div className={className}>
      <div>
        <label className="label">
          <span className="label-text">Close bets in X hours</span>
        </label>
        <div>
          <div>
            <input
              type="text"
              placeholder="Enter amount of hours"
              className="input input-bordered w-full"
              value={amount}
              onChange={onChange}
            />
          </div>
          <div className="mt-2">
            <button className="btn btn-neutral w-full" onClick={onSubmit}>
              Open Bets
            </button>
          </div>
        </div>

        <ErrorBlock className="text-center mt-5" error={error} />
        <TransactionList className="mt-8" txHashes={txHashes} />
      </div>
    </div>
  );
}
