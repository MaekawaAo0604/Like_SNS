import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export const Avatar: React.FC<AvatarProps> = React.memo(
  ({ src, alt = 'Avatar', size = 'md', className = '' }) => {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-300 flex items-center justify-center ${className}`}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500 text-sm">👤</span>
        )}
      </div>
    );
  },
);
