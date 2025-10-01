import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Textarea } from '../atoms/Textarea';

interface MessageInputProps {
  onSend: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  placeholder = 'メッセージを入力...',
  disabled = false,
  value: externalValue,
  onChange: externalOnChange,
}) => {
  const [internalValue, setInternalValue] = useState('');

  // 制御コンポーネントか非制御コンポーネントかを判定
  const isControlled = externalValue !== undefined;
  const content = isControlled ? externalValue : internalValue;

  const handleChange = (newValue: string) => {
    if (isControlled && externalOnChange) {
      externalOnChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleSend = () => {
    if (content.trim()) {
      onSend(content.trim());
      if (!isControlled) {
        setInternalValue('');
      }
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
        onChange={(e) => handleChange(e.target.value)}
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
