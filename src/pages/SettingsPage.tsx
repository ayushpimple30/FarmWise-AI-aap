import React from 'react';
import { ArrowLeft, Globe, RotateCcw, Shield, Info, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage, languageNames } = useLanguage();
  const { resetOnboarding } = useApp();

  const languages: Language[] = ['en', 'hi', 'mr'];

  const handleResetOnboarding = () => {
    resetOnboarding();
    navigate('/');
  };

  return (
    <div className="page-container pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 px-4 py-3 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-foreground">
            {t('settings')}
          </h1>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Language Selection */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">{t('selectLanguage')}</h2>
          </div>
          <div className="card-farmer p-4 space-y-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl transition-all touch-target",
                  language === lang
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                <span className="text-lg font-medium">{languageNames[lang]}</span>
                {language === lang && (
                  <span className="text-sm">✓</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Reset Onboarding */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">{t('resetOnboarding')}</h2>
          </div>
          <div className="card-farmer p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Reset the app to show the welcome screen and guided help again.
            </p>
            <Button
              onClick={handleResetOnboarding}
              variant="outline"
              className="w-full h-12 rounded-xl"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t('resetOnboarding')}
            </Button>
          </div>
        </section>

        {/* Privacy Info */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">{t('privacyPolicy')}</h2>
          </div>
          <div className="card-farmer p-5">
            <h3 className="font-semibold text-foreground mb-3">{t('privacyTitle')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('privacyDescription')}
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <span className="w-8 h-8 rounded-full bg-success-light flex items-center justify-center">
                  ✓
                </span>
                <span className="text-foreground">{t('noFaceDetection')}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="w-8 h-8 rounded-full bg-success-light flex items-center justify-center">
                  ✓
                </span>
                <span className="text-foreground">{t('noIdentityStorage')}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="w-8 h-8 rounded-full bg-success-light flex items-center justify-center">
                  ✓
                </span>
                <span className="text-foreground">{t('localProcessing')}</span>
              </li>
            </ul>
          </div>
        </section>

        {/* About */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">{t('about')}</h2>
          </div>
          <div className="card-farmer p-5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary mx-auto mb-4 flex items-center justify-center">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-xl text-foreground mb-1">
              {t('appName')}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('tagline')}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('version')} 1.0.0
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Built with ❤️ for Indian Farmers
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsPage;
