import React, { useState, useCallback } from 'react';
import { MessageInput } from '../molecules/MessageInput';
import { TemplateSelector } from '../molecules/TemplateSelector';
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
  const [receiverMessage, setReceiverMessage] = useState('');
  const [senderMessage, setSenderMessage] = useState('');

  const handleSend = (content: string, isSender: boolean) => {
    onSendMessage(content, isSender, senderName || undefined);
  };

  const handleSelectTemplate = useCallback(
    (content: string, isSender: boolean) => {
      if (isSender) {
        setSenderMessage(content);
      } else {
        setReceiverMessage(content);
      }
    },
    []
  );

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

      {/* テンプレートセレクター */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            受信用テンプレート
          </label>
          <TemplateSelector
            onSelectTemplate={(content) => handleSelectTemplate(content, false)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            送信用テンプレート
          </label>
          <TemplateSelector
            onSelectTemplate={(content) => handleSelectTemplate(content, true)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          受信メッセージを追加
        </label>
        <MessageInput
          onSend={(content) => {
            handleSend(content, false);
            setReceiverMessage('');
          }}
          placeholder="相手のメッセージを入力..."
          value={receiverMessage}
          onChange={setReceiverMessage}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          送信メッセージを追加
        </label>
        <MessageInput
          onSend={(content) => {
            handleSend(content, true);
            setSenderMessage('');
          }}
          placeholder="自分のメッセージを入力..."
          value={senderMessage}
          onChange={setSenderMessage}
        />
      </div>
    </div>
  );
};
