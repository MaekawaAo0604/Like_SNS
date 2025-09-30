import React, { useCallback, useRef } from 'react';
import type { Message } from '../../types';
import { useMessageStore, useThemeStore, useDesignStore } from '../../stores';
import { useKeyboardShortcuts } from '../../hooks';
import { exportChatAsImage, downloadBlob } from '../../services';
import { MainTemplate } from '../templates/MainTemplate';
import { ChatWindow } from '../organisms/ChatWindow';
import { MessageComposer } from '../organisms/MessageComposer';
import { ControlPanel } from '../organisms/ControlPanel';

export const MainPage: React.FC = () => {
  const chatWindowRef = useRef<HTMLDivElement>(null);
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

  const handleExport = useCallback(async () => {
    if (!chatWindowRef.current) {
      alert('エクスポート対象が見つかりません');
      return;
    }

    const result = await exportChatAsImage(chatWindowRef.current, {
      format: 'png',
      quality: 'high',
      scale: 2,
    });

    if (result.success && result.data && result.metadata) {
      downloadBlob(result.data as Blob, result.metadata.fileName);
    } else {
      alert(`エクスポートに失敗しました: ${result.error}`);
    }
  }, []);

  const handleClear = useCallback(() => {
    if (confirm('すべてのメッセージを削除しますか？')) {
      clearMessages();
    }
  }, [clearMessages]);

  // キーボードショートカット設定
  useKeyboardShortcuts([
    {
      key: 's',
      ctrlKey: true,
      handler: handleExport,
    },
    {
      key: 'd',
      ctrlKey: true,
      handler: handleClear,
    },
    {
      key: 'a',
      ctrlKey: true,
      shiftKey: true,
      handler: () => setShowAvatar(!options.showAvatar),
    },
    {
      key: 't',
      ctrlKey: true,
      shiftKey: true,
      handler: () => setShowTimestamp(!options.showTimestamp),
    },
  ]);

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
        <div ref={chatWindowRef}>
          <ChatWindow
            messages={currentRoom?.messages || []}
            showAvatar={options.showAvatar}
            showTimestamp={options.showTimestamp}
            showSenderName={options.showSenderName}
            showStatus={options.showStatus}
            senderBubbleColor={config.colors.senderBubble}
            receiverBubbleColor={config.colors.receiverBubble}
          />
        </div>
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
