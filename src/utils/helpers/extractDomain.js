//extracts domain name from url
export const extractDomain = url => {
  const address = new URL(url);
  const domain = address.hostname.replace('www.', '');
  return domain;
};
