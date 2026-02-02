import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scan, 
  Calculator, 
  CloudSun, 
  TrendingUp, 
  Phone, 
  Bell, 
  FileText,
  Leaf
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationStrings } from '@/lib/i18n';

interface Feature {
  icon: React.ElementType;
  labelKey: keyof TranslationStrings;
  path: string;
  color: string;
  bgColor: string;
}

const FeatureGrid: React.FC = () => {
  const { t } = useLanguage();

  const features: Feature[] = [
    { 
      icon: Scan, 
      labelKey: 'diseaseDetection', 
      path: '/scan',
      color: 'text-primary',
      bgColor: 'bg-primary-light'
    },
    { 
      icon: Calculator, 
      labelKey: 'fertilizerCalculator', 
      path: '/fertilizer',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    { 
      icon: CloudSun, 
      labelKey: 'weatherUpdates', 
      path: '/weather',
      color: 'text-sky-600',
      bgColor: 'bg-sky-50'
    },
    { 
      icon: TrendingUp, 
      labelKey: 'marketPrices', 
      path: '/market',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    { 
      icon: Phone, 
      labelKey: 'expertConnect', 
      path: '/expert',
      color: 'text-violet-600',
      bgColor: 'bg-violet-50'
    },
    { 
      icon: Bell, 
      labelKey: 'communityAlerts', 
      path: '/alerts',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    { 
      icon: FileText, 
      labelKey: 'govSchemes', 
      path: '/schemes',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
  ];

  return (
    <section className="px-4 py-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {t('quickActions')}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.path}
              to={feature.path}
              className="feature-card animate-slide-up"
              style={{ animationDelay: `${features.indexOf(feature) * 50}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-2`}>
                <Icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <span className="text-xs font-medium text-foreground text-center leading-tight">
                {t(feature.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureGrid;
