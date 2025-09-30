/**
 * エクスポート機能の型定義
 */

export type ExportFormat = 'png' | 'jpg' | 'pdf' | 'json';

export type ExportQuality = 'low' | 'medium' | 'high';

export interface ExportOptions {
  format: ExportFormat;
  quality: ExportQuality;
  width?: number;
  height?: number;
  scale?: number;
  includeMetadata?: boolean;
  watermark?: string;
}

export interface ExportResult {
  success: boolean;
  data?: Blob | string;
  error?: string;
  metadata?: {
    fileName: string;
    fileSize: number;
    format: ExportFormat;
    timestamp: Date;
  };
}
