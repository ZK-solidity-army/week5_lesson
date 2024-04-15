import type { ErrorType } from "viem/errors/utils.js";

export type FormatUnitsErrorType = ErrorType;

/**
 * Improved version of viem formatUnits function.
 * https://github.com/wevm/viem/blob/d2f93e726df1ab1ff86098d68a4406f6fae315b8/src/utils/unit/formatUnits.ts
 *
 * Allow to limit amount of zeros after the decimal point.
 * but increase the limit if there is a first non-zero digit after the limit.
 *
 * @example
 * formatUnits(1000000000000000000n, 18, 3) // '1'
 * formatUnits(1000000100000000000n, 18, 3) // '1.0000001' <- first non-zero digit after the limit
 * formatUnits(1001713200000000000n, 18, 3) // '1.002'
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
  // rounding
  let carry = 0;
  if (fraction.length >= limit && Number(fraction[limit]) >= 5) {
    const a = fraction.split("");
    carry = 1;
    for (let i = limit - 1; i >= 0; i--) {
      const v = Number(a[i]) + carry;
      a[i] = (v % 10).toString();
      if (v < 10) {
        carry = 0;
        break;
      }
      limit -= 1;
    }
    fraction = a.slice(0, limit).join("");
  }

  if (carry) {
    integer = (BigInt(integer) + 1n).toString();
  }
  return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction.slice(0, limit)}` : ""}`;
}
