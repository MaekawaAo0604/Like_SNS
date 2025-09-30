import React, { useCallback } from 'react';
import type { Message } from '../../types';
import { useMessageStore, useThemeStore, useDesignStore } from '../../stores';
import { MainTemplate } from '../templates/MainTemplate';
import { ChatWindow } from '../organisms/ChatWindow';
import { MessageComposer } from '../organisms/MessageComposer';
import { ControlPanel } from '../organisms/ControlPanel';

export const MainPage: React.FC = () => {
  const { currentRoom, addMessage, clearMessages } = useMessageStore();
  const { config, setSnsTheme } = useThemeStore();
  const {
    options,
    setShowAvatar,
    setShowTimestamp,
    setShowSenderName,
    setShowStatus,
  } = useDesignStore();

  const handleSendMessage = useCallback(
    (content: string, isSender: boolean, senderName?: string) => {
      const message: Message = {
        id: crypto.randomUUID(),
        content,
        type: 'text',
        timestamp: new Date(),
        isSender,
        status: 'read',
        senderName,
      };
      addMessage(message);
    },
    [addMessage],
  );

  const handleExport = useCallback(() => {
    // TODO: Export functionality will be implemented in Phase 8
    alert('画像エクスポート機能は実装予定です');
  }, []);

  const handleClear = useCallback(() => {
    if (confirm('すべてのメッセージを削除しますか？')) {
      clearMessages();
    }
  }, [clearMessages]);

  const header = (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        SNS Chat Mockup Generator
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        モバイルファースト設計のSNS会話履歴作成ツール
      </p>
    </div>
  );

  return (
    <MainTemplate
      header={header}
      chatWindow={
        <ChatWindow
          messages={currentRoom?.messages || []}
          showAvatar={options.showAvatar}
          showTimestamp={options.showTimestamp}
          showSenderName={options.showSenderName}
          showStatus={options.showStatus}
          senderBubbleColor={config.colors.senderBubble}
          receiverBubbleColor={config.colors.receiverBubble}
        />
      }
      messageComposer={<MessageComposer onSendMessage={handleSendMessage} />}
      controlPanel={
        <ControlPanel
          currentTheme={config.snsTheme}
          designOptions={options}
          onThemeChange={setSnsTheme}
          onToggleAvatar={setShowAvatar}
          onToggleTimestamp={setShowTimestamp}
          onToggleSenderName={setShowSenderName}
          onToggleStatus={setShowStatus}
          onExport={handleExport}
          onClear={handleClear}
        />
      }
    />
  );
};
