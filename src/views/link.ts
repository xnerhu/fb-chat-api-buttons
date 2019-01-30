import { IButton } from '../interfaces';
import { getMetaTags } from '../utils/meta-tags';

export const linkView = ({ title, description, image }: IButton) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${title}</title>
      ${getMetaTags({ title, description, image })}
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
