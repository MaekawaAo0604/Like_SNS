import React from 'react';
import { useDarkModeStore } from '../../stores';

export const DarkModeToggle: React.FC = () => {
  const { preference, isDark, setPreference, toggleDarkMode } = useDarkModeStore();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        ダークモード
      </h3>

      {/* 設定モード選択 */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="dark-mode-preference"
            value="system"
            checked={preference === 'system'}
            onChange={() => setPreference('system')}
            className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
            aria-label="システム設定に従う"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            システム設定に従う
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="dark-mode-preference"
            value="light"
            checked={preference === 'light'}
            onChange={() => setPreference('light')}
            className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
            aria-label="ライトモード"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            ライトモード
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="dark-mode-preference"
            value="dark"
            checked={preference === 'dark'}
            onChange={() => setPreference('dark')}
            className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
            aria-label="ダークモード"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            ダークモード
          </span>
        </label>
      </div>

      {/* クイックトグルボタン */}
      <button
        onClick={toggleDarkMode}
        className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      >
        {isDark ? '☀️ ライトモードに切り替え' : '🌙 ダークモードに切り替え'}
      </button>

      {/* 現在の状態表示 */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        現在: {isDark ? 'ダークモード' : 'ライトモード'}
        {preference === 'system' && ' (システム設定)'}
      </p>
    </div>
  );
};
