import type { Message } from '../types';

/**
 * メッセージの入力値をバリデーション
 */
export const validateMessageContent = (
  content: string,
): {
  isValid: boolean;
  error?: string;
} => {
  if (!content || content.trim().length === 0) {
    return { isValid: false, error: 'メッセージを入力してください' };
  }

  if (content.length > 5000) {
    return {
      isValid: false,
      error: 'メッセージは5000文字以内で入力してください',
    };
  }

  return { isValid: true };
};

/**
 * メッセージオブジェクトの妥当性をチェック
 */
export const validateMessage = (
  message: Message,
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (!message.id) {
    errors.push('Message ID is required');
  }

  if (!message.content || message.content.trim().length === 0) {
    errors.push('Message content is required');
  }

  if (!message.type) {
    errors.push('Message type is required');
  }

  if (
    !(message.timestamp instanceof Date) ||
    isNaN(message.timestamp.getTime())
  ) {
    errors.push('Valid timestamp is required');
  }

  if (typeof message.isSender !== 'boolean') {
    errors.push('isSender must be a boolean');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
