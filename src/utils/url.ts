import { IButton } from '../interfaces';
import { generateHash } from './hash';

export const generateUrl = (
  endpoint: string,
  btn: IButton,
  threadId: string,
) => {
  const hash = generateHash(24);
  const data = encodeURIComponent(JSON.stringify(btn));
  return `${endpoint}?data=${data}&threadId=${threadId}&hash=${hash}`;
};
