import React, { useState } from 'react';
import { useTemplateStore } from '../../stores';
import { Button } from '../atoms/Button';

interface TemplateSelectorProps {
  onSelectTemplate: (content: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onSelectTemplate,
}) => {
  const { templates, addTemplate, deleteTemplate } = useTemplateStore();
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');
  const [newTemplateCategory, setNewTemplateCategory] = useState('');

  const handleAddTemplate = () => {
    if (newTemplateName.trim() && newTemplateContent.trim()) {
      addTemplate(
        newTemplateName.trim(),
        newTemplateContent.trim(),
        newTemplateCategory.trim() || undefined
      );
      setNewTemplateName('');
      setNewTemplateContent('');
      setNewTemplateCategory('');
      setShowAddForm(false);
    }
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm('このテンプレートを削除しますか？')) {
      deleteTemplate(id);
    }
  };

  // カテゴリーでグループ化
  const groupedTemplates = templates.reduce(
    (acc, template) => {
      const category = template.category || 'その他';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(template);
      return acc;
    },
    {} as Record<string, typeof templates>
  );

  return (
    <div className="space-y-2">
      <button
        onClick={() => setShowTemplates(!showTemplates)}
        className="w-full py-2 px-4 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label={showTemplates ? 'テンプレートを閉じる' : 'テンプレートを開く'}
        aria-expanded={showTemplates}
      >
        {showTemplates ? '📋 テンプレートを閉じる' : '📋 テンプレート'}
      </button>

      {showTemplates && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4 border border-gray-200 dark:border-gray-700">
          {/* テンプレート一覧 */}
          <div className="space-y-3">
            {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  {category}
                </h4>
                <div className="space-y-1">
                  {categoryTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center gap-2"
                    >
                      <button
                        onClick={() => {
                          onSelectTemplate(template.content);
                          setShowTemplates(false);
                        }}
                        className="flex-1 text-left px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                        aria-label={`テンプレート: ${template.name}`}
                      >
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {template.name}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2 text-xs">
                          {template.content.slice(0, 20)}
                          {template.content.length > 20 && '...'}
                        </span>
                      </button>
                      {!template.id.startsWith('default-') && (
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="px-2 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          aria-label={`${template.name}を削除`}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* テンプレート追加フォーム */}
          {showAddForm ? (
            <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
              <input
                type="text"
                placeholder="テンプレート名"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="テンプレート名"
              />
              <textarea
                placeholder="テンプレート内容"
                value={newTemplateContent}
                onChange={(e) => setNewTemplateContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[60px]"
                aria-label="テンプレート内容"
              />
              <input
                type="text"
                placeholder="カテゴリー (任意)"
                value={newTemplateCategory}
                onChange={(e) => setNewTemplateCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="カテゴリー"
              />
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleAddTemplate}
                  disabled={!newTemplateName.trim() || !newTemplateContent.trim()}
                >
                  追加
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setShowAddForm(false);
                    setNewTemplateName('');
                    setNewTemplateContent('');
                    setNewTemplateCategory('');
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="新しいテンプレートを追加"
            >
              ➕ 新しいテンプレートを追加
            </button>
          )}
        </div>
      )}
    </div>
  );
};
