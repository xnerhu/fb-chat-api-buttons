/**
 * Generates a random string in given length.
 * @param length Range
 * @param possible Possible characters
 */
export const generateHash = (
  length: number,
  possible: string = 'abcdefghijklmnopqrstuvwxyz0123456789',
) => {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
};
