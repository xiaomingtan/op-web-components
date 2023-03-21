export function genClassNamesFromObj(obj: Object): string {
  let classNames: string[] = [];
  for (const key in obj) {
    if (obj[key]) {
      classNames.push(key);
    }
  }
  return classNames.join(' ');
}
