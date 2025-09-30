import React from 'react';

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
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {header && <header>{header}</header>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* メイン作業エリア */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {chatWindow}
            </div>
            {messageComposer}
          </div>

          {/* コントロールパネル */}
          <div className="lg:col-span-1">{controlPanel}</div>
        </div>
      </div>
    </div>
  );
};
