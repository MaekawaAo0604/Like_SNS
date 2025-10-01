import type { Message } from '../types';

export interface MessageStatistics {
  totalMessages: number;
  sentMessages: number;
  receivedMessages: number;
  averageMessageLength: number;
  longestMessage: number;
  shortestMessage: number;
  messagesPerDay: Record<string, number>;
  messagesPerHour: Record<number, number>;
  firstMessageDate: Date | null;
  lastMessageDate: Date | null;
}

export const calculateMessageStatistics = (
  messages: Message[]
): MessageStatistics => {
  if (messages.length === 0) {
    return {
      totalMessages: 0,
      sentMessages: 0,
      receivedMessages: 0,
      averageMessageLength: 0,
      longestMessage: 0,
      shortestMessage: 0,
      messagesPerDay: {},
      messagesPerHour: {},
      firstMessageDate: null,
      lastMessageDate: null,
    };
  }

  const sentMessages = messages.filter((msg) => msg.isSender).length;
  const receivedMessages = messages.length - sentMessages;

  // メッセージ長の統計
  const messageLengths = messages.map((msg) => msg.content.length);
  const totalLength = messageLengths.reduce((sum, len) => sum + len, 0);
  const averageMessageLength = Math.round(totalLength / messages.length);
  const longestMessage = Math.max(...messageLengths);
  const shortestMessage = Math.min(...messageLengths);

  // 日付ごとのメッセージ数
  const messagesPerDay: Record<string, number> = {};
  messages.forEach((msg) => {
    const date = new Date(msg.timestamp);
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
    messagesPerDay[dateKey] = (messagesPerDay[dateKey] || 0) + 1;
  });

  // 時間帯ごとのメッセージ数
  const messagesPerHour: Record<number, number> = {};
  messages.forEach((msg) => {
    const date = new Date(msg.timestamp);
    const hour = date.getHours();
    messagesPerHour[hour] = (messagesPerHour[hour] || 0) + 1;
  });

  // 最初と最後のメッセージ日時
  const timestamps = messages.map((msg) => new Date(msg.timestamp).getTime());
  const firstMessageDate = new Date(Math.min(...timestamps));
  const lastMessageDate = new Date(Math.max(...timestamps));

  return {
    totalMessages: messages.length,
    sentMessages,
    receivedMessages,
    averageMessageLength,
    longestMessage,
    shortestMessage,
    messagesPerDay,
    messagesPerHour,
    firstMessageDate,
    lastMessageDate,
  };
};
