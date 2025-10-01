import React from 'react';
import { useSortStore } from '../../stores';
import type { SortType } from '../../stores';

export const MessageSort: React.FC = () => {
  const { sortType, setSortType } = useSortStore();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value as SortType);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        メッセージソート
      </h3>

      <div className="space-y-2">
        <label className="text-xs text-gray-600 dark:text-gray-400">
          並び順
        </label>
        <select
          value={sortType}
          onChange={handleSortChange}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="newest">新しい順</option>
          <option value="oldest">古い順</option>
          <option value="sender-first">送信者優先</option>
          <option value="receiver-first">受信者優先</option>
        </select>
      </div>

      {sortType !== 'newest' && (
        <div className="flex items-center gap-2 mt-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            ソート中: {getSortLabel(sortType)}
          </span>
        </div>
      )}
    </div>
  );
};

const getSortLabel = (sortType: SortType): string => {
  switch (sortType) {
    case 'newest':
      return '新しい順';
    case 'oldest':
      return '古い順';
    case 'sender-first':
      return '送信者優先';
    case 'receiver-first':
      return '受信者優先';
    default:
      return '';
  }
};
