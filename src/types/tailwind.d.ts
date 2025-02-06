declare module 'tailwindcss/lib/util/flattenColorPalette' {
  type ColorValue = string | Record<string, string>;
  type ColorDict = Record<string, ColorValue>;
  
  function flattenColorPalette(colors: ColorDict): Record<string, string>;
  export default flattenColorPalette;
}