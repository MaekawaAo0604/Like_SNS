import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DesignOptions, BubbleStyle } from '../types';

interface DesignState {
  options: DesignOptions;
  setShowAvatar: (show: boolean) => void;
  setShowTimestamp: (show: boolean) => void;
  setShowSenderName: (show: boolean) => void;
  setShowStatus: (show: boolean) => void;
  setBubbleStyle: (style: Partial<BubbleStyle>) => void;
  resetDesign: () => void;
}

const defaultBubbleStyle: BubbleStyle = {
  borderRadius: '16px',
  padding: '12px 16px',
  maxWidth: '70%',
  fontSize: '16px',
};

const defaultDesignOptions: DesignOptions = {
  showAvatar: true,
  showTimestamp: true,
  showSenderName: true,
  showStatus: true,
  bubbleStyle: defaultBubbleStyle,
};

export const useDesignStore = create<DesignState>()(
  persist(
    (set) => ({
      options: defaultDesignOptions,

      setShowAvatar: (show) =>
        set((state) => ({
          options: { ...state.options, showAvatar: show },
        })),

      setShowTimestamp: (show) =>
        set((state) => ({
          options: { ...state.options, showTimestamp: show },
        })),

      setShowSenderName: (show) =>
        set((state) => ({
          options: { ...state.options, showSenderName: show },
        })),

      setShowStatus: (show) =>
        set((state) => ({
          options: { ...state.options, showStatus: show },
        })),

      setBubbleStyle: (style) =>
        set((state) => ({
          options: {
            ...state.options,
            bubbleStyle: { ...state.options.bubbleStyle, ...style },
          },
        })),

      resetDesign: () => set({ options: defaultDesignOptions }),
    }),
    {
      name: 'design-storage',
    },
  ),
);
