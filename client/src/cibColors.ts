type HexaColor = `#${string}`;

const style = getComputedStyle(document.documentElement);

const getCibColor: (color: CibColor) => HexaColor = (color) =>
  style.getPropertyValue(`--cib-color-${color}`) as HexaColor;

export const CibColors = {
  success: getCibColor('success'),
  danger: getCibColor('danger'),
  cacib200: getCibColor('cacib-200'),
  terracotta200: getCibColor('terracotta-200'),
  azure200: getCibColor('azure-200'),
};
