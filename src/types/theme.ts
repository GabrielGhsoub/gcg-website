export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeContextType {
  mode: ThemeMode
  resolvedMode: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
  toggleTheme: () => void
}
