import { create } from 'zustand';

export type SortType = 'newest' | 'oldest' | 'sender-first' | 'receiver-first';

interface SortState {
  sortType: SortType;
  setSortType: (type: SortType) => void;
}

export const useSortStore = create<SortState>()((set) => ({
  sortType: 'newest',
  setSortType: (type) => set({ sortType: type }),
}));
