/* eslint-disable no-console */
function fixNumber(n: number) {
  if (n === 0) return 0;
  if (Number.isInteger(n)) return n;

  const nString = n.toString();
  const [whole, fraction] = nString.split('.');
  const l = whole.length;
  let w = '';
  let w1 = '0';
  let w2 = '';

  if (l < 4) {
    for (let i = 0; i < 3 - l; i++) {
      w2 = `${w2}0`;
    }
    w = `${w1}.${w2}${whole}`;
  } else {
    w1 = whole.slice(0, l - 3);
    w2 = whole.slice(l - 3);
    w = `${w1}.${w2}`;
  }

  return Number(`${w}${fraction}`);
}

export { fixNumber };
