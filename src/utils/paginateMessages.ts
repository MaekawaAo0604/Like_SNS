import type { Message } from '../types';

export interface PaginationResult {
  messages: Message[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const paginateMessages = (
  messages: Message[],
  currentPage: number,
  itemsPerPage: number
): PaginationResult => {
  const totalItems = messages.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // ページ番号を有効範囲内に調整
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedMessages = messages.slice(startIndex, endIndex);

  return {
    messages: paginatedMessages,
    totalPages,
    currentPage: validCurrentPage,
    totalItems,
    hasNextPage: validCurrentPage < totalPages,
    hasPreviousPage: validCurrentPage > 1,
  };
};
