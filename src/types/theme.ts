/**
 * テーマとデザインの型定義
 */

export type ThemeMode = 'light' | 'dark';

export type SnsTheme = 'line' | 'x' | 'instagram' | 'discord' | 'slack';

export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  senderBubble: string;
  receiverBubble: string;
  border: string;
}

export interface ThemeConfig {
  mode: ThemeMode;
  snsTheme: SnsTheme;
  colors: ColorScheme;
  customColors?: Partial<ColorScheme>;
}

export interface BubbleStyle {
  borderRadius: string;
  padding: string;
  maxWidth: string;
  fontSize: string;
}

export interface DesignOptions {
  showAvatar: boolean;
  showTimestamp: boolean;
  showSenderName: boolean;
  showStatus: boolean;
  bubbleStyle: BubbleStyle;
}
