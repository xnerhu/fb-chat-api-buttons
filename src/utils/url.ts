import Store from '../store';
import { IButton } from '../interfaces';
import { generateHash } from './hash';

export const getUrl = (btn: IButton, threadId: string) => {
  const hash = generateHash(24);
  const data = encodeURIComponent(JSON.stringify(btn));
  return `${Store.endpoint}?data=${data}&hash=${hash}`;
};
