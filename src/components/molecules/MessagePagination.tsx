import React from 'react';
import { usePaginationStore } from '../../stores';
import { Button } from '../atoms/Button';

interface MessagePaginationProps {
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const MessagePagination: React.FC<MessagePaginationProps> = ({
  totalPages,
  totalItems,
  hasNextPage,
  hasPreviousPage,
}) => {
  const { currentPage, itemsPerPage, setCurrentPage, setItemsPerPage } =
    usePaginationStore();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
  };

  // ページ番号のリストを生成
  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      // 全ページを表示
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 最初のページ
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push('...');
      }

      // 現在のページ周辺
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }

      // 最後のページ
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4 border-t border-gray-200 dark:border-gray-700">
      {/* ページ情報 */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {totalItems}件中 {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)}件を表示
      </div>

      {/* ページネーションコントロール */}
      <div className="flex items-center gap-2">
        {/* 前へボタン */}
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
        >
          ← 前へ
        </Button>

        {/* ページ番号 */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNum, index) => {
            if (pageNum === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-gray-500 dark:text-gray-400"
                >
                  ...
                </span>
              );
            }

            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum as number)}
                className={`
                  px-3 py-1 rounded-md text-sm font-medium transition-colors
                  ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* 次へボタン */}
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
        >
          次へ →
        </Button>
      </div>

      {/* ページサイズ選択 */}
      <div className="flex items-center gap-2 text-sm">
        <label
          htmlFor="items-per-page"
          className="text-gray-600 dark:text-gray-400"
        >
          表示件数:
        </label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
        >
          <option value={10}>10件</option>
          <option value={20}>20件</option>
          <option value={50}>50件</option>
          <option value={100}>100件</option>
        </select>
      </div>
    </div>
  );
};
