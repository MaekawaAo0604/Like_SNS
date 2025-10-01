import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MessageTemplate } from '../types';

interface TemplateState {
  templates: MessageTemplate[];
  addTemplate: (name: string, content: string, category?: string) => void;
  updateTemplate: (id: string, updates: Partial<MessageTemplate>) => void;
  deleteTemplate: (id: string) => void;
  getTemplate: (id: string) => MessageTemplate | undefined;
  getTemplatesByCategory: (category: string) => MessageTemplate[];
}

/**
 * メッセージテンプレートストア
 * よく使うメッセージの保存・再利用を管理
 */
export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      templates: [
        // デフォルトテンプレート
        {
          id: 'default-1',
          name: '挨拶',
          content: 'お疲れ様です！',
          category: '挨拶',
          createdAt: new Date(),
        },
        {
          id: 'default-2',
          name: '了解',
          content: '了解しました👍',
          category: '返信',
          createdAt: new Date(),
        },
        {
          id: 'default-3',
          name: 'ありがとう',
          content: 'ありがとうございます！',
          category: '返信',
          createdAt: new Date(),
        },
      ],

      addTemplate: (name, content, category) => {
        const newTemplate: MessageTemplate = {
          id: crypto.randomUUID(),
          name,
          content,
          category,
          createdAt: new Date(),
        };

        set((state) => ({
          templates: [...state.templates, newTemplate],
        }));
      },

      updateTemplate: (id, updates) => {
        set((state) => ({
          templates: state.templates.map((template) =>
            template.id === id ? { ...template, ...updates } : template
          ),
        }));
      },

      deleteTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter((template) => template.id !== id),
        }));
      },

      getTemplate: (id) => {
        return get().templates.find((template) => template.id === id);
      },

      getTemplatesByCategory: (category) => {
        return get().templates.filter(
          (template) => template.category === category
        );
      },
    }),
    {
      name: 'template-storage',
    }
  )
);
