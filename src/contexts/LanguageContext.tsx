import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language, TranslationStrings, translations, languageNames, getTranslation } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationStrings) => string;
  languageNames: typeof languageNames;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language code mapping for TTS
const ttsLanguageCodes: Record<Language, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN'
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('farmwise-language');
    return (stored as Language) || 'en';
  });
  
  const [isSpeaking, setIsSpeaking] = useState(false);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('farmwise-language', lang);
    // Stop any ongoing speech when language changes
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const t = useCallback((key: keyof TranslationStrings): string => {
    return getTranslation(language, key);
  }, [language]);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
      console.warn('Text-to-speech not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = ttsLanguageCodes[language];
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    // Try to find a voice for the language
    const voices = window.speechSynthesis.getVoices();
    const langVoice = voices.find(v => v.lang.startsWith(language === 'en' ? 'en' : language));
    if (langVoice) {
      utterance.voice = langVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [language]);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Load voices when they become available
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis?.getVoices();
    };
    
    loadVoices();
    window.speechSynthesis?.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      window.speechSynthesis?.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      languageNames,
      speak,
      stopSpeaking,
      isSpeaking
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
