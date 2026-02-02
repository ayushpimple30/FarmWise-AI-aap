import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Loader2, RefreshCw, X, Image as ImageIcon } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Simulated disease database for demo
const diseaseDatabase = [
  {
    cropName: 'Tomato',
    diseaseName: 'Late Blight',
    diseaseNameHi: 'लेट ब्लाइट',
    diseaseNameMr: 'लेट ब्लाइट',
    severity: 'high' as const,
    explanation: 'Late blight is caused by the fungus-like organism Phytophthora infestans. It spreads rapidly in cool, wet weather and can destroy entire crops within days.',
    explanationHi: 'लेट ब्लाइट फाइटोफ्थोरा इंफेस्टंस नामक कवक जैसे जीव के कारण होता है। यह ठंडे, गीले मौसम में तेजी से फैलता है और कुछ दिनों में पूरी फसल को नष्ट कर सकता है।',
    explanationMr: 'लेट ब्लाइट हा फायटोफ्थोरा इन्फेस्टन्स नावाच्या बुरशीसारख्या जीवामुळे होतो. थंड, ओल्या हवामानात वेगाने पसरतो आणि काही दिवसांत संपूर्ण पीक नष्ट करू शकतो.',
    immediateAction: 'Remove and destroy infected plants immediately. Apply copper-based fungicide to remaining plants. Improve air circulation.',
    immediateActionHi: 'संक्रमित पौधों को तुरंत हटाएं और नष्ट करें। बचे हुए पौधों पर तांबा आधारित फफूंदनाशक लगाएं। वायु संचार में सुधार करें।',
    immediateActionMr: 'संक्रमित झाडे ताबडतोब काढा आणि नष्ट करा. उर्वरित झाडांवर तांबे-आधारित बुरशीनाशक लावा. हवा खेळती करा.',
    preventiveCare: 'Use disease-resistant varieties. Avoid overhead watering. Ensure proper spacing. Rotate crops yearly.',
    preventiveCareHi: 'रोग प्रतिरोधी किस्मों का उपयोग करें। ऊपर से पानी देने से बचें। उचित दूरी सुनिश्चित करें। हर साल फसल चक्र करें।',
    preventiveCareMr: 'रोग प्रतिरोधक वाण वापरा. वरून पाणी देणे टाळा. योग्य अंतर ठेवा. दरवर्षी पीक फिरवा.',
    medicines: ['Copper hydroxide', 'Mancozeb', 'Chlorothalonil']
  },
  {
    cropName: 'Rice',
    diseaseName: 'Bacterial Leaf Blight',
    diseaseNameHi: 'बैक्टीरियल लीफ ब्लाइट',
    diseaseNameMr: 'बॅक्टेरियल लीफ ब्लाइट',
    severity: 'medium' as const,
    explanation: 'Bacterial leaf blight is caused by Xanthomonas oryzae. It appears as water-soaked lesions that turn yellow and then white.',
    explanationHi: 'बैक्टीरियल लीफ ब्लाइट ज़ैंथोमोनास ओराइज़ी के कारण होता है। यह पानी से भरे घावों के रूप में दिखाई देता है जो पीले और फिर सफेद हो जाते हैं।',
    explanationMr: 'बॅक्टेरियल लीफ ब्लाइट हा झॅन्थोमोनास ओरायझी मुळे होतो. पाण्याने भरलेले जखम दिसतात जे पिवळे आणि नंतर पांढरे होतात.',
    immediateAction: 'Drain excess water from fields. Apply copper-based bactericide. Remove severely affected plants.',
    immediateActionHi: 'खेतों से अतिरिक्त पानी निकालें। तांबा आधारित जीवाणुनाशक लगाएं। गंभीर रूप से प्रभावित पौधों को हटा दें।',
    immediateActionMr: 'शेतातून जादा पाणी काढा. तांबे-आधारित जीवाणूनाशक लावा. गंभीररित्या प्रभावित झाडे काढा.',
    preventiveCare: 'Use certified disease-free seeds. Maintain balanced fertilization. Avoid field flooding.',
    preventiveCareHi: 'प्रमाणित रोग मुक्त बीजों का उपयोग करें। संतुलित उर्वरक बनाए रखें। खेत में पानी भरने से बचें।',
    preventiveCareMr: 'प्रमाणित रोगमुक्त बियाणे वापरा. संतुलित खत वापर ठेवा. शेत पाण्याने भरणे टाळा.',
    medicines: ['Copper oxychloride', 'Streptomycin sulfate', 'Kasugamycin']
  },
  {
    cropName: 'Cotton',
    diseaseName: 'Powdery Mildew',
    diseaseNameHi: 'पाउडरी मिल्ड्यू',
    diseaseNameMr: 'पावडरी मिल्ड्यू',
    severity: 'low' as const,
    explanation: 'Powdery mildew appears as white powdery spots on leaves and stems. It reduces photosynthesis and plant vigor.',
    explanationHi: 'पाउडरी मिल्ड्यू पत्तियों और तनों पर सफेद पाउडर जैसे धब्बों के रूप में दिखाई देता है। यह प्रकाश संश्लेषण और पौधे की ताकत को कम करता है।',
    explanationMr: 'पावडरी मिल्ड्यू पानांवर आणि देठांवर पांढरे पावडरसारखे डाग म्हणून दिसतात. यामुळे प्रकाशसंश्लेषण आणि वनस्पतीची ताकद कमी होते.',
    immediateAction: 'Apply sulfur-based fungicide. Remove heavily infected leaves. Improve air circulation around plants.',
    immediateActionHi: 'सल्फर आधारित फफूंदनाशक लगाएं। भारी संक्रमित पत्तियों को हटा दें। पौधों के चारों ओर वायु संचार में सुधार करें।',
    immediateActionMr: 'सल्फर-आधारित बुरशीनाशक लावा. जास्त संक्रमित पाने काढा. झाडांभोवती हवा खेळती करा.',
    preventiveCare: 'Plant resistant varieties. Avoid excessive nitrogen fertilizer. Ensure proper plant spacing.',
    preventiveCareHi: 'प्रतिरोधी किस्में लगाएं। अत्यधिक नाइट्रोजन उर्वरक से बचें। उचित पौधा अंतर सुनिश्चित करें।',
    preventiveCareMr: 'प्रतिरोधक वाण लावा. जास्त नायट्रोजन खत टाळा. योग्य रोप अंतर ठेवा.',
    medicines: ['Sulfur dust', 'Triadimefon', 'Myclobutanil']
  }
];

