import { IButton } from '../interfaces';

export const prefetchView = ({ title, description, image }: IButton) => `
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
      <h3>You can close this tab</h3>
      ${image && `<img src="${image}" />`}
      <script>
        window.close();
        window.location.replace('http://m.me/${'aha'}');
      </script>
    </body>
  </html>
`;
