"use client";

import { useCallback } from "react";

export default function CloseBets() {
  const onClick = useCallback(async () => {
    console.log("Close bets");
  }, []);

  return (
    <div>
      <div className="md:w-56">
        <div>
          <button className="btn btn-neutral w-full" onClick={onClick}>
            Close Bets
          </button>
        </div>
      </div>
    </div>
  );
}
