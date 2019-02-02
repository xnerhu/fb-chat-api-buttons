interface IMetaTags {
  [key: string]: any;
}

/**
 * Generates a html code with meta tags.
 * @param list Meta tags
 */
export const getMetaTags = (list: IMetaTags) => {
  let html = '';
  for (const key in list) {
    if (list[key] == null) continue;
    html += `<meta property="og:${key}" content="${list[key]}" />`;
  }
  return html;
};
