import React, { useState } from 'react';
import type { SnsTheme, DesignOptions, ColorScheme, ChatRoom } from '../../types';
import type { ThemePreset } from '../../constants/themePresets';
import { ThemeSelector } from '../molecules/ThemeSelector';
import { ThemePresetSelector } from '../molecules/ThemePresetSelector';
import { CustomColorSettings } from '../molecules/CustomColorSettings';
import { DesignControls } from '../molecules/DesignControls';
import { DarkModeToggle } from '../molecules/DarkModeToggle';
import { RoomSelector } from '../molecules/RoomSelector';
import { MessageSearch } from '../molecules/MessageSearch';
import { MessageFilter } from '../molecules/MessageFilter';
import { Button } from '../atoms/Button';

interface ControlPanelProps {
  currentTheme: SnsTheme;
  designOptions: DesignOptions;
  colors: ColorScheme;
  currentPresetId: string | null;
  rooms: ChatRoom[];
  currentRoomId: string | null;
  onThemeChange: (theme: SnsTheme) => void;
  onPresetChange: (preset: ThemePreset) => void;
  onColorChange: (key: keyof ColorScheme, value: string) => void;
  onToggleAvatar: (show: boolean) => void;
  onToggleTimestamp: (show: boolean) => void;
  onToggleSenderName: (show: boolean) => void;
  onToggleStatus: (show: boolean) => void;
  onSelectRoom: (roomId: string) => void;
  onCreateRoom: (roomName: string) => void;
  onDeleteRoom: (roomId: string) => void;
  onExport: () => void;
  onClear: () => void;
  onExportJSON: () => void;
  onImportJSON: () => void;
  onExportTheme: () => void;
  onImportTheme: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  currentTheme,
  designOptions,
  colors,
  currentPresetId,
  rooms,
  currentRoomId,
  onThemeChange,
  onPresetChange,
  onColorChange,
  onToggleAvatar,
  onToggleTimestamp,
  onToggleSenderName,
  onToggleStatus,
  onSelectRoom,
  onCreateRoom,
  onDeleteRoom,
  onExport,
  onClear,
  onExportJSON,
  onImportJSON,
  onExportTheme,
  onImportTheme,
}) => {
  const [showColorSettings, setShowColorSettings] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        設定パネル
      </h2>

      {/* ルーム管理 */}
      <div className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <RoomSelector
          rooms={rooms}
          currentRoomId={currentRoomId}
          onSelectRoom={onSelectRoom}
          onCreateRoom={onCreateRoom}
          onDeleteRoom={onDeleteRoom}
        />
      </div>

      {/* メッセージ検索 */}
      <div className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <MessageSearch />
      </div>

      {/* メッセージフィルター */}
      <div className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <MessageFilter />
      </div>

      {/* ダークモード設定 */}
      <div className="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <DarkModeToggle />
      </div>

      {/* テーマプリセット */}
      <div className="space-y-4">
        <ThemePresetSelector
          onSelectPreset={onPresetChange}
          currentPresetId={currentPresetId || undefined}
        />
      </div>

      {/* カスタムカラー設定 */}
      <div className="space-y-2">
        <button
          onClick={() => setShowColorSettings(!showColorSettings)}
          className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {showColorSettings ? 'カスタムカラーを閉じる' : 'カスタムカラーを開く'}
        </button>
        {showColorSettings && (
          <CustomColorSettings
            colors={colors}
            onColorChange={onColorChange}
          />
        )}
      </div>

      {/* 従来のテーマセレクター（後方互換性のため残す） */}
      <ThemeSelector
        currentTheme={currentTheme}
        onThemeChange={onThemeChange}
      />

      {/* デザインオプション */}
      <DesignControls
        options={designOptions}
        onToggleAvatar={onToggleAvatar}
        onToggleTimestamp={onToggleTimestamp}
        onToggleSenderName={onToggleSenderName}
        onToggleStatus={onToggleStatus}
      />

      {/* エクスポート/インポート */}
      <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          画像・データ
        </h3>
        <Button variant="primary" fullWidth onClick={onExport}>
          📥 画像として保存
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" fullWidth onClick={onExportJSON}>
            💾 データ保存
          </Button>
          <Button variant="outline" fullWidth onClick={onImportJSON}>
            📂 データ読込
          </Button>
        </div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 pt-2">
          テーマ
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" fullWidth onClick={onExportTheme}>
            🎨 テーマ保存
          </Button>
          <Button variant="outline" fullWidth onClick={onImportTheme}>
            🎨 テーマ読込
          </Button>
        </div>
        <Button variant="outline" fullWidth onClick={onClear}>
          🗑️ メッセージをクリア
        </Button>
      </div>
    </div>
  );
};
