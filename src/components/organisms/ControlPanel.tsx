import React from 'react';
import type { SnsTheme, DesignOptions } from '../../types';
import { ThemeSelector } from '../molecules/ThemeSelector';
import { DesignControls } from '../molecules/DesignControls';
import { Button } from '../atoms/Button';

interface ControlPanelProps {
  currentTheme: SnsTheme;
  designOptions: DesignOptions;
  onThemeChange: (theme: SnsTheme) => void;
  onToggleAvatar: (show: boolean) => void;
  onToggleTimestamp: (show: boolean) => void;
  onToggleSenderName: (show: boolean) => void;
  onToggleStatus: (show: boolean) => void;
  onExport: () => void;
  onClear: () => void;
  onExportJSON: () => void;
  onImportJSON: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  currentTheme,
  designOptions,
  onThemeChange,
  onToggleAvatar,
  onToggleTimestamp,
  onToggleSenderName,
  onToggleStatus,
  onExport,
  onClear,
  onExportJSON,
  onImportJSON,
}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        設定パネル
      </h2>

      <ThemeSelector
        currentTheme={currentTheme}
        onThemeChange={onThemeChange}
      />

      <DesignControls
        options={designOptions}
        onToggleAvatar={onToggleAvatar}
        onToggleTimestamp={onToggleTimestamp}
        onToggleSenderName={onToggleSenderName}
        onToggleStatus={onToggleStatus}
      />

      <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="primary" fullWidth onClick={onExport}>
          📥 画像として保存
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" fullWidth onClick={onExportJSON}>
            💾 JSON保存
          </Button>
          <Button variant="outline" fullWidth onClick={onImportJSON}>
            📂 JSON読込
          </Button>
        </div>
        <Button variant="outline" fullWidth onClick={onClear}>
          🗑️ メッセージをクリア
        </Button>
      </div>
    </div>
  );
};
