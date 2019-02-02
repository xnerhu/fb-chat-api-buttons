import { Request } from 'express';

/**
 * Checks if request is sent by facebook for website prefetch. It works by checking user-agent header, because
 * facebook sets it to facebookexternalhit/1.1 [...]
 */
export const isBeingPrefetched = (req: Request) => {
  return req.headers['user-agent'].includes('facebook');
};
