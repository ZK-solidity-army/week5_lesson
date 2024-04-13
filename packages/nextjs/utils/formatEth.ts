export const formatEth = (value: bigint, decimals: number) => {
  return Number((value * 10000n) / BigInt(10 ** decimals)) / 10000;
};
