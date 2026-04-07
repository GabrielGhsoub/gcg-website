import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import type { ThemeMode, ThemeColors, ThemeContextType } from '../types/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'gcg-theme';

const colors: Record<'light' | 'dark', ThemeColors> = {
  light: {
    navy: '#000040',
    navyLight: '#271e59',
    navyDeep: '#1b0e52',
    gold: '#c9a84c',
    goldLight: '#e8d48b',
    cream: '#faf8f5',
    background: '#ffffff',
    surface: '#F8FAFC',
    text: '#1a1a2e',
    textMuted: '#64748b',
    border: '#e2e8f0',
  },
  dark: {
    navy: '#000040',
    navyLight: '#271e59',
    navyDeep: '#1b0e52',
    gold: '#c9a84c',
    goldLight: '#e8d48b',
    cream: '#faf8f5',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9',
    textMuted: '#94A3B8',
    border: '#334155',
  },
};

function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  return 'system';
}

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') {
    return getSystemPreference();
  }
  return mode;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(getStoredMode);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => resolveTheme(getStoredMode()));

  // Update resolved theme when mode changes
  useEffect(() => {
    const resolved = resolveTheme(mode);
    setResolvedTheme(resolved);
  }, [mode]);

  // Update DOM attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  // Listen for system preference changes
  useEffect(() => {
    if (mode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [mode]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(resolvedTheme === 'light' ? 'dark' : 'light');
  }, [resolvedTheme, setMode]);

  const value = useMemo<ThemeContextType>(
    () => ({
      mode,
      resolvedMode: resolvedTheme,
      setMode,
      toggleTheme,
      colors: colors[resolvedTheme],
    }),
    [mode, resolvedTheme, setMode, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
