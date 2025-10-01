import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DarkModePreference = 'light' | 'dark' | 'system';

interface DarkModeState {
  preference: DarkModePreference;
  isDark: boolean;
  setPreference: (preference: DarkModePreference) => void;
  toggleDarkMode: () => void;
}

// メディアクエリイベントリスナーの参照を保持（クリーンアップ用）
let mediaQueryListener: (() => void) | null = null;

/**
 * メディアクエリイベントリスナーをクリーンアップ
 */
function cleanupMediaQueryListener() {
  if (mediaQueryListener) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Safari 13以前の互換性のため、両方のAPIをサポート
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', mediaQueryListener);
    } else {
      mediaQuery.removeListener(mediaQueryListener);
    }

    mediaQueryListener = null;
  }
}

/**
 * ダークモードストア
 * システム設定との連携とユーザー設定の永続化を管理
 */
export const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set, get) => ({
      preference: 'system',
      isDark: false,

      setPreference: (preference) => {
        set({ preference });

        // 既存のリスナーをクリーンアップ
        cleanupMediaQueryListener();

        // システム設定の場合はmedia queryをチェック
        if (preference === 'system') {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          set({ isDark });
          updateDocumentClass(isDark);

          // システム設定の変更を監視
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

          mediaQueryListener = () => {
            const state = get();
            // system設定のときのみ更新
            if (state.preference === 'system') {
              const isDark = mediaQuery.matches;
              set({ isDark });
              updateDocumentClass(isDark);
            }
          };

          // Safari 13以前の互換性のため、両方のAPIをサポート
          if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', mediaQueryListener);
          } else {
            mediaQuery.addListener(mediaQueryListener);
          }
        } else {
          const isDark = preference === 'dark';
          set({ isDark });
          updateDocumentClass(isDark);
        }
      },

      toggleDarkMode: () => {
        const currentPreference = get().preference;

        // system設定の場合は、現在の状態の逆をユーザー設定として保存
        if (currentPreference === 'system') {
          const newPreference = get().isDark ? 'light' : 'dark';
          get().setPreference(newPreference);
        } else {
          // light/dark設定の場合はトグル
          const newPreference = currentPreference === 'light' ? 'dark' : 'light';
          get().setPreference(newPreference);
        }
      },
    }),
    {
      name: 'dark-mode-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // 再読み込み時に設定を適用
          state.setPreference(state.preference);
        }
      },
    }
  )
);

/**
 * ドキュメントのdarkクラスを更新
 */
function updateDocumentClass(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
