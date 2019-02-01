import { IRichButton } from '../interfaces';
import { getMetaTags } from '../utils/meta-tags';

export const prefetchView = ({ title, description, image }: IRichButton) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${getMetaTags({ title, description, image })}
    </head>
    <body></body>
  </html>
`;
