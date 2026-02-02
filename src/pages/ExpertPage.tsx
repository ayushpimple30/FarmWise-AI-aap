import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ArrowLeft,
  ExternalLink,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

const ExpertPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { scanHistory } = useApp();
  
  const [selectedMethod, setSelectedMethod] = useState<'whatsapp' | 'ivr' | null>(null);

  const latestScan = scanHistory[0];

  const generateWhatsAppMessage = () => {
    if (!latestScan) {
      return encodeURIComponent('Hello, I need help with my crop. Can you assist?');
    }
    
    const message = language === 'hi' 
      ? `नमस्ते, मुझे अपनी फसल में मदद चाहिए।\n\nफसल: ${latestScan.cropName}\nरोग: ${latestScan.diseaseNameHi || latestScan.diseaseName}\nगंभीरता: ${t(latestScan.severity)}\nविश्वास: ${latestScan.confidence}%\n\nकृपया मार्गदर्शन करें।`
      : language === 'mr'
      ? `नमस्कार, मला माझ्या पिकाबद्दल मदत हवी आहे।\n\nपीक: ${latestScan.cropName}\nरोग: ${latestScan.diseaseNameMr || latestScan.diseaseName}\nतीव्रता: ${t(latestScan.severity)}\nविश्वास: ${latestScan.confidence}%\n\nकृपया मार्गदर्शन करा।`
      : `Hello, I need help with my crop.\n\nCrop: ${latestScan.cropName}\nDisease: ${latestScan.diseaseName}\nSeverity: ${t(latestScan.severity)}\nConfidence: ${latestScan.confidence}%\n\nPlease guide me.`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsApp = () => {
    const message = generateWhatsAppMessage();
    // In production, use actual expert phone number
    const phoneNumber = '919876543210';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleIVR = () => {
    // In production, use actual IVR number
    const ivrNumber = 'tel:+911800180018';
    window.location.href = ivrNumber;
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
          <div>
            <h1 className="text-lg font-bold text-foreground">
              {t('talkToExpert')}
            </h1>
            <p className="text-xs text-muted-foreground">
              {t('expertAvailability')}
            </p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Current Scan Info */}
        {latestScan && (
          <div className="card-farmer p-4 border-l-4 border-primary">
            <p className="text-sm text-muted-foreground mb-1">
              Your recent scan will be shared:
            </p>
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold text-foreground">{latestScan.cropName}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' ? latestScan.diseaseNameHi || latestScan.diseaseName :
                   language === 'mr' ? latestScan.diseaseNameMr || latestScan.diseaseName :
                   latestScan.diseaseName}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Methods */}
        <div className="space-y-4">
          {/* WhatsApp */}
          <button
            onClick={() => setSelectedMethod('whatsapp')}
            className={`w-full card-farmer p-5 text-left transition-all ${
              selectedMethod === 'whatsapp' ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-7 h-7 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  {t('whatsappChat')}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Chat with an agricultural expert on WhatsApp. Your scan details will be automatically shared.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                    <CheckCircle className="w-3 h-3" /> Auto-fill message
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" /> Quick response
                  </span>
                </div>
              </div>
              {selectedMethod === 'whatsapp' && (
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
              )}
            </div>
          </button>

          {/* IVR Call */}
          <button
            onClick={() => setSelectedMethod('ivr')}
            className={`w-full card-farmer p-5 text-left transition-all ${
              selectedMethod === 'ivr' ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-7 h-7 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  {t('ivrCall')}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Call our helpline and speak to an expert in your language. Best for farmers who prefer voice communication.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                    <CheckCircle className="w-3 h-3" /> Multi-language
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" /> 24/7 Available
                  </span>
                </div>
              </div>
              {selectedMethod === 'ivr' && (
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
              )}
            </div>
          </button>
        </div>

        {/* Action Button */}
        {selectedMethod && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
            <Button
              onClick={selectedMethod === 'whatsapp' ? handleWhatsApp : handleIVR}
              className="w-full h-14 text-lg font-medium rounded-xl btn-hero border-0"
            >
              {selectedMethod === 'whatsapp' ? (
                <>
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Open WhatsApp
                </>
              ) : (
                <>
                  <Phone className="w-6 h-6 mr-3" />
                  Call Now
                </>
              )}
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Availability Notice */}
        <div className="p-4 rounded-xl bg-muted/50 text-center">
          <p className="text-sm text-muted-foreground">
            ⏰ {t('expertAvailability')}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            IVR: 24/7 • WhatsApp: 8AM - 8PM IST
          </p>
        </div>
      </main>
    </div>
  );
};

export default ExpertPage;
