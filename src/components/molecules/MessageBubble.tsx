import React from 'react';
import type { Message } from '../../types';
import { Avatar } from '../atoms/Avatar';

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
  showTimestamp?: boolean;
  showSenderName?: boolean;
  showStatus?: boolean;
  bubbleColor?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  showAvatar = true,
  showTimestamp = true,
  showSenderName = true,
  showStatus = true,
  bubbleColor,
}) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusIcons = {
    sent: '✓',
    delivered: '✓✓',
    read: '✓✓',
  };

  const isSender = message.isSender;
  const defaultBubbleColor = isSender ? 'bg-blue-500' : 'bg-gray-200';
  const textColor = isSender ? 'text-white' : 'text-gray-900';

  return (
    <div
      className={`flex gap-2 mb-3 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {showAvatar && (
        <Avatar src={message.avatarUrl} size="sm" className="flex-shrink-0" />
      )}
      <div
        className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} max-w-[70%]`}
      >
        {showSenderName && message.senderName && !isSender && (
          <span className="text-xs text-gray-600 dark:text-gray-400 mb-1 px-2">
            {message.senderName}
          </span>
        )}
        <div
          className={`
            ${bubbleColor || defaultBubbleColor}
            ${textColor}
            px-4 py-2 rounded-2xl
            break-words
          `}
        >
          {message.content}
        </div>
        <div
          className={`flex gap-2 items-center mt-1 px-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {showTimestamp && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatTime(message.timestamp)}
            </span>
          )}
          {showStatus && isSender && (
            <span
              className={`text-xs ${message.status === 'read' ? 'text-blue-500' : 'text-gray-400'}`}
            >
              {statusIcons[message.status]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
