import { create } from 'zustand';

interface SearchState {
  searchQuery: string;
  isSearchActive: boolean;
  highlightedMessageIds: string[];
  currentHighlightIndex: number;
  setSearchQuery: (query: string) => void;
  setIsSearchActive: (active: boolean) => void;
  setHighlightedMessageIds: (ids: string[]) => void;
  setCurrentHighlightIndex: (index: number) => void;
  clearSearch: () => void;
  nextHighlight: () => void;
  prevHighlight: () => void;
}

export const useSearchStore = create<SearchState>()((set, get) => ({
  searchQuery: '',
  isSearchActive: false,
  highlightedMessageIds: [],
  currentHighlightIndex: -1,

  setSearchQuery: (query) => set({ searchQuery: query }),

  setIsSearchActive: (active) => set({ isSearchActive: active }),

  setHighlightedMessageIds: (ids) =>
    set({
      highlightedMessageIds: ids,
      currentHighlightIndex: ids.length > 0 ? 0 : -1,
    }),

  setCurrentHighlightIndex: (index) => set({ currentHighlightIndex: index }),

  clearSearch: () =>
    set({
      searchQuery: '',
      isSearchActive: false,
      highlightedMessageIds: [],
      currentHighlightIndex: -1,
    }),

  nextHighlight: () => {
    const { highlightedMessageIds, currentHighlightIndex } = get();
    if (highlightedMessageIds.length === 0) return;
    const nextIndex = (currentHighlightIndex + 1) % highlightedMessageIds.length;
    set({ currentHighlightIndex: nextIndex });
  },

  prevHighlight: () => {
    const { highlightedMessageIds, currentHighlightIndex } = get();
    if (highlightedMessageIds.length === 0) return;
    const prevIndex =
      currentHighlightIndex === 0
        ? highlightedMessageIds.length - 1
        : currentHighlightIndex - 1;
    set({ currentHighlightIndex: prevIndex });
  },
}));
