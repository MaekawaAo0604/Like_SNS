import { create } from 'zustand';

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  resetPagination: () => void;
}

export const usePaginationStore = create<PaginationState>()((set) => ({
  currentPage: 1,
  itemsPerPage: 20,

  setCurrentPage: (page) => set({ currentPage: page }),

  setItemsPerPage: (items) =>
    set({
      itemsPerPage: items,
      currentPage: 1, // ページサイズ変更時は1ページ目にリセット
    }),

  resetPagination: () =>
    set({
      currentPage: 1,
      itemsPerPage: 20,
    }),
}));
