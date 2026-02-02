import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-section animate-fade-in">
      <div className="relative z-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('welcomeBack')} 👋
        </h2>
        <p className="text-white/80 mb-6 text-base">
          {t('scanDescription')}
        </p>
        
        <Link to="/scan" className="inline-block">
          <button className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <span className="block text-lg font-semibold text-foreground">
                {t('scanYourCrop')}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                {t('takePhoto')} <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </button>
        </Link>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
    </section>
  );
};

export default HeroSection;
