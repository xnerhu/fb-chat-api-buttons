interface IMetaTags {
  [key: string]: any;
}

export const getMetaTags = (list: IMetaTags) => {
  let html = '';
  for (const key in list) {
    if (list[key] == null) continue;
    html += `<meta property="og:${key}" content="${list[key]}" />`;
  }
  return html;
};
