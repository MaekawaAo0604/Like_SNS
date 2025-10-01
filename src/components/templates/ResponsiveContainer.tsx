import React from 'react';
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

  const containerClasses = `
    w-full min-h-screen
    ${isMobile ? 'px-2 py-4' : ''}
    ${isTablet ? 'px-6 py-6' : ''}
    ${isDesktop ? 'px-8 py-8 max-w-7xl mx-auto' : ''}
    ${className}
  `;

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

ResponsiveContainer.displayName = 'ResponsiveContainer';
