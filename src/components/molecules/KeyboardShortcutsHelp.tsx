import React from 'react';
import { Button } from '../atoms/Button';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    {
      category: '基本操作',
      items: [
        { keys: ['Ctrl', 'S'], description: '画像として保存' },
        { keys: ['Ctrl', 'D'], description: 'メッセージをクリア' },
        { keys: ['Ctrl', '?'], description: 'ショートカットヘルプを表示' },
        { keys: ['Esc'], description: 'ダイアログを閉じる' },
      ],
    },
    {
      category: '表示切替',
      items: [
        { keys: ['Ctrl', 'Shift', 'A'], description: 'アバター表示切替' },
        { keys: ['Ctrl', 'Shift', 'T'], description: 'タイムスタンプ表示切替' },
        { keys: ['Ctrl', 'Shift', 'N'], description: '送信者名表示切替' },
        { keys: ['Ctrl', 'Shift', 'S'], description: 'ステータス表示切替' },
      ],
    },
    {
      category: 'ナビゲーション',
      items: [
        { keys: ['Ctrl', '←'], description: '前のページ' },
        { keys: ['Ctrl', '→'], description: '次のページ' },
        { keys: ['Ctrl', '↑'], description: '前の検索結果' },
        { keys: ['Ctrl', '↓'], description: '次の検索結果' },
      ],
    },
  ];

  return (
    <>
      {/* オーバーレイ */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* モーダル */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          {/* ヘッダー */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              キーボードショートカット
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="閉じる"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* コンテンツ */}
          <div className="p-6 space-y-6">
            {shortcuts.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {item.description}
                      </span>
                      <div className="flex items-center gap-1">
                        {item.keys.map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded shadow-sm">
                              {key}
                            </kbd>
                            {keyIndex < item.keys.length - 1 && (
                              <span className="text-gray-500 dark:text-gray-400">
                                +
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* フッター */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <Button variant="primary" fullWidth onClick={onClose}>
              閉じる
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
