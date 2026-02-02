import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ListenButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ListenButton: React.FC<ListenButtonProps> = ({ text, className, size = 'md' }) => {
  const { speak, stopSpeaking, isSpeaking, t } = useLanguage();

  const handleClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "btn-listen",
        isSpeaking && "playing",
        sizeClasses[size],
        className
      )}
    >
      {isSpeaking ? (
        <>
          <VolumeX className={iconSizes[size]} />
          <span>{t('stopListening')}</span>
        </>
      ) : (
        <>
          <Volume2 className={iconSizes[size]} />
          <span>{t('listen')}</span>
        </>
      )}
    </button>
  );
};

export default ListenButton;
