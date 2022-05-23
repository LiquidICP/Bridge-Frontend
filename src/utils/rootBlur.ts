function rootBlur(blur: boolean) {
  const root = document.getElementById('root');
  if (blur) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    root!.style.filter = 'blur(5px)';
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  root!.style.filter = 'none';
}

export { rootBlur };
