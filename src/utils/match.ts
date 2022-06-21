export function subtraction(a: number | string, b: number) {
  const n = 10;
  const numberA = Number(a);

  return (numberA * n - b * n) / n;
}
