import React, { useState, useMemo, useCallback } from 'react';
import type { Message } from '../../types';
import { Avatar } from '../atoms/Avatar';
import { MessageActions } from './MessageActions';

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
  showTimestamp?: boolean;
  showSenderName?: boolean;
  showStatus?: boolean;
  bubbleColor?: string;
  onEdit?: (id: string, content: string) => void;
  onDelete?: (id: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = React.memo(
  ({
    message,
    showAvatar = true,
    showTimestamp = true,
    showSenderName = true,
    showStatus = true,
    bubbleColor,
    onEdit,
    onDelete,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(message.content);

    // メモ化: formatTime
    const formattedTime = useMemo(() => {
      return new Date(message.timestamp).toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }, [message.timestamp]);

    // メモ化: statusIcon
    const statusIcon = useMemo(() => {
      const statusIcons = {
        sent: '✓',
        delivered: '✓✓',
        read: '✓✓',
      };
      return statusIcons[message.status];
    }, [message.status]);

    // メモ化: スタイル
    const isSender = message.isSender;
    const bubbleStyle = useMemo(() => {
      const defaultBubbleColor = isSender ? 'bg-blue-500' : 'bg-gray-200';
      const textColor = isSender ? 'text-white' : 'text-gray-900';
      return {
        bubbleColor: bubbleColor || defaultBubbleColor,
        textColor,
      };
    }, [isSender, bubbleColor]);

    // メモ化: handleEdit
    const handleEdit = useCallback(() => {
      if (onEdit && editContent.trim()) {
        onEdit(message.id, editContent.trim());
        setIsEditing(false);
      }
    }, [onEdit, editContent, message.id]);

    // メモ化: handleDelete
    const handleDelete = useCallback(() => {
      if (onDelete && confirm('このメッセージを削除しますか？')) {
        onDelete(message.id);
      }
    }, [onDelete, message.id]);

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
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="px-4 py-2 border rounded-2xl flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEdit();
                if (e.key === 'Escape') setIsEditing(false);
              }}
              autoFocus
            />
            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg"
            >
              ✓
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-300 rounded-lg"
            >
              ✕
            </button>
          </div>
        ) : (
          <div
            className={`
              ${bubbleStyle.bubbleColor}
              ${bubbleStyle.textColor}
              px-4 py-2 rounded-2xl
              break-words
            `}
          >
            {message.content}
          </div>
        )}
        <div
          className={`flex gap-2 items-center mt-1 px-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {showTimestamp && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formattedTime}
            </span>
          )}
          {showStatus && isSender && (
            <span
              className={`text-xs ${message.status === 'read' ? 'text-blue-500' : 'text-gray-400'}`}
            >
              {statusIcon}
            </span>
          )}
        </div>
        {!isEditing && (onEdit || onDelete) && (
          <MessageActions
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
  },
);

MessageBubble.displayName = 'MessageBubble';
