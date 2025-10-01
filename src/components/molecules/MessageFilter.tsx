import React, { useState } from 'react';
import { useFilterStore, type FilterType } from '../../stores';
import { Button } from '../atoms/Button';

export const MessageFilter: React.FC = () => {
  const { filterType, dateRange, setFilterType, setDateRange, clearFilter } =
    useFilterStore();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilterChange = (type: FilterType) => {
    setFilterType(type);
  };

  const handleDateRangeApply = () => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    setDateRange(start, end);
  };

  const handleClearFilter = () => {
    clearFilter();
    setStartDate('');
    setEndDate('');
  };

  const activeCount =
    filterType === 'all'
      ? 0
      : filterType === 'date' && (dateRange.start || dateRange.end)
        ? 1
        : 1;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          メッセージフィルター
        </h3>
        {activeCount > 0 && (
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
            {activeCount} 個適用中
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="filter-type"
              value="all"
              checked={filterType === 'all'}
              onChange={() => handleFilterChange('all')}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              aria-label="すべて表示"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              すべて表示
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="filter-type"
              value="sent"
              checked={filterType === 'sent'}
              onChange={() => handleFilterChange('sent')}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              aria-label="送信メッセージのみ"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              送信メッセージのみ
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="filter-type"
              value="received"
              checked={filterType === 'received'}
              onChange={() => handleFilterChange('received')}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              aria-label="受信メッセージのみ"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              受信メッセージのみ
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="filter-type"
              value="date"
              checked={filterType === 'date'}
              onChange={() => handleFilterChange('date')}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              aria-label="日付範囲指定"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              日付範囲指定
            </span>
          </label>
        </div>

        {filterType === 'date' && (
          <div className="space-y-2 pl-6 pt-2">
            <div className="space-y-1">
              <label
                htmlFor="filter-start-date"
                className="text-xs text-gray-600 dark:text-gray-400"
              >
                開始日
              </label>
              <input
                id="filter-start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="開始日"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="filter-end-date"
                className="text-xs text-gray-600 dark:text-gray-400"
              >
                終了日
              </label>
              <input
                id="filter-end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="終了日"
              />
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={handleDateRangeApply}
              disabled={!startDate && !endDate}
            >
              日付範囲を適用
            </Button>
          </div>
        )}

        {activeCount > 0 && (
          <Button variant="outline" fullWidth onClick={handleClearFilter}>
            フィルターをクリア
          </Button>
        )}
      </div>
    </div>
  );
};
