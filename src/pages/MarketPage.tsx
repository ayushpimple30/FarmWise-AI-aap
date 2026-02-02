import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, RefreshCw, IndianRupee, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface MarketPrice {
  id: string;
  crop: string;
  cropHi: string;
  cropMr: string;
  price: number;
  previousPrice: number;
  trend: 'rising' | 'stable' | 'falling';
  mandi: string;
  advice: string;
  adviceHi: string;
  adviceMr: string;
}

const marketPrices: MarketPrice[] = [
  {
    id: '1',
    crop: 'Wheat',
    cropHi: 'गेहूं',
    cropMr: 'गहू',
    price: 2450,
    previousPrice: 2380,
    trend: 'rising',
    mandi: 'Indore',
    advice: 'Good time to sell. Prices are expected to rise further.',
    adviceHi: 'बेचने का अच्छा समय। कीमतें और बढ़ने की उम्मीद है।',
    adviceMr: 'विकण्याची चांगली वेळ. किंमती आणखी वाढण्याची अपेक्षा.'
  },
  {
    id: '2',
    crop: 'Rice',
    cropHi: 'धान',
    cropMr: 'भात',
    price: 2180,
    previousPrice: 2200,
    trend: 'falling',
    mandi: 'Nagpur',
    advice: 'Hold for few days. Prices may recover.',
    adviceHi: 'कुछ दिन रुकें। कीमतें ठीक हो सकती हैं।',
    adviceMr: 'काही दिवस थांबा. किंमती सुधारू शकतात.'
  },
  {
    id: '3',
    crop: 'Cotton',
    cropHi: 'कपास',
    cropMr: 'कापूस',
    price: 7250,
    previousPrice: 7250,
    trend: 'stable',
    mandi: 'Jalgaon',
    advice: 'Prices stable. Sell based on your storage capacity.',
    adviceHi: 'कीमतें स्थिर हैं। अपनी भंडारण क्षमता के आधार पर बेचें।',
    adviceMr: 'किंमती स्थिर. तुमच्या साठवण क्षमतेनुसार विका.'
  },
  {
    id: '4',
    crop: 'Soybean',
    cropHi: 'सोयाबीन',
    cropMr: 'सोयाबीन',
    price: 4650,
    previousPrice: 4500,
    trend: 'rising',
    mandi: 'Latur',
    advice: 'Good time to sell. Export demand is strong.',
    adviceHi: 'बेचने का अच्छा समय। निर्यात मांग मजबूत है।',
    adviceMr: 'विकण्याची चांगली वेळ. निर्यात मागणी मजबूत आहे.'
  },
  {
    id: '5',
    crop: 'Onion',
    cropHi: 'प्याज',
    cropMr: 'कांदा',
    price: 1850,
    previousPrice: 2100,
    trend: 'falling',
    mandi: 'Nashik',
    advice: 'Hold if possible. Supply glut causing price drop.',
    adviceHi: 'संभव हो तो रुकें। आपूर्ति बढ़ने से कीमतें गिर रही हैं।',
    adviceMr: 'शक्य असल्यास थांबा. पुरवठा वाढल्याने किंमती घसरत आहेत.'
  },
  {
    id: '6',
    crop: 'Tomato',
    cropHi: 'टमाटर',
    cropMr: 'टोमॅटो',
    price: 2800,
    previousPrice: 2400,
    trend: 'rising',
    mandi: 'Pune',
    advice: 'Excellent time to sell. Shortage in market.',
    adviceHi: 'बेचने का उत्कृष्ट समय। बाजार में कमी।',
    adviceMr: 'विकण्याची उत्तम वेळ. बाजारात तुटवडा.'
  }
];

const MarketPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);

  const getLocalizedText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="w-5 h-5 text-success" />;
      case 'falling':
        return <TrendingDown className="w-5 h-5 text-destructive" />;
      default:
        return <Minus className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'rising': return 'text-success bg-success-light';
      case 'falling': return 'text-destructive bg-destructive-light';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  const refreshPrices = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
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
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">
              {t('marketPricesTitle')}
            </h1>
            <p className="text-xs text-muted-foreground">
              Mandi prices • Updated today
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={refreshPrices}
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-4">
        {marketPrices.map((item, index) => (
          <div
            key={item.id}
            className="card-farmer p-4 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  {getLocalizedText(item.crop, item.cropHi, item.cropMr)}
                </h3>
                <p className="text-sm text-muted-foreground">{item.mandi} Mandi</p>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${getTrendColor(item.trend)}`}>
                {getTrendIcon(item.trend)}
                <span className="text-sm font-medium">{t(item.trend)}</span>
              </div>
            </div>

            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">{t('pricePerQuintal')}</p>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-6 h-6 text-primary" />
                  <span className="text-2xl font-bold text-foreground">{item.price.toLocaleString()}</span>
                </div>
              </div>
              <div className={`text-right ${
                item.trend === 'rising' ? 'text-success' :
                item.trend === 'falling' ? 'text-destructive' :
                'text-muted-foreground'
              }`}>
                <p className="text-sm">
                  {item.trend === 'rising' ? '+' : item.trend === 'falling' ? '' : ''}
                  {calculateChange(item.price, item.previousPrice)}%
                </p>
                <p className="text-xs text-muted-foreground">vs last week</p>
              </div>
            </div>

            <div className={`p-3 rounded-xl ${
              item.trend === 'rising' ? 'bg-success-light' :
              item.trend === 'falling' ? 'bg-warning-light' :
              'bg-muted'
            }`}>
              <p className="text-sm font-medium">
                {item.trend === 'rising' ? '👍 ' : item.trend === 'falling' ? '⏳ ' : '📊 '}
                {getLocalizedText(item.advice, item.adviceHi, item.adviceMr)}
              </p>
            </div>
          </div>
        ))}

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-info-light flex gap-3">
          <Info className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
          <p className="text-sm text-info">
            {t('priceDisclaimer')}
          </p>
        </div>
      </main>
    </div>
  );
};

export default MarketPage;
