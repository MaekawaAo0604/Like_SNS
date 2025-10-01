import React, { useState } from 'react';
import { useBreakpoint } from '../../hooks/useMediaQuery';

interface MainTemplateProps {
  header?: React.ReactNode;
  chatWindow: React.ReactNode;
  messageComposer: React.ReactNode;
  controlPanel: React.ReactNode;
}

export const MainTemplate: React.FC<MainTemplateProps> = ({
  header,
  chatWindow,
  messageComposer,
  controlPanel,
}) => {
  const { isMobile, isTablet } = useBreakpoint();
  const [showControlPanel, setShowControlPanel] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {header && <header className="p-2 sm:p-4">{header}</header>}

        {/* モバイル: コントロールパネル切り替えボタン */}
        {(isMobile || isTablet) && (
          <div className="p-2 sm:p-4">
            <button
              onClick={() => setShowControlPanel(!showControlPanel)}
              className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              aria-expanded={showControlPanel}
              aria-controls="control-panel"
            >
              {showControlPanel ? '設定を閉じる' : '設定を開く'}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-4">
          {/* メイン作業エリア */}
          <div
            className={`lg:col-span-2 space-y-2 sm:space-y-4 ${
              (isMobile || isTablet) && showControlPanel ? 'hidden' : ''
            }`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {chatWindow}
            </div>
            {messageComposer}
          </div>

          {/* コントロールパネル */}
          <div
            id="control-panel"
            className={`lg:col-span-1 ${
              (isMobile || isTablet) && !showControlPanel ? 'hidden' : ''
            }`}
          >
            {controlPanel}
          </div>
        </div>
      </div>
    </div>
  );
};
