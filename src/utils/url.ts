import { generateHash } from './hash';

export const getUrl = (id: string) => {
  const hash = generateHash(24);
  const endpoint = 'http://80.211.255.51:3000/callback';
  return `${endpoint}?id=${id}&hash=${hash}`;
};