const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addScanResult } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      // Fallback to file input
      fileInputRef.current?.click();
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL('image/jpeg');
      setSelectedImage(imageData);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in production, this would call actual ML model)
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Randomly select a disease for demo
    const randomDisease = diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)];
    const confidence = 65 + Math.random() * 30; // 65-95%
    
    if (confidence < 60) {
      // Low confidence - show error
      setIsAnalyzing(false);
      alert(t('imageTooBlurry'));
      return;
    }
    
    // Add to scan history
    addScanResult({
      ...randomDisease,
      confidence: Math.round(confidence),
      imageUrl: selectedImage
    });
    
    setIsAnalyzing(false);
    
    // Navigate to result page
    navigate('/history');
  };

  const resetScan = () => {
    setSelectedImage(null);
    stopCamera();
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          {/* Camera/Image Preview Area */}
          <div className="relative rounded-3xl overflow-hidden bg-muted aspect-[4/3] mb-6">
            {cameraActive ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Camera controls */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  <button
                    onClick={stopCamera}
                    className="w-12 h-12 rounded-full bg-destructive/90 text-white flex items-center justify-center"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <button
                    onClick={capturePhoto}
                    className="w-16 h-16 rounded-full bg-white border-4 border-primary flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary" />
                  </button>
                </div>
              </>
            ) : selectedImage ? (
              <>
                <img
                  src={selectedImage}
                  alt="Selected crop"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={resetScan}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mb-4">
                  <ImageIcon className="w-10 h-10 text-primary" />
                </div>
                <p className="text-lg font-medium text-foreground mb-2">
                  {t('scanYourCrop')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('scanDescription')}
                </p>
              </div>
            )}
            
            {/* Analyzing overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="text-lg font-medium">{t('analyzing')}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!selectedImage && !cameraActive && (
              <>
                <Button
                  onClick={startCamera}
                  className="w-full h-14 text-lg font-medium rounded-xl btn-hero border-0"
                >
                  <Camera className="w-6 h-6 mr-3" />
                  {t('takePhoto')}
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full h-14 text-lg font-medium rounded-xl"
                >
                  <Upload className="w-6 h-6 mr-3" />
                  {t('uploadPhoto')}
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </>
            )}

            {selectedImage && !isAnalyzing && (
              <>
                <Button
                  onClick={analyzeImage}
                  className="w-full h-14 text-lg font-medium rounded-xl btn-hero border-0"
                >
                  <Loader2 className="w-6 h-6 mr-3" />
                  {t('analyzing').replace('...', '')}
                </Button>
                
                <Button
                  onClick={resetScan}
                  variant="outline"
                  className="w-full h-14 text-lg font-medium rounded-xl"
                >
                  <RefreshCw className="w-6 h-6 mr-3" />
                  {t('scanAgain')}
                </Button>
              </>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-xs text-muted-foreground">
              🔒 {t('localProcessing')} • {t('noFaceDetection')} • {t('noIdentityStorage')}
            </p>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default ScanPage;
