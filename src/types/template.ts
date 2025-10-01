/**
 * メッセージテンプレート関連の型定義
 */

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  category?: string;
  createdAt: Date;
}

export interface MessageTemplateJSON {
  id: string;
  name: string;
  content: string;
  category?: string;
  createdAt: string;
}
