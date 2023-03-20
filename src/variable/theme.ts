export const themeConfig = {
  // 颜色变量
  '--primary-color': '#3370FE',
  '--success-color': '#3370FE',
  '--warning-color': '#3370FE',
  '--error-color': '#3370FE',

  '--btn-disabled-color': '#C6D4FF',

  // 字体颜色
  '--text-title-color': '#28282C',
  '--text-content-color': '#5A5E68',

  // 字体大小
  '--font-xs': '12px',
  '--font-sm': '14px',
  '--font-base': '16px',
  '--font-lg': '18px',
  '--font-xl': '20px',
  '--font-2xl': '24px',
  '--font-3xl': '28px',

  // 圆角
  '--radius-sm': '4px'
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
