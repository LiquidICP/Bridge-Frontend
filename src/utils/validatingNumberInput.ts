/* eslint-disable no-console */
export function validatingNumberInput(value: string) {
  if (value.trim() === '.' || value === '') {
    return '';
  }
  let newValue = value
    .replace(/[^0-9,.]{1,}/g, '')
    .replace(',', '.');

  if (newValue.search(/^\d+(\.|,)?\d*[^0-9,.]{0}$/) < 0) {
    const tArr = newValue.split('.');
    const l = tArr.length;
    let strNew = `${tArr[0]}.`;
    for (let i = 1; i < l; i++) {
      strNew += tArr[i];
    }
    newValue = strNew;
  }
  return newValue;
}
