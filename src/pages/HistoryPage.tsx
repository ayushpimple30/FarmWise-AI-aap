import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Leaf, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import SeverityBadge from '@/components/ui/SeverityBadge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const HistoryPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { scanHistory, clearScanHistory } = useApp();

  return (
    <div className="page-container">
      <Header />
      
      <main className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {t('scanHistory')}
          </h2>
          {scanHistory.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearScanHistory}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {scanHistory.length === 0 ? (
          <div className="card-farmer p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Leaf className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              {t('noHistory')}
            </p>
            <p className="text-muted-foreground mb-6">
              {t('noRecentScans')}
            </p>
            <Link 
              to="/scan" 
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              {t('scanYourCrop')}
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {scanHistory.map((scan, index) => (
              <Link
                key={scan.id}
                to={`/result/${scan.id}`}
                className="card-farmer p-4 flex items-center gap-4 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {scan.imageUrl ? (
                  <img
                    src={scan.imageUrl}
                    alt={scan.cropName}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    scan.diseaseName === 'Healthy' 
                      ? 'bg-success-light' 
                      : 'bg-warning-light'
                  }`}>
                    {scan.diseaseName === 'Healthy' ? (
                      <CheckCircle className="w-8 h-8 text-success" />
                    ) : (
                      <AlertTriangle className="w-8 h-8 text-warning" />
                    )}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground truncate">
                      {scan.cropName}
                    </h4>
                    <SeverityBadge severity={scan.severity} size="sm" />
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {language === 'hi' ? scan.diseaseNameHi || scan.diseaseName :
                     language === 'mr' ? scan.diseaseNameMr || scan.diseaseName :
                     scan.diseaseName}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{format(new Date(scan.date), 'dd MMM yyyy')}</span>
                    <span>•</span>
                    <span>{scan.confidence}% {t('confidence')}</span>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default HistoryPage;
