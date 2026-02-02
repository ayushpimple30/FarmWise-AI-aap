import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle, 
  Pill, 
  Shield, 
  Zap,
  Info
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import SeverityBadge from '@/components/ui/SeverityBadge';
import ListenButton from '@/components/ui/ListenButton';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { scanHistory } = useApp();

  const scan = scanHistory.find(s => s.id === id);

  if (!scan) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-lg text-muted-foreground">Scan not found</p>
          <Button onClick={() => navigate('/history')} className="mt-4">
            Go to History
          </Button>
        </div>
      </div>
    );
  }

  const getLocalizedText = (en: string, hi?: string, mr?: string) => {
    if (language === 'hi' && hi) return hi;
    if (language === 'mr' && mr) return mr;
    return en;
  };

  const diseaseName = getLocalizedText(scan.diseaseName, scan.diseaseNameHi, scan.diseaseNameMr);
  const explanation = getLocalizedText(scan.explanation, scan.explanationHi, scan.explanationMr);
  const immediateAction = getLocalizedText(scan.immediateAction, scan.immediateActionHi, scan.immediateActionMr);
  const preventiveCare = getLocalizedText(scan.preventiveCare, scan.preventiveCareHi, scan.preventiveCareMr);

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
          <div>
            <h1 className="text-lg font-bold text-foreground">
              {t('diseaseDetected')}
            </h1>
            <p className="text-xs text-muted-foreground">
              {format(new Date(scan.date), 'dd MMM yyyy, HH:mm')}
            </p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Image Preview */}
        {scan.imageUrl && (
          <div className="rounded-2xl overflow-hidden">
            <img
              src={scan.imageUrl}
              alt={scan.cropName}
              className="w-full aspect-video object-cover"
            />
          </div>
        )}

        {/* Disease Summary Card */}
        <div className="card-farmer p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('cropIdentified')}</p>
              <h2 className="text-2xl font-bold text-foreground">{scan.cropName}</h2>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              scan.diseaseName === 'Healthy' ? 'bg-success-light' : 'bg-warning-light'
            }`}>
              {scan.diseaseName === 'Healthy' ? (
                <CheckCircle className="w-8 h-8 text-success" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-warning" />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{t('disease')}</p>
              <p className="text-lg font-semibold text-foreground">{diseaseName}</p>
            </div>
            <SeverityBadge severity={scan.severity} />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="flex-1 text-center">
              <p className="text-2xl font-bold text-primary">{scan.confidence}%</p>
              <p className="text-xs text-muted-foreground">{t('confidence')}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="flex-1 text-center">
              <p className="text-lg font-semibold text-foreground capitalize">{t(scan.severity)}</p>
              <p className="text-xs text-muted-foreground">{t('severity')}</p>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="card-farmer p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-info" />
              <h3 className="font-semibold text-foreground">{t('explanation')}</h3>
            </div>
            <ListenButton text={explanation} size="sm" />
          </div>
          <p className="text-muted-foreground leading-relaxed">{explanation}</p>
        </div>

        {/* Immediate Action */}
        <div className="card-farmer p-5 border-l-4 border-warning">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground">{t('immediateAction')}</h3>
            </div>
            <ListenButton text={immediateAction} size="sm" />
          </div>
          <p className="text-muted-foreground leading-relaxed">{immediateAction}</p>
        </div>

        {/* Preventive Care */}
        <div className="card-farmer p-5 border-l-4 border-success">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-success" />
              <h3 className="font-semibold text-foreground">{t('preventiveCare')}</h3>
            </div>
            <ListenButton text={preventiveCare} size="sm" />
          </div>
          <p className="text-muted-foreground leading-relaxed">{preventiveCare}</p>
        </div>

        {/* Recommended Medicines */}
        {scan.medicines && scan.medicines.length > 0 && (
          <div className="card-farmer p-5">
            <div className="flex items-center gap-2 mb-4">
              <Pill className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">{t('recommendedMedicines')}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {scan.medicines.map((medicine, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-xl bg-primary-light text-primary font-medium text-sm"
                >
                  {medicine}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * These are general recommendations. Consult a local agricultural expert for specific dosages.
            </p>
          </div>
        )}

        {/* Expert Connect CTA */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-5 text-white">
          <h3 className="font-semibold text-lg mb-2">{t('talkToExpert')}</h3>
          <p className="text-white/80 text-sm mb-4">
            Get personalized advice from agricultural experts
          </p>
          <Button
            onClick={() => navigate('/expert')}
            className="w-full bg-white text-primary hover:bg-white/90"
          >
            {t('expertConnect')}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
