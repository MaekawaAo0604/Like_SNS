import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // 初期値を設定
    setMatches(media.matches);

    // リスナーを追加
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Safari 13以前の互換性のため、両方のAPIをサポート
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      media.addListener(listener);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
};

// プリセットのブレークポイント
export const useBreakpoint = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isSmallMobile = useMediaQuery('(max-width: 389px)');
  const isLargeMobile = useMediaQuery('(min-width: 390px) and (max-width: 767px)');

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallMobile,
    isLargeMobile,
  };
};
