import { IButton } from '../interfaces';
import { generateHash } from './hash';

/**
 * Generates a callback url.
 * @param endpoint Public callback endpoint
 * @param btn Button
 * @param threadId Thread id
 */
export const generateUrl = (
  endpoint: string,
  btn: IButton,
  threadId: string,
) => {
  // Use a random string in callback url, because
  // facebook doesn't prefetch the same urls that were prefetched in the past.
  const hash = generateHash(24);
  const data = encodeURIComponent(JSON.stringify(btn));
  return `${endpoint}?data=${data}&threadId=${threadId}&hash=${hash}`;
};
