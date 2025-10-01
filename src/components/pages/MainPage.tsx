import React, { useCallback, useRef, useEffect, useMemo, useState } from 'react';
import type { Message, ChatRoomJSON } from '../../types';
import { useMessageStore, useThemeStore, useDesignStore, useFilterStore, useSortStore, usePaginationStore, useSearchStore } from '../../stores';
import { useKeyboardShortcuts } from '../../hooks';
import { filterMessages } from '../../utils/filterMessages';
import { sortMessages } from '../../utils/sortMessages';
import { paginateMessages } from '../../utils/paginateMessages';
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
import { KeyboardShortcutsHelp } from '../molecules/KeyboardShortcutsHelp';

export const MainPage: React.FC = () => {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const {
    currentRoom,
    rooms,
    addMessage,
    updateMessage,
    deleteMessage,
    clearMessages,
    reorderMessages,
    createRoom,
    loadRoom,
    deleteRoom,
    importRoom,
  } = useMessageStore();
  const { config, currentPresetId, setSnsTheme, applyPreset, updateColor, exportTheme, importTheme } = useThemeStore();
  const {
    options,
    setShowAvatar,
    setShowTimestamp,
    setShowSenderName,
    setShowStatus,
  } = useDesignStore();

  const { filterType, dateRange } = useFilterStore();
  const { sortType } = useSortStore();
  const { currentPage, itemsPerPage, setCurrentPage } = usePaginationStore();
  const { nextHighlight, prevHighlight } = useSearchStore();

  // フィルター・ソート・ページネーション適用済みメッセージ
  const processedMessages = useMemo(() => {
    if (!currentRoom) {
      return {
        messages: [],
        totalPages: 0,
        currentPage: 1,
        totalItems: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };
    }

    const filtered = filterMessages(currentRoom.messages, filterType, dateRange);
    const sorted = sortMessages(filtered, sortType);
    return paginateMessages(sorted, currentPage, itemsPerPage);
  }, [currentRoom, filterType, dateRange, sortType, currentPage, itemsPerPage]);

  // 初期化: currentRoomがnullの場合、デフォルトルームを作成
  useEffect(() => {
    if (!currentRoom) {
      createRoom('Default Chat');
    }
  }, [currentRoom, createRoom]);

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
      // JSONからパースしたオブジェクトを型アサーション
      const data = result.data as unknown as ChatRoomJSON;

      // ChatRoom形式のデータかチェック
      if (data.id && data.name && Array.isArray(data.messages)) {
        // メッセージのtimestampをDate型に変換
        const messages = data.messages.map((msg) => ({
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

        // importRoomアクションを使用してルームを追加
        importRoom(newRoom);

        alert('データを読み込みました');
      } else {
        alert('無効なデータ形式です');
      }
    } else {
      alert(`読み込みに失敗しました: ${result.error}`);
    }
  }, [importRoom]);

  const handleExportTheme = useCallback(() => {
    const themeJSON = exportTheme();
    const blob = new Blob([themeJSON], { type: 'application/json' });
    const fileName = `theme-${new Date().toISOString().slice(0, 10)}.json`;
    downloadBlob(blob, fileName);
  }, [exportTheme]);

  const handleImportTheme = useCallback(async () => {
    const file = await selectFile('application/json');
    if (!file) return;

    try {
      const text = await file.text();
      importTheme(text);
      alert('テーマを読み込みました');
    } catch (error) {
      alert(`テーマの読み込みに失敗しました: ${error instanceof Error ? error.message : error}`);
    }
  }, [importTheme]);

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
    {
      key: 'n',
      ctrlKey: true,
      shiftKey: true,
      handler: () => setShowSenderName(!options.showSenderName),
    },
    {
      key: 's',
      ctrlKey: true,
      shiftKey: true,
      handler: () => setShowStatus(!options.showStatus),
    },
    {
      key: '?',
      ctrlKey: true,
      handler: () => setShowShortcutsHelp(true),
    },
    {
      key: 'Escape',
      handler: () => setShowShortcutsHelp(false),
    },
    {
      key: 'ArrowLeft',
      ctrlKey: true,
      handler: () => {
        if (processedMessages.hasPreviousPage) {
          setCurrentPage(currentPage - 1);
        }
      },
    },
    {
      key: 'ArrowRight',
      ctrlKey: true,
      handler: () => {
        if (processedMessages.hasNextPage) {
          setCurrentPage(currentPage + 1);
        }
      },
    },
    {
      key: 'ArrowUp',
      ctrlKey: true,
      handler: prevHighlight,
    },
    {
      key: 'ArrowDown',
      ctrlKey: true,
      handler: nextHighlight,
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
            messages={processedMessages.messages}
            showAvatar={options.showAvatar}
            showTimestamp={options.showTimestamp}
            showSenderName={options.showSenderName}
            showStatus={options.showStatus}
            senderBubbleColor={config.colors.senderBubble}
            receiverBubbleColor={config.colors.receiverBubble}
            onEditMessage={handleEditMessage}
            onDeleteMessage={handleDeleteMessage}
            onReorderMessages={reorderMessages}
            paginationInfo={{
              totalPages: processedMessages.totalPages,
              totalItems: processedMessages.totalItems,
              hasNextPage: processedMessages.hasNextPage,
              hasPreviousPage: processedMessages.hasPreviousPage,
            }}
          />
        </div>
      }
      messageComposer={<MessageComposer onSendMessage={handleSendMessage} />}
      controlPanel={
        <ControlPanel
          currentTheme={config.snsTheme}
          designOptions={options}
          colors={config.colors}
          currentPresetId={currentPresetId}
          rooms={rooms}
          currentRoomId={currentRoom?.id || null}
          onThemeChange={setSnsTheme}
          onPresetChange={applyPreset}
          onColorChange={updateColor}
          onToggleAvatar={setShowAvatar}
          onToggleTimestamp={setShowTimestamp}
          onToggleSenderName={setShowSenderName}
          onToggleStatus={setShowStatus}
          onSelectRoom={loadRoom}
          onCreateRoom={createRoom}
          onDeleteRoom={deleteRoom}
          onExport={handleExport}
          onClear={handleClear}
          onExportJSON={handleExportJSON}
          onImportJSON={handleImportJSON}
          onExportTheme={handleExportTheme}
          onImportTheme={handleImportTheme}
        />
      }
    >
      <KeyboardShortcutsHelp
        isOpen={showShortcutsHelp}
        onClose={() => setShowShortcutsHelp(false)}
      />
    </MainTemplate>
  );
};
