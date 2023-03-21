export function sleep(mill: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, mill);
  });
}
