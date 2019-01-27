import { IButton } from '../interfaces';

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'prod';

export const linkTemplate = ({ title, description, image, fbId }: IButton) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${title}</title>
      <meta property="og:title" content="${title}" />
      ${description &&
        `<meta property="og:description" content="${description}" />`}
      ${image && `<meta property="og:image" content="${image}" />`}
    </head>
    <body>
      ${image && `<img src="${image}" />`}
      ${isProduction &&
        `<script>
          window.close();
          window.location.replace('http://m.me/${fbId}');
        </script>
      `}
    </body>
  </html>
`;
