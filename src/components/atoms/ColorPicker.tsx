import React from 'react';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  id?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  id,
}) => {
  const generatedId = React.useId();
  const pickerId = id || generatedId;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={pickerId}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        <input
          id={pickerId}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
          aria-label={label || 'カラーピッカー'}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="#000000"
          pattern="^#[0-9A-Fa-f]{6}$"
          aria-label={`${label || 'カラー'}のHEXコード`}
        />
      </div>
    </div>
  );
};

ColorPicker.displayName = 'ColorPicker';