import type { ErrorType } from "viem/errors/utils.js";

export type FormatUnitsErrorType = ErrorType;

/**
 * Improved version of viem formatUnits function.
 * https://github.com/wevm/viem/blob/d2f93e726df1ab1ff86098d68a4406f6fae315b8/src/utils/unit/formatUnits.ts
 *
 * Allow to limit amount of zeros after the decimal point.
 * !Doesn't implement proper rounding.
 *
 * @example
 * limit = 3
 * formatUnits(1000000000000000000n, 18) // '1.0'
 * formatUnits(1000000100000000000n, 18) // '1.0000001'
 * formatUnits(1001713200000000000n, 18) // '1.001' - no proper rounding
 */
export default function formatUnits(value: bigint, decimals: number, limit = 4) {
  let display = value.toString();

  const negative = display.startsWith("-");
  if (negative) display = display.slice(1);

  display = display.padStart(decimals, "0");
  // eslint-disable-next-line prefer-const
  let [integer, fraction] = [display.slice(0, display.length - decimals), display.slice(display.length - decimals)];
  fraction = fraction.replace(/(0+)$/, "");

  let firstNonZero = 0;
  for (let i = 0; i < fraction.length; i++) {
    if (fraction[i] !== "0") {
      firstNonZero = i;
      break;
    }
  }

  limit = Math.max(limit, firstNonZero + 1);
  return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction.slice(0, limit)}` : ""}`;
}
