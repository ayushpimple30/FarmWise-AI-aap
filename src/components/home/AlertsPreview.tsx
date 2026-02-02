import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ChevronRight, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import SeverityBadge from '@/components/ui/SeverityBadge';

const AlertsPreview: React.FC = () => {
  const { t, language } = useLanguage();
  const { communityAlerts } = useApp();

  const highPriorityAlerts = communityAlerts.filter(a => a.severity === 'high').slice(0, 2);

  if (highPriorityAlerts.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          {t('communityAlerts')}
        </h3>
        <Link 
          to="/alerts" 
          className="flex items-center gap-1 text-sm text-primary font-medium"
        >
          {t('viewAll')}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {highPriorityAlerts.map((alert) => (
          <div key={alert.id} className="card-alert animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">
                    {language === 'hi' ? alert.diseaseHi || alert.disease :
                     language === 'mr' ? alert.diseaseMr || alert.disease :
                     alert.disease}
                  </h4>
                  <SeverityBadge severity={alert.severity} size="sm" />
                </div>
                <p className="text-sm text-muted-foreground">
                  ⚠️ {alert.casesCount} {t('casesReported')} ({alert.crop})
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <MapPin className="w-3 h-3" />
                  <span>{alert.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlertsPreview;
