import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700',
  outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
  ghost: 'text-blue-500 hover:bg-blue-50',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-4 py-2 text-base min-h-[44px]',
  lg: 'px-6 py-3 text-lg min-h-[52px]',
};

export const Button: React.FC<ButtonProps> = React.memo(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    className = '',
    disabled = false,
    ...props
  }) => {
    return (
      <button
        className={`
        rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
        disabled={disabled}
        aria-disabled={disabled}
        type={props.type || 'button'}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
