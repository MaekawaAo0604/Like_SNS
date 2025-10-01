import { create } from 'zustand';

export type FilterType = 'all' | 'sent' | 'received' | 'date';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface FilterState {
  filterType: FilterType;
  dateRange: DateRange;
  setFilterType: (type: FilterType) => void;
  setDateRange: (start: Date | null, end: Date | null) => void;
  clearFilter: () => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  filterType: 'all',
  dateRange: {
    start: null,
    end: null,
  },

  setFilterType: (type) => set({ filterType: type }),

  setDateRange: (start, end) =>
    set({
      dateRange: { start, end },
      filterType: 'date',
    }),

  clearFilter: () =>
    set({
      filterType: 'all',
      dateRange: { start: null, end: null },
    }),
}));
