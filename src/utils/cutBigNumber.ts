export function cutBigNumber(num: number | string) {
  const numString = num.toString();
  let result = '';
  if (numString.indexOf('.') > -1) {
    const [w, f] = numString.split('.');
    if (f.length > 8 && w.length === 1) {
      result = `${w}.${f.slice(0, 8)}`;
    } else if (w.length > 1 && numString.length > 10) {
      result = numString.slice(0, 10);
    } else {
      result = numString;
    }
  }

  return result;
}
