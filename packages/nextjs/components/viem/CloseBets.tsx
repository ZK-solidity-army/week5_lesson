import { useCallback } from "react";

export default function CloseBets({ className }: { className?: string }) {
  const onClick = useCallback(async () => {
    console.log("Close bets");
  }, []);

  return (
    <div className={className}>
      {/* TODO: hardcoded alignment */}
      <div className="mt-[5.25rem]">
        <button className="btn btn-neutral w-full" onClick={onClick}>
          Close Bets
        </button>
      </div>
    </div>
  );
}
