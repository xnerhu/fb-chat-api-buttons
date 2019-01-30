import { stringify } from 'querystring';

import Store from '../store';
import { generateHash } from './hash';

export const getPrefetchUrl = (id: string) => {
  const hash = generateHash(24);
  return `${Store.cbEndpoint}${stringify({ id, hash })}`;
};
