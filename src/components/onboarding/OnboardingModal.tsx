import React, { useState } from 'react';
import { Volume2, HelpCircle, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const OnboardingModal: React.FC = () => {
  const { language, setLanguage, t, languageNames, speak } = useLanguage();
  const { hasCompletedOnboarding, setHasCompletedOnboarding, setWantsGuidedHelp } = useApp();
  
  const [step, setStep] = useState<'language' | 'question'>('language');

  if (hasCompletedOnboarding) {
    return null;
  }

  const languages: Language[] = ['en', 'hi', 'mr'];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setStep('question');
  };

  const handleYes = () => {
    setWantsGuidedHelp(true);
    setHasCompletedOnboarding(true);
  };

  const handleNo = () => {
    setWantsGuidedHelp(false);
    setHasCompletedOnboarding(true);
  };

  const handleSpeak = () => {
    speak(t('onboardingQuestion'));
  };

  return (
    <Dialog open={!hasCompletedOnboarding}>
      <DialogContent className="max-w-sm mx-4 p-0 overflow-hidden rounded-3xl" hideCloseButton>
        <div className="relative">
          {/* Header with gradient */}
          <div className="hero-section m-0 rounded-none rounded-t-3xl py-8">
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {t('onboardingTitle')}
              </h2>
            </div>
          </div>

          <div className="p-6">
            {step === 'language' ? (
              <div className="space-y-4">
                <p className="text-center text-muted-foreground text-base mb-6">
                  {t('selectLanguage')}
                </p>
                <div className="grid gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageSelect(lang)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border-2 transition-all touch-target",
                        language === lang
                          ? "border-primary bg-primary-light"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <span className="text-lg font-medium text-foreground">
                        {languageNames[lang]}
                      </span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-foreground font-medium leading-relaxed">
                    {t('onboardingQuestion')}
                  </p>
                  <button
                    onClick={handleSpeak}
                    className="btn-listen mt-4 mx-auto"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{t('listen')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={handleNo}
                    className="h-14 text-lg font-medium rounded-xl"
                  >
                    {t('no')}
                  </Button>
                  <Button
                    onClick={handleYes}
                    className="h-14 text-lg font-medium rounded-xl btn-hero border-0"
                  >
                    {t('yes')}
                  </Button>
                </div>

                <button
                  onClick={() => setStep('language')}
                  className="w-full text-center text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  ← {t('back')}
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
