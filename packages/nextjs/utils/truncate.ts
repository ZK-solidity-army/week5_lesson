export const middleTruncate = (str: string, maxLength: number) => {
  if (str.length <= maxLength) {
    return str;
  }
  const length = Math.floor(maxLength / 2);
  return str.slice(0, length) + "..." + str.slice(-length);
};
