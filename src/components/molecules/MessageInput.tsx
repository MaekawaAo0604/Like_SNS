import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Textarea } from '../atoms/Textarea';

interface MessageInputProps {
  onSend: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  placeholder = 'メッセージを入力...',
  disabled = false,
}) => {
  const [content, setContent] = useState('');

  const handleSend = () => {
    if (content.trim()) {
      onSend(content.trim());
      setContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        fullWidth
        rows={2}
        className="resize-none"
      />
      <Button
        onClick={handleSend}
        disabled={disabled || !content.trim()}
        size="lg"
        className="flex-shrink-0"
      >
        送信
      </Button>
    </div>
  );
};
