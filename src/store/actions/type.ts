export const type = {
  SWITCH_THEME: 'SWITCH_THEME',
}
export function switchTheme(theme: string) {
  return {
    type: type.SWITCH_THEME,
    theme
  }
}