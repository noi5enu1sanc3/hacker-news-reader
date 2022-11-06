export const convertTime = unixTime =>
  new Date(unixTime * 1000).toLocaleString();
