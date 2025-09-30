import html2canvas from 'html2canvas';
import type { ExportOptions, ExportResult } from '../types';

/**
 * チャット画面を画像としてエクスポート
 */
export const exportChatAsImage = async (
  element: HTMLElement,
  options: ExportOptions,
): Promise<ExportResult> => {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: options.scale || 2,
      logging: false,
      useCORS: true,
    });

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        },
        `image/${options.format === 'jpg' ? 'jpeg' : 'png'}`,
        options.quality === 'high'
          ? 0.95
          : options.quality === 'medium'
            ? 0.8
            : 0.6,
      );
    });

    return {
      success: true,
      data: blob,
      metadata: {
        fileName: `chat-mockup-${Date.now()}.${options.format}`,
        fileSize: blob.size,
        format: options.format,
        timestamp: new Date(),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Export failed',
    };
  }
};

/**
 * チャットデータをJSONとしてエクスポート
 */
export const exportChatAsJSON = (data: unknown): ExportResult => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    return {
      success: true,
      data: blob,
      metadata: {
        fileName: `chat-export-${Date.now()}.json`,
        fileSize: blob.size,
        format: 'json',
        timestamp: new Date(),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'JSON export failed',
    };
  }
};

/**
 * Blobをダウンロード
 */
export const downloadBlob = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
