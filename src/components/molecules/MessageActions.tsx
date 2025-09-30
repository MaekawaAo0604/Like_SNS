import React from 'react';
import { Button } from '../atoms/Button';

interface MessageActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex gap-2 mt-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
        className="text-blue-500 hover:bg-blue-50"
      >
        ✏️ 編集
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        className="text-red-500 hover:bg-red-50"
      >
        🗑️ 削除
      </Button>
    </div>
  );
};
