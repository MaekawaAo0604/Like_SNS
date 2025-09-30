import React from 'react';
import { ColorPicker } from '../atoms/ColorPicker';
import type { ColorScheme } from '../../types';

interface CustomColorSettingsProps {
  colors: ColorScheme;
  onColorChange: (key: keyof ColorScheme, value: string) => void;
}

export const CustomColorSettings: React.FC<CustomColorSettingsProps> = ({
  colors,
  onColorChange,
}) => {
  const colorFields: Array<{ key: keyof ColorScheme; label: string }> = [
    { key: 'senderBubble', label: '送信者バブル' },
    { key: 'receiverBubble', label: '受信者バブル' },
    { key: 'primary', label: 'プライマリ' },
    { key: 'background', label: '背景' },
    { key: 'text', label: 'テキスト' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        カスタムカラー
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colorFields.map((field) => (
          <ColorPicker
            key={field.key}
            label={field.label}
            value={colors[field.key]}
            onChange={(value) => onColorChange(field.key, value)}
            id={`color-${field.key}`}
          />
        ))}
      </div>
    </div>
  );
};

CustomColorSettings.displayName = 'CustomColorSettings';