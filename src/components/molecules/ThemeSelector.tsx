import React from 'react';
import type { SnsTheme } from '../../types';
import { Button } from '../atoms/Button';

interface ThemeSelectorProps {
  currentTheme: SnsTheme;
  onThemeChange: (theme: SnsTheme) => void;
}

const themes: { value: SnsTheme; label: string; color: string }[] = [
  { value: 'line', label: 'LINE', color: 'bg-green-500' },
  { value: 'x', label: 'X (Twitter)', color: 'bg-blue-400' },
  { value: 'instagram', label: 'Instagram', color: 'bg-pink-500' },
  { value: 'discord', label: 'Discord', color: 'bg-indigo-500' },
  { value: 'slack', label: 'Slack', color: 'bg-purple-700' },
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        SNSテーマ
      </label>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((theme) => (
          <Button
            key={theme.value}
            variant={currentTheme === theme.value ? 'primary' : 'outline'}
            size="md"
            onClick={() => onThemeChange(theme.value)}
            className="relative"
          >
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${theme.color}`}
            />
            {theme.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
