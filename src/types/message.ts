/**
 * メッセージの型定義
 */

export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'file';

export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  isSender: boolean;
  status: MessageStatus;
  avatarUrl?: string;
  senderName?: string;
  replyTo?: string; // 返信元メッセージID
  metadata?: {
    fileName?: string;
    fileSize?: number;
    duration?: number; // 音声・動画の再生時間（秒）
    thumbnailUrl?: string;
    width?: number;
    height?: number;
  };
}

export interface ChatRoom {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * JSON形式で保存されたMessage（Date型が文字列になっている）
 */
export interface MessageJSON extends Omit<Message, 'timestamp'> {
  timestamp: string;
}

/**
 * JSON形式で保存されたChatRoom（Date型が文字列になっている）
 */
export interface ChatRoomJSON {
  id: string;
  name: string;
  messages: MessageJSON[];
  createdAt: string;
  updatedAt: string;
}
