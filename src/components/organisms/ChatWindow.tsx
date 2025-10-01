import React, { useRef, useEffect } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import type { Message } from '../../types';
import { MessageBubble } from '../molecules/MessageBubble';
import { useSearchStore } from '../../stores';

interface ChatWindowProps {
  messages: Message[];
  showAvatar?: boolean;
  showTimestamp?: boolean;
  showSenderName?: boolean;
  showStatus?: boolean;
  senderBubbleColor?: string;
  receiverBubbleColor?: string;
  onEditMessage?: (id: string, content: string) => void;
  onDeleteMessage?: (id: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  showAvatar = true,
  showTimestamp = true,
  showSenderName = true,
  showStatus = true,
  senderBubbleColor,
  receiverBubbleColor,
  onEditMessage,
  onDeleteMessage,
}) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const { highlightedMessageIds, currentHighlightIndex } = useSearchStore();

  // 新しいメッセージが追加されたら最下部にスクロール
  useEffect(() => {
    if (virtuosoRef.current && messages.length > 0) {
      virtuosoRef.current.scrollToIndex({
        index: messages.length - 1,
        align: 'end',
        behavior: 'smooth',
      });
    }
  }, [messages.length]);

  // メッセージが少ない場合は通常のレンダリング
  if (messages.length === 0) {
    return (
      <div
        className="flex-1 flex items-center justify-center p-4 bg-white dark:bg-gray-900 min-h-[400px] max-h-[600px]"
        role="log"
        aria-live="polite"
        aria-label="チャットメッセージ"
      >
        <p className="text-gray-400">メッセージがありません</p>
      </div>
    );
  }

  // メッセージが100件未満の場合は通常レンダリング
  if (messages.length < 100) {
    return (
      <div
        className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900 min-h-[400px] max-h-[600px]"
        role="log"
        aria-live="polite"
        aria-label="チャットメッセージ"
        aria-atomic="false"
      >
        {messages.map((message) => {
          const isHighlighted = highlightedMessageIds.includes(message.id);
          const isCurrentHighlight =
            highlightedMessageIds[currentHighlightIndex] === message.id;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              showAvatar={showAvatar}
              showTimestamp={showTimestamp}
              showSenderName={showSenderName}
              showStatus={showStatus}
              bubbleColor={
                message.isSender ? senderBubbleColor : receiverBubbleColor
              }
              isHighlighted={isHighlighted}
              isCurrentHighlight={isCurrentHighlight}
              onEdit={onEditMessage}
              onDelete={onDeleteMessage}
            />
          );
        })}
      </div>
    );
  }

  // 100件以上の場合は仮想スクロール
  return (
    <div
      className="flex-1 bg-white dark:bg-gray-900 min-h-[400px] max-h-[600px]"
      role="log"
      aria-live="polite"
      aria-label="チャットメッセージ"
      aria-atomic="false"
    >
      <Virtuoso
        ref={virtuosoRef}
        style={{ height: '600px' }}
        data={messages}
        itemContent={(_index, message) => {
          const isHighlighted = highlightedMessageIds.includes(message.id);
          const isCurrentHighlight =
            highlightedMessageIds[currentHighlightIndex] === message.id;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              showAvatar={showAvatar}
              showTimestamp={showTimestamp}
              showSenderName={showSenderName}
              showStatus={showStatus}
              bubbleColor={
                message.isSender ? senderBubbleColor : receiverBubbleColor
              }
              isHighlighted={isHighlighted}
              isCurrentHighlight={isCurrentHighlight}
              onEdit={onEditMessage}
              onDelete={onDeleteMessage}
            />
          );
        }}
        followOutput="smooth"
      />
    </div>
  );
};
