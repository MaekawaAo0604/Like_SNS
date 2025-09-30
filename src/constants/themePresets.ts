/**
 * SNSプリセットテーマ定義
 */

import type { ColorScheme } from '../types';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  colors: ColorScheme;
}

export const THEME_PRESETS: Record<string, ThemePreset> = {
  line: {
    id: 'line',
    name: 'LINE風',
    description: 'LINEのような緑ベースのデザイン',
    colors: {
      primary: '#06C755',
      secondary: '#00B900',
      background: '#FFFFFF',
      surface: '#F7F7F7',
      text: '#1A1A1A',
      textSecondary: '#8E8E93',
      senderBubble: '#06C755',
      receiverBubble: '#F0F0F0',
      border: '#E5E5EA',
    },
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram風',
    description: 'Instagramのようなグラデーションデザイン',
    colors: {
      primary: '#E1306C',
      secondary: '#F77737',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#262626',
      textSecondary: '#8E8E8E',
      senderBubble: '#E1306C',
      receiverBubble: '#EFEFEF',
      border: '#DBDBDB',
    },
  },
  twitter: {
    id: 'twitter',
    name: 'X (Twitter)風',
    description: 'X (旧Twitter)のような青ベースのデザイン',
    colors: {
      primary: '#1DA1F2',
      secondary: '#14171A',
      background: '#FFFFFF',
      surface: '#F7F9F9',
      text: '#14171A',
      textSecondary: '#657786',
      senderBubble: '#1DA1F2',
      receiverBubble: '#E1E8ED',
      border: '#E1E8ED',
    },
  },
  discord: {
    id: 'discord',
    name: 'Discord風',
    description: 'Discordのようなダークテーマ',
    colors: {
      primary: '#5865F2',
      secondary: '#4752C4',
      background: '#36393F',
      surface: '#2F3136',
      text: '#DCDDDE',
      textSecondary: '#B9BBBE',
      senderBubble: '#5865F2',
      receiverBubble: '#40444B',
      border: '#202225',
    },
  },
  slack: {
    id: 'slack',
    name: 'Slack風',
    description: 'Slackのようなビジネスデザイン',
    colors: {
      primary: '#4A154B',
      secondary: '#36C5F0',
      background: '#FFFFFF',
      surface: '#F8F8F8',
      text: '#1D1C1D',
      textSecondary: '#616061',
      senderBubble: '#4A154B',
      receiverBubble: '#F4EDE4',
      border: '#E0E0E0',
    },
  },
};

export const getThemePreset = (id: string): ThemePreset | undefined => {
  return THEME_PRESETS[id];
};

export const getAllThemePresets = (): ThemePreset[] => {
  return Object.values(THEME_PRESETS);
};