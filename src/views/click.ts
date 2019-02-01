export const clickView = (threadId: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>You can close this tab</title>
    </head>
    <body>
      <h3>You can close this tab</h3>
      <script>
        window.close();
        window.location.replace('http://m.me/${threadId}');
      </script>
    </body>
  </html>
`;
