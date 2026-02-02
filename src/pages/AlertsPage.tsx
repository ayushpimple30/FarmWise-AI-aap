import React from 'react';
import { AlertTriangle, MapPin, Calendar, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import SeverityBadge from '@/components/ui/SeverityBadge';
import ListenButton from '@/components/ui/ListenButton';
import { format } from 'date-fns';

const AlertsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { communityAlerts } = useApp();

  const getLocalizedDisease = (alert: typeof communityAlerts[0]) => {
    if (language === 'hi' && alert.diseaseHi) return alert.diseaseHi;
    if (language === 'mr' && alert.diseaseMr) return alert.diseaseMr;
    return alert.disease;
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-6 h-6 text-warning" />
          <h2 className="text-xl font-bold text-foreground">
            {t('communityAlertsTitle')}
          </h2>
        </div>

        {/* Info Banner */}
        <div className="bg-info-light rounded-2xl p-4 mb-6">
          <p className="text-sm text-info font-medium">
            ℹ️ Alerts are based on anonymous aggregated scan data from nearby areas. 
            No personal data is shared.
          </p>
        </div>

        {communityAlerts.length === 0 ? (
          <div className="card-farmer p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-success-light mx-auto mb-4 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-success" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              {t('noAlerts')}
            </p>
            <p className="text-muted-foreground">
              Your area is currently clear of disease outbreaks
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {communityAlerts.map((alert, index) => (
              <div
                key={alert.id}
                className={`card-farmer p-5 border-l-4 animate-slide-up ${
                  alert.severity === 'high' 
                    ? 'border-destructive' 
                    : alert.severity === 'medium'
                    ? 'border-warning'
                    : 'border-success'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      alert.severity === 'high'
                        ? 'bg-destructive-light'
                        : alert.severity === 'medium'
                        ? 'bg-warning-light'
                        : 'bg-success-light'
                    }`}>
                      <AlertTriangle className={`w-6 h-6 ${
                        alert.severity === 'high'
                          ? 'text-destructive'
                          : alert.severity === 'medium'
                          ? 'text-warning'
                          : 'text-success'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {getLocalizedDisease(alert)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t('crop')}: {alert.crop}
                      </p>
                    </div>
                  </div>
                  <SeverityBadge severity={alert.severity} />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <ListenButton 
                    text={`${getLocalizedDisease(alert)}. ${alert.casesCount} ${t('casesReported')}. ${t('severity')}: ${t(alert.severity)}`} 
                    size="sm" 
                  />
                </div>

                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium text-foreground">{alert.casesCount}</span>
                      <span>{t('casesReported')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{alert.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{format(new Date(alert.date), 'dd MMM yyyy')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Privacy Notice */}
        <div className="mt-8 p-4 rounded-xl bg-muted/50 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 {t('noIdentityStorage')} • Approximate location only • Anonymous data
          </p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default AlertsPage;
