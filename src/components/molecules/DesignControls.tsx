import React from 'react';
import type { DesignOptions } from '../../types';

interface DesignControlsProps {
  options: DesignOptions;
  onToggleAvatar: (show: boolean) => void;
  onToggleTimestamp: (show: boolean) => void;
  onToggleSenderName: (show: boolean) => void;
  onToggleStatus: (show: boolean) => void;
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );
};

export const DesignControls: React.FC<DesignControlsProps> = ({
  options,
  onToggleAvatar,
  onToggleTimestamp,
  onToggleSenderName,
  onToggleStatus,
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        表示オプション
      </label>
      <div className="space-y-2">
        <Checkbox
          label="アバター表示"
          checked={options.showAvatar}
          onChange={onToggleAvatar}
        />
        <Checkbox
          label="タイムスタンプ表示"
          checked={options.showTimestamp}
          onChange={onToggleTimestamp}
        />
        <Checkbox
          label="送信者名表示"
          checked={options.showSenderName}
          onChange={onToggleSenderName}
        />
        <Checkbox
          label="既読ステータス表示"
          checked={options.showStatus}
          onChange={onToggleStatus}
        />
      </div>
    </div>
  );
};
