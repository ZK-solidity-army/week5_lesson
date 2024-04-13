import { twMerge } from "tailwind-merge";
import { BaseError } from "viem";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function Error({
  title,
  className,
  error,
}: {
  title?: string;
  className?: string;
  error?: BaseError | Error | null;
}) {
  if (!error) return null;
  console.log(error);

  const shortMessages = "shortMessage" in error ? error.shortMessage.split("\n") : error.message.split("\n");

  return (
    <div className={twMerge(className, "text-error")}>
      <ExclamationCircleIcon className="w-5 h-5 mr-1 inline-block stroke-2" />
      <span className="align-middle">
        {title ? `${title}: ` : ""}
        {shortMessages[shortMessages.length - 1]}
      </span>
    </div>
  );
}
