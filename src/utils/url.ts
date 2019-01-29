import { generateHash } from './hash';

export const getUrl = (id: string) => {
  const hash = generateHash(24);
  const endpoint = '';
  return `${endpoint}?id=${id}&hash=${hash}`;
};
