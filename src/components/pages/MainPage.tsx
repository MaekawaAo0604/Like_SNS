import React, { useCallback, useRef } from 'react';
import type { Message } from '../../types';
import { useMessageStore, useThemeStore, useDesignStore } from '../../stores';
import { useKeyboardShortcuts } from '../../hooks';
import {
  exportChatAsImage,
  exportChatAsJSON,
  importChatFromJSON,
  selectFile,
  downloadBlob,
} from '../../services';
import { MainTemplate } from '../templates/MainTemplate';
import { ChatWindow } from '../organisms/ChatWindow';
import { MessageComposer } from '../organisms/MessageComposer';
import { ControlPanel } from '../organisms/ControlPanel';

export const MainPage: React.FC = () => {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const {
    currentRoom,
    addMessage,
    updateMessage,
    deleteMessage,
    clearMessages,
  } = useMessageStore();
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

  const handleEditMessage = useCallback(
    (id: string, content: string) => {
      updateMessage(id, { content });
    },
    [updateMessage],
  );

  const handleDeleteMessage = useCallback(
    (id: string) => {
      deleteMessage(id);
    },
    [deleteMessage],
  );

  const handleExportJSON = useCallback(() => {
    if (!currentRoom) {
      alert('エクスポートするデータがありません');
      return;
    }

    const result = exportChatAsJSON(currentRoom);
    if (result.success && result.data && result.metadata) {
      downloadBlob(result.data as Blob, result.metadata.fileName);
    } else {
      alert(`エクスポートに失敗しました: ${result.error}`);
    }
  }, [currentRoom]);

  const handleImportJSON = useCallback(async () => {
    const file = await selectFile('application/json');
    if (!file) return;

    const result = await importChatFromJSON(file);
    if (result.success && result.data) {
      const data = result.data as any;

      // ChatRoom形式のデータかチェック
      if (data.id && data.name && Array.isArray(data.messages)) {
        // メッセージのtimestampをDate型に変換
        const messages = data.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));

        // 新しいルームとして作成
        const newRoom = {
          ...data,
          messages,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        };

        // 現在のルームとして設定
        useMessageStore.setState({
          currentRoom: newRoom,
          rooms: [...useMessageStore.getState().rooms, newRoom],
        });

        alert('データを読み込みました');
      } else {
        alert('無効なデータ形式です');
      }
    } else {
      alert(`読み込みに失敗しました: ${result.error}`);
    }
  }, []);

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
            onEditMessage={handleEditMessage}
            onDeleteMessage={handleDeleteMessage}
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
          onExportJSON={handleExportJSON}
          onImportJSON={handleImportJSON}
        />
      }
    />
  );
};
