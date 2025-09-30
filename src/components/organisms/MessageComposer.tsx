import React, { useState } from 'react';
import { MessageInput } from '../molecules/MessageInput';
import { Input } from '../atoms/Input';

interface MessageComposerProps {
  onSendMessage: (
    content: string,
    isSender: boolean,
    senderName?: string,
  ) => void;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSendMessage,
}) => {
  const [senderName, setSenderName] = useState('');

  const handleSend = (content: string, isSender: boolean) => {
    onSendMessage(content, isSender, senderName || undefined);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-4">
      <div className="flex gap-2 items-end">
        <Input
          placeholder="送信者名（オプション）"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          fullWidth
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          受信メッセージを追加
        </label>
        <MessageInput
          onSend={(content) => handleSend(content, false)}
          placeholder="相手のメッセージを入力..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          送信メッセージを追加
        </label>
        <MessageInput
          onSend={(content) => handleSend(content, true)}
          placeholder="自分のメッセージを入力..."
        />
      </div>
    </div>
  );
};
