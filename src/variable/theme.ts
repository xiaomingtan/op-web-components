export const themeConfig = {
  // 颜色变量
  '--primary-color': '#3370FE',
  '--success-color': '#3370FE',
  '--warning-color': '#3370FE',
  '--error-color': '#3370FE'
};

export function genHostCss() {
  let hostCss = '';
  for (const key in themeConfig) {
    hostCss += `${key}:${themeConfig[key]};`;
  }

  return `
    :host {
      ${hostCss}
    }
  `;
}
