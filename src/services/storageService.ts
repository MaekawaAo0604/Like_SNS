import type { ChatRoom } from '../types';

const STORAGE_KEY = 'sns-chat-mockup-data';

/**
 * LocalStorageからチャットデータを読み込み
 */
export const loadChatData = (): ChatRoom[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data);
    // Date型のデシリアライズ
    return parsed.map((room: ChatRoom) => ({
      ...room,
      createdAt: new Date(room.createdAt),
      updatedAt: new Date(room.updatedAt),
      messages: room.messages.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
    }));
  } catch (error) {
    console.error('Failed to load chat data:', error);
    return [];
  }
};

/**
 * LocalStorageにチャットデータを保存
 */
export const saveChatData = (rooms: ChatRoom[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  } catch (error) {
    console.error('Failed to save chat data:', error);
  }
};

/**
 * LocalStorageからチャットデータを削除
 */
export const clearChatData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear chat data:', error);
  }
};
