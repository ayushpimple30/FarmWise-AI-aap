import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface SeverityBadgeProps {
  severity: 'low' | 'medium' | 'high';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ 
  severity, 
  showLabel = true,
  size = 'md' 
}) => {
  const { t } = useLanguage();

  const badgeClasses = {
    low: 'badge-severity-low',
    medium: 'badge-severity-medium',
    high: 'badge-severity-high'
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  const labels = {
    low: t('low'),
    medium: t('medium'),
    high: t('high')
  };

  return (
    <span className={cn(badgeClasses[severity], sizeClasses[size])}>
      {showLabel ? labels[severity] : null}
    </span>
  );
};

export default SeverityBadge;
