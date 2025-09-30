import React, { useRef, useEffect } from 'react';
import type { Message } from '../../types';
import { MessageBubble } from '../molecules/MessageBubble';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900 min-h-[400px] max-h-[600px]"
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>メッセージがありません</p>
        </div>
      ) : (
        messages.map((message) => (
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
            onEdit={onEditMessage}
            onDelete={onDeleteMessage}
          />
        ))
      )}
    </div>
  );
};
