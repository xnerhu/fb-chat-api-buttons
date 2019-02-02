import { IButton } from '../interfaces';
import { getMetaTags } from '../utils/meta-tags';

export const prefetchView = ({ title, description, image }: IButton) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${getMetaTags({ title, description, image })}
    </head>
    <body></body>
  </html>
`;
