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
