import { create } from 'zustand';
import type { ThemeConfig, SnsTheme, ThemeMode, ColorScheme } from '../types';

const defaultColorSchemes: Record<SnsTheme, ColorScheme> = {
  line: {
    primary: '#06C755',
    secondary: '#00B900',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#111111',
    textSecondary: '#666666',
    senderBubble: '#06C755',
    receiverBubble: '#F0F0F0',
    border: '#E5E5E5',
  },
  x: {
    primary: '#1DA1F2',
    secondary: '#14171A',
    background: '#FFFFFF',
    surface: '#F7F9F9',
    text: '#14171A',
    textSecondary: '#657786',
    senderBubble: '#1DA1F2',
    receiverBubble: '#E8F5FE',
    border: '#E1E8ED',
  },
  instagram: {
    primary: '#E4405F',
    secondary: '#833AB4',
    background: '#FFFFFF',
    surface: '#FAFAFA',
    text: '#262626',
    textSecondary: '#8E8E8E',
    senderBubble: '#E4405F',
    receiverBubble: '#EFEFEF',
    border: '#DBDBDB',
  },
  discord: {
    primary: '#5865F2',
    secondary: '#4752C4',
    background: '#36393F',
    surface: '#2F3136',
    text: '#DCDDDE',
    textSecondary: '#96989D',
    senderBubble: '#5865F2',
    receiverBubble: '#40444B',
    border: '#202225',
  },
  slack: {
    primary: '#4A154B',
    secondary: '#611F69',
    background: '#FFFFFF',
    surface: '#F8F8F8',
    text: '#1D1C1D',
    textSecondary: '#616061',
    senderBubble: '#1264A3',
    receiverBubble: '#F4EDE4',
    border: '#E0E0E0',
  },
};

interface ThemeState {
  config: ThemeConfig;
  setThemeMode: (mode: ThemeMode) => void;
  setSnsTheme: (theme: SnsTheme) => void;
  setCustomColors: (colors: Partial<ColorScheme>) => void;
  resetTheme: () => void;
}

const initialTheme: ThemeConfig = {
  mode: 'light',
  snsTheme: 'line',
  colors: defaultColorSchemes.line,
};

export const useThemeStore = create<ThemeState>((set) => ({
  config: initialTheme,

  setThemeMode: (mode) =>
    set((state) => ({
      config: { ...state.config, mode },
    })),

  setSnsTheme: (theme) =>
    set((state) => ({
      config: {
        ...state.config,
        snsTheme: theme,
        colors: { ...defaultColorSchemes[theme], ...state.config.customColors },
      },
    })),

  setCustomColors: (colors) =>
    set((state) => ({
      config: {
        ...state.config,
        customColors: { ...state.config.customColors, ...colors },
        colors: { ...state.config.colors, ...colors },
      },
    })),

  resetTheme: () => set({ config: initialTheme }),
}));
