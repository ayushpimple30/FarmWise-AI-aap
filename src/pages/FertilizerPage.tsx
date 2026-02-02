import React, { useState } from 'react';
import { ArrowLeft, Calculator, Leaf, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { TranslationStrings } from '@/lib/i18n';

interface FertilizerRecommendation {
  fertilizer: string;
  dosage: string;
  frequency: string;
  notes: string;
}

// Rule-based fertilizer calculations (works offline)
const fertilizerRules: Record<string, Record<string, FertilizerRecommendation>> = {
  rice: {
    seedling: {
      fertilizer: 'DAP (Di-ammonium Phosphate)',
      dosage: '50 kg per acre',
      frequency: 'Once at transplanting',
      notes: 'Apply as basal dose before transplanting'
    },
    vegetative: {
      fertilizer: 'Urea',
      dosage: '30 kg per acre',
      frequency: 'Split in 2 applications',
      notes: 'First at 20 days, second at 40 days after transplanting'
    },
    flowering: {
      fertilizer: 'MOP (Muriate of Potash)',
      dosage: '25 kg per acre',
      frequency: 'Single application',
      notes: 'Apply at panicle initiation stage'
    },
    fruiting: {
      fertilizer: 'Foliar spray (0.5% Urea)',
      dosage: '2 kg in 400L water per acre',
      frequency: 'Once during grain filling',
      notes: 'Apply in evening hours'
    },
    harvesting: {
      fertilizer: 'No fertilizer needed',
      dosage: 'N/A',
      frequency: 'N/A',
      notes: 'Stop fertilization 2 weeks before harvest'
    }
  },
  wheat: {
    seedling: {
      fertilizer: 'NPK (12:32:16)',
      dosage: '60 kg per acre',
      frequency: 'Once at sowing',
      notes: 'Apply as basal dose with seeds'
    },
    vegetative: {
      fertilizer: 'Urea',
      dosage: '40 kg per acre',
      frequency: 'Split in 2 doses',
      notes: 'At 21 days and 45 days after sowing'
    },
    flowering: {
      fertilizer: 'MOP',
      dosage: '20 kg per acre',
      frequency: 'Single application',
      notes: 'Apply before flowering starts'
    },
    fruiting: {
      fertilizer: 'Foliar Zinc Sulfate',
      dosage: '2 kg in 400L water per acre',
      frequency: 'Once',
      notes: 'Helps in grain development'
    },
    harvesting: {
      fertilizer: 'No fertilizer needed',
      dosage: 'N/A',
      frequency: 'N/A',
      notes: 'Allow natural maturation'
    }
  },
  tomato: {
    seedling: {
      fertilizer: 'Vermicompost + DAP',
      dosage: '1 ton vermicompost + 25 kg DAP per acre',
      frequency: 'Once before transplanting',
      notes: 'Mix well with soil in planting beds'
    },
    vegetative: {
      fertilizer: 'Urea + MOP',
      dosage: '20 kg Urea + 15 kg MOP per acre',
      frequency: 'Every 15 days',
      notes: 'Apply with irrigation water'
    },
    flowering: {
      fertilizer: 'Calcium Ammonium Nitrate',
      dosage: '25 kg per acre',
      frequency: 'Every 10 days',
      notes: 'Prevents blossom end rot'
    },
    fruiting: {
      fertilizer: 'Potassium Sulphate',
      dosage: '20 kg per acre',
      frequency: 'Every 15 days',
      notes: 'Improves fruit quality and color'
    },
    harvesting: {
      fertilizer: 'Light Potassium spray',
      dosage: '1% Potassium Nitrate spray',
      frequency: 'Once',
      notes: 'Enhances fruit ripening'
    }
  },
  cotton: {
    seedling: {
      fertilizer: 'SSP + Zinc Sulfate',
      dosage: '100 kg SSP + 10 kg Zinc Sulfate per acre',
      frequency: 'Once at sowing',
      notes: 'Mix thoroughly with soil'
    },
    vegetative: {
      fertilizer: 'Urea',
      dosage: '50 kg per acre',
      frequency: 'Split in 2-3 doses',
      notes: 'Apply at 30, 60, and 90 days'
    },
    flowering: {
      fertilizer: 'MOP + Boron',
      dosage: '30 kg MOP + 2 kg Borax per acre',
      frequency: 'Single application',
      notes: 'Improves flowering and boll setting'
    },
    fruiting: {
      fertilizer: 'DAP foliar spray',
      dosage: '2% solution',
      frequency: 'Twice during boll development',
      notes: 'Apply in evening hours'
    },
    harvesting: {
      fertilizer: 'No fertilizer needed',
      dosage: 'N/A',
      frequency: 'N/A',
      notes: 'Stop fertilization 3 weeks before harvest'
    }
  }
};

const FertilizerPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const [cropType, setCropType] = useState<string>('');
  const [landSize, setLandSize] = useState<string>('');
  const [landUnit, setLandUnit] = useState<'acre' | 'hectare'>('acre');
  const [growthStage, setGrowthStage] = useState<string>('');
  const [recommendation, setRecommendation] = useState<FertilizerRecommendation | null>(null);

  const crops: { value: string; labelKey: keyof TranslationStrings }[] = [
    { value: 'rice', labelKey: 'rice' },
    { value: 'wheat', labelKey: 'wheat' },
    { value: 'tomato', labelKey: 'tomato' },
    { value: 'cotton', labelKey: 'cotton' },
  ];

  const stages: { value: string; labelKey: keyof TranslationStrings }[] = [
    { value: 'seedling', labelKey: 'seedling' },
    { value: 'vegetative', labelKey: 'vegetative' },
    { value: 'flowering', labelKey: 'flowering' },
    { value: 'fruiting', labelKey: 'fruiting' },
    { value: 'harvesting', labelKey: 'harvesting' },
  ];

  const calculateRecommendation = () => {
    if (!cropType || !landSize || !growthStage) return;
    
    const baseRec = fertilizerRules[cropType]?.[growthStage];
    if (!baseRec) return;

    const sizeMultiplier = landUnit === 'hectare' ? parseFloat(landSize) * 2.47 : parseFloat(landSize);
    
    // Adjust dosage based on land size
    const adjustedDosage = baseRec.dosage.replace(/(\d+)/g, (match) => {
      const num = parseFloat(match) * sizeMultiplier;
      return num.toFixed(1);
    });

    setRecommendation({
      ...baseRec,
      dosage: adjustedDosage
    });
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
              {t('fertilizerCalcTitle')}
            </h1>
            <p className="text-xs text-muted-foreground">
              Works offline • Rule-based calculation
            </p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Input Form */}
        <div className="card-farmer p-5 space-y-5">
          {/* Crop Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('cropType')}
            </label>
            <Select value={cropType} onValueChange={setCropType}>
              <SelectTrigger className="h-14 text-lg rounded-xl">
                <SelectValue placeholder={`${t('selectLanguage')}...`} />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop.value} value={crop.value} className="text-lg py-3">
                    {t(crop.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Land Size */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('landSize')}
            </label>
            <div className="flex gap-3">
              <Input
                type="number"
                value={landSize}
                onChange={(e) => setLandSize(e.target.value)}
                placeholder="0"
                className="flex-1 h-14 text-lg rounded-xl"
              />
              <Select value={landUnit} onValueChange={(v) => setLandUnit(v as 'acre' | 'hectare')}>
                <SelectTrigger className="w-32 h-14 text-lg rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acre" className="text-lg py-3">{t('acre')}</SelectItem>
                  <SelectItem value="hectare" className="text-lg py-3">{t('hectare')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Growth Stage */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('growthStage')}
            </label>
            <Select value={growthStage} onValueChange={setGrowthStage}>
              <SelectTrigger className="h-14 text-lg rounded-xl">
                <SelectValue placeholder={`${t('selectLanguage')}...`} />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage.value} value={stage.value} className="text-lg py-3">
                    {t(stage.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={calculateRecommendation}
            disabled={!cropType || !landSize || !growthStage}
            className="w-full h-14 text-lg font-medium rounded-xl btn-hero border-0"
          >
            <Calculator className="w-6 h-6 mr-3" />
            {t('calculate')}
          </Button>
        </div>

        {/* Recommendation Result */}
        {recommendation && (
          <div className="card-farmer p-5 border-l-4 border-success animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-success" />
              <h3 className="font-semibold text-lg text-foreground">
                {t('recommendation')}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-success-light">
                <p className="text-sm text-muted-foreground mb-1">Fertilizer</p>
                <p className="text-lg font-semibold text-foreground">{recommendation.fertilizer}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">{t('dosage')}</p>
                  <p className="font-semibold text-foreground">{recommendation.dosage}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">{t('frequency')}</p>
                  <p className="font-semibold text-foreground">{recommendation.frequency}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-xl bg-info-light">
                <Info className="w-4 h-4 text-info flex-shrink-0 mt-0.5" />
                <p className="text-sm text-info">{recommendation.notes}</p>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-muted/50 text-center">
          <p className="text-xs text-muted-foreground">
            * These are general recommendations. Actual requirements may vary based on soil type, 
            climate, and local conditions. Consult a local agricultural expert for precise guidance.
          </p>
        </div>
      </main>
    </div>
  );
};

export default FertilizerPage;
