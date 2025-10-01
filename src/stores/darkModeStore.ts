import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DarkModePreference = 'light' | 'dark' | 'system';

interface DarkModeState {
  preference: DarkModePreference;
  isDark: boolean;
  setPreference: (preference: DarkModePreference) => void;
  toggleDarkMode: () => void;
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

        // システム設定の場合はmedia queryをチェック
        if (preference === 'system') {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          set({ isDark });
          updateDocumentClass(isDark);
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

          // システム設定の場合はmedia queryの変更を監視
          if (state.preference === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            const handleChange = () => {
              state.setPreference('system');
            };

            // Safari 13以前の互換性のため、両方のAPIをサポート
            if (mediaQuery.addEventListener) {
              mediaQuery.addEventListener('change', handleChange);
            } else {
              mediaQuery.addListener(handleChange);
            }
          }
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
