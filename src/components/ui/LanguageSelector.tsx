import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, languageNames } = useLanguage();

  const languages: Language[] = ['en', 'hi', 'mr'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center touch-target hover:bg-primary-light transition-colors">
          <Globe className="w-5 h-5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={cn(
              "flex items-center justify-between cursor-pointer text-base py-3",
              language === lang && "bg-primary-light"
            )}
          >
            <span className={cn(
              language === lang ? "font-semibold text-primary" : "text-foreground"
            )}>
              {languageNames[lang]}
            </span>
            {language === lang && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
