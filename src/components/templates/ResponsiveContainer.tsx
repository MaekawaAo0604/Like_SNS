import React from 'react';
import clsx from 'clsx';
import { useBreakpoint } from '../../hooks/useMediaQuery';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
}) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const containerClasses = clsx(
    'w-full min-h-screen',
    {
      'px-2 py-4': isMobile,
      'px-6 py-6': isTablet,
      'px-8 py-8 max-w-7xl mx-auto': isDesktop,
    },
    className
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

ResponsiveContainer.displayName = 'ResponsiveContainer';
