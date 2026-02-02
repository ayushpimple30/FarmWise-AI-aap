import React from 'react';
import { FileText, ExternalLink, CheckCircle, IndianRupee, Shield, Tractor } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import ListenButton from '@/components/ui/ListenButton';
import { Button } from '@/components/ui/button';

interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  description: string;
  descriptionHi: string;
  descriptionMr: string;
  eligibility: string[];
  eligibilityHi: string[];
  eligibilityMr: string[];
  benefits: string;
  benefitsHi: string;
  benefitsMr: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  link: string;
}

const schemes: Scheme[] = [
  {
    id: '1',
    name: 'PM-KISAN Yojana',
    nameHi: 'पीएम-किसान योजना',
    nameMr: 'पीएम-किसान योजना',
    description: 'Income support of ₹6,000 per year in three equal installments to all landholding farmer families.',
    descriptionHi: 'सभी भूमिधारी किसान परिवारों को तीन समान किश्तों में प्रति वर्ष ₹6,000 की आय सहायता।',
    descriptionMr: 'सर्व जमीनधारक शेतकरी कुटुंबांना तीन समान हप्त्यांमध्ये दरवर्षी ₹6,000 उत्पन्न सहाय्य.',
    eligibility: [
      'All landholding farmers',
      'Valid Aadhaar card',
      'Bank account linked to Aadhaar'
    ],
    eligibilityHi: [
      'सभी भूमिधारी किसान',
      'वैध आधार कार्ड',
      'आधार से जुड़ा बैंक खाता'
    ],
    eligibilityMr: [
      'सर्व जमीनधारक शेतकरी',
      'वैध आधार कार्ड',
      'आधारशी जोडलेले बँक खाते'
    ],
    benefits: '₹6,000 per year (₹2,000 every 4 months)',
    benefitsHi: '₹6,000 प्रति वर्ष (हर 4 महीने में ₹2,000)',
    benefitsMr: '₹6,000 प्रति वर्ष (दर 4 महिन्यांनी ₹2,000)',
    icon: IndianRupee,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    link: 'https://pmkisan.gov.in/'
  },
  {
    id: '2',
    name: 'PM Fasal Bima Yojana',
    nameHi: 'पीएम फसल बीमा योजना',
    nameMr: 'पीएम फसल विमा योजना',
    description: 'Crop insurance scheme providing financial support to farmers in case of crop failure due to natural calamities.',
    descriptionHi: 'प्राकृतिक आपदाओं के कारण फसल खराब होने पर किसानों को वित्तीय सहायता प्रदान करने वाली फसल बीमा योजना।',
    descriptionMr: 'नैसर्गिक आपत्तींमुळे पीक अपयशी झाल्यास शेतकऱ्यांना आर्थिक सहाय्य देणारी पीक विमा योजना.',
    eligibility: [
      'All farmers growing notified crops',
      'Seasonal agriculture operations',
      'Land records required'
    ],
    eligibilityHi: [
      'अधिसूचित फसलें उगाने वाले सभी किसान',
      'मौसमी कृषि संचालन',
      'भूमि रिकॉर्ड आवश्यक'
    ],
    eligibilityMr: [
      'अधिसूचित पिके घेणारे सर्व शेतकरी',
      'हंगामी शेती कार्य',
      'जमीन नोंदी आवश्यक'
    ],
    benefits: 'Crop loss compensation up to sum insured',
    benefitsHi: 'बीमित राशि तक फसल हानि मुआवजा',
    benefitsMr: 'विमाकृत रकमेपर्यंत पीक नुकसान भरपाई',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    link: 'https://pmfby.gov.in/'
  },
  {
    id: '3',
    name: 'PM Kisan Samman Nidhi',
    nameHi: 'पीएम किसान सम्मान निधि',
    nameMr: 'पीएम किसान सन्मान निधी',
    description: 'Agricultural subsidy scheme providing tractors, equipment, and implements at subsidized rates.',
    descriptionHi: 'ट्रैक्टर, उपकरण और औजारों को सब्सिडी दरों पर प्रदान करने वाली कृषि सब्सिडी योजना।',
    descriptionMr: 'ट्रॅक्टर, उपकरणे आणि अवजारे सबसिडी दरांवर देणारी कृषी अनुदान योजना.',
    eligibility: [
      'Small and marginal farmers',
      'Valid identity proof',
      'Agriculture land ownership'
    ],
    eligibilityHi: [
      'लघु और सीमांत किसान',
      'वैध पहचान प्रमाण',
      'कृषि भूमि स्वामित्व'
    ],
    eligibilityMr: [
      'लहान आणि अल्पभूधारक शेतकरी',
      'वैध ओळख पुरावा',
      'शेतजमीन मालकी'
    ],
    benefits: 'Up to 50% subsidy on farm equipment',
    benefitsHi: 'कृषि उपकरणों पर 50% तक सब्सिडी',
    benefitsMr: 'शेती उपकरणांवर 50% पर्यंत सबसिडी',
    icon: Tractor,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    link: 'https://agricoop.nic.in/'
  }
];

const SchemesPage: React.FC = () => {
  const { t, language } = useLanguage();

  const getLocalizedText = (en: string, hi: string, mr: string) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  const getLocalizedArray = (en: string[], hi: string[], mr: string[]) => {
    if (language === 'hi') return hi;
    if (language === 'mr') return mr;
    return en;
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-6 h-6 text-secondary" />
          <h2 className="text-xl font-bold text-foreground">
            {t('govSchemesTitle')}
          </h2>
        </div>

        <div className="space-y-4">
          {schemes.map((scheme, index) => {
            const Icon = scheme.icon;
            const name = getLocalizedText(scheme.name, scheme.nameHi, scheme.nameMr);
            const description = getLocalizedText(scheme.description, scheme.descriptionHi, scheme.descriptionMr);
            const eligibility = getLocalizedArray(scheme.eligibility, scheme.eligibilityHi, scheme.eligibilityMr);
            const benefits = getLocalizedText(scheme.benefits, scheme.benefitsHi, scheme.benefitsMr);

            return (
              <div
                key={scheme.id}
                className="card-farmer p-5 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${scheme.bgColor}`}>
                    <Icon className={`w-7 h-7 ${scheme.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {name}
                    </h3>
                    <ListenButton text={`${name}. ${description}`} size="sm" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {description}
                </p>

                {/* Eligibility */}
                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">{t('eligibility')}:</h4>
                  <ul className="space-y-2">
                    {eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="bg-success-light rounded-xl p-3 mb-4">
                  <p className="text-sm">
                    <span className="font-medium text-success">{t('benefits')}:</span>{' '}
                    <span className="text-success/80">{benefits}</span>
                  </p>
                </div>

                {/* Apply Button */}
                <Button
                  onClick={() => window.open(scheme.link, '_blank')}
                  className="w-full btn-government"
                >
                  {t('applyNow')}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default SchemesPage;
