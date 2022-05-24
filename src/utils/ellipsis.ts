function ellipsis(text: string, limit: number): string {
  const l = text.length;
  if (l <= limit) {
    return text;
  }
  const l1 = limit / 2 - 1;
  return `${text.substring(0, l1)}…${text.substring(l - l1)}`;
}

export { ellipsis };
