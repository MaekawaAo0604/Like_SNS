import React from 'react';
import { getAllThemePresets, type ThemePreset } from '../../constants/themePresets';

interface ThemePresetSelectorProps {
  onSelectPreset: (preset: ThemePreset) => void;
  currentPresetId?: string;
}

export const ThemePresetSelector: React.FC<ThemePresetSelectorProps> = ({
  onSelectPreset,
  currentPresetId,
}) => {
  const presets = getAllThemePresets();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        テーマプリセット
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {presets.map((preset) => {
          const isActive = currentPresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`
                flex flex-col gap-2 p-4 rounded-lg border-2 transition-all
                ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                }
              `}
              aria-pressed={isActive}
              aria-label={`${preset.name}テーマを選択`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {preset.name}
                </span>
                {isActive && (
                  <span className="text-blue-500" aria-label="選択中">
                    ✓
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                {preset.description}
              </p>
              <div className="flex gap-2 mt-2">
                <div
                  className="w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: preset.colors.senderBubble }}
                  aria-label="送信者バブルカラー"
                />
                <div
                  className="w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: preset.colors.receiverBubble }}
                  aria-label="受信者バブルカラー"
                />
                <div
                  className="w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: preset.colors.primary }}
                  aria-label="プライマリカラー"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

ThemePresetSelector.displayName = 'ThemePresetSelector';