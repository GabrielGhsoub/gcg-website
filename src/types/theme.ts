export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  // GCG Brand (preserved)
  navy: string;
  navyLight: string;
  navyDeep: string;
  gold: string;
  goldLight: string;
  cream: string;

  // Semantic (dynamic)
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

export interface ThemeContextType {
  mode: ThemeMode;
  resolvedMode: 'light' | 'dark'; // actual computed mode
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  colors: ThemeColors;
}
