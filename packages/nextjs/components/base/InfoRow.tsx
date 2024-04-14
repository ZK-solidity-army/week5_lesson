import { twMerge } from "tailwind-merge";

const dotClassName = twMerge(
  "relative",
  "before:content-[''] before:absolute before:w-full before:h-0 before:border-b-[0.125rem] before:border-dotted",
  "before:leading-0 before:bottom-1 before:border-base-content before:z-0",
  "flex flex-row justify-between items-center my-2",
);
const dotItemClassName = "bg-base-200 relative px-2";

export default function InfoRow({ title, children, bg }: { title: string; children: React.ReactNode; bg?: string }) {
  return (
    <div className={dotClassName}>
      <div className={twMerge(dotItemClassName, bg)}>{title}</div>
      <div className={twMerge(dotItemClassName, bg)}>{children}</div>
    </div>
  );
}
