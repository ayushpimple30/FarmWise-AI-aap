import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Leaf, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import SeverityBadge from '@/components/ui/SeverityBadge';
import { format } from 'date-fns';

const RecentScans: React.FC = () => {
  const { t, language } = useLanguage();
  const { scanHistory } = useApp();

  const recentScans = scanHistory.slice(0, 3);

  if (recentScans.length === 0) {
    return (
      <section className="px-4 py-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t('recentScans')}
        </h3>
        <div className="card-farmer p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <Leaf className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">{t('noRecentScans')}</p>
          <Link 
            to="/scan" 
            className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            {t('scanYourCrop')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {t('recentScans')}
        </h3>
        <Link 
          to="/history" 
          className="flex items-center gap-1 text-sm text-primary font-medium"
        >
          {t('viewAll')}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {recentScans.map((scan, index) => (
          <Link
            key={scan.id}
            to={`/result/${scan.id}`}
            className="card-farmer p-4 flex items-center gap-4 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              scan.diseaseName === 'Healthy' 
                ? 'bg-success-light' 
                : 'bg-warning-light'
            }`}>
              {scan.diseaseName === 'Healthy' ? (
                <CheckCircle className="w-6 h-6 text-success" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-warning" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground truncate">
                  {scan.cropName}
                </h4>
                <SeverityBadge severity={scan.severity} size="sm" />
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {language === 'hi' ? scan.diseaseNameHi || scan.diseaseName :
                 language === 'mr' ? scan.diseaseNameMr || scan.diseaseName :
                 scan.diseaseName}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {format(new Date(scan.date), 'dd MMM yyyy, HH:mm')}
              </p>
            </div>

            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentScans;
