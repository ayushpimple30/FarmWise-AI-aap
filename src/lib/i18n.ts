// FarmWise AI - Internationalization System
// Supports: English, Hindi, Marathi

export type Language = 'en' | 'hi' | 'mr';

export interface TranslationStrings {
  // App
  appName: string;
  tagline: string;
  
  // Navigation
  home: string;
  history: string;
  scan: string;
  alerts: string;
  schemes: string;
  settings: string;
  
  // Onboarding
  onboardingTitle: string;
  onboardingQuestion: string;
  yes: string;
  no: string;
  skip: string;
  next: string;
  back: string;
  getStarted: string;
  
  // Home
  welcomeBack: string;
  scanYourCrop: string;
  scanDescription: string;
  quickActions: string;
  recentScans: string;
  viewAll: string;
  noRecentScans: string;
  
  // Features
  diseaseDetection: string;
  fertilizerCalculator: string;
  weatherUpdates: string;
  marketPrices: string;
  expertConnect: string;
  communityAlerts: string;
  govSchemes: string;
  
  // Scan
  takePhoto: string;
  uploadPhoto: string;
  analyzing: string;
  scanAgain: string;
  cropIdentified: string;
  diseaseDetected: string;
  healthy: string;
  
  // Results
  severity: string;
  confidence: string;
  low: string;
  medium: string;
  high: string;
  immediateAction: string;
  preventiveCare: string;
  recommendedMedicines: string;
  explanation: string;
  
  // History
  scanHistory: string;
  noHistory: string;
  date: string;
  crop: string;
  disease: string;
  
  // Alerts
  communityAlertsTitle: string;
  noAlerts: string;
  alertsNearby: string;
  casesReported: string;
  
  // Expert Connect
  talkToExpert: string;
  whatsappChat: string;
  ivrCall: string;
  expertAvailability: string;
  
  // Fertilizer
  fertilizerCalcTitle: string;
  cropType: string;
  landSize: string;
  acre: string;
  hectare: string;
  growthStage: string;
  calculate: string;
  recommendation: string;
  dosage: string;
  frequency: string;
  
  // Weather
  weatherTitle: string;
  enableWeather: string;
  temperature: string;
  humidity: string;
  rainfall: string;
  diseaseRisk: string;
  
  // Market
  marketPricesTitle: string;
  pricePerQuintal: string;
  trending: string;
  rising: string;
  stable: string;
  falling: string;
  goodTimeToSell: string;
  holdForFewDays: string;
  priceDisclaimer: string;
  
  // Schemes
  govSchemesTitle: string;
  eligibility: string;
  benefits: string;
  applyNow: string;
  
  // Settings
  language: string;
  selectLanguage: string;
  resetOnboarding: string;
  privacyPolicy: string;
  about: string;
  version: string;
  
  // Privacy
  privacyTitle: string;
  privacyDescription: string;
  noFaceDetection: string;
  noIdentityStorage: string;
  localProcessing: string;
  
  // TTS
  listen: string;
  stopListening: string;
  
  // Errors
  imageTooBlurry: string;
  tryAgain: string;
  networkError: string;
  offlineMode: string;
  
  // Growth stages
  seedling: string;
  vegetative: string;
  flowering: string;
  fruiting: string;
  harvesting: string;
  
  // Common crops
  rice: string;
  wheat: string;
  cotton: string;
  sugarcane: string;
  tomato: string;
  potato: string;
  onion: string;
  soybean: string;
  maize: string;
  groundnut: string;
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    // App
    appName: "FarmWise AI",
    tagline: "Smart Farming, Better Yields",
    
    // Navigation
    home: "Home",
    history: "History",
    scan: "Scan",
    alerts: "Alerts",
    schemes: "Schemes",
    settings: "Settings",
    
    // Onboarding
    onboardingTitle: "Welcome to FarmWise AI",
    onboardingQuestion: "Do you want guided help to use this app?",
    yes: "Yes",
    no: "No",
    skip: "Skip",
    next: "Next",
    back: "Back",
    getStarted: "Get Started",
    
    // Home
    welcomeBack: "Welcome, Farmer",
    scanYourCrop: "Scan Your Crop",
    scanDescription: "Take a photo of your crop to detect diseases instantly",
    quickActions: "Quick Actions",
    recentScans: "Recent Scans",
    viewAll: "View All",
    noRecentScans: "No recent scans. Start by scanning your crop!",
    
    // Features
    diseaseDetection: "Disease Detection",
    fertilizerCalculator: "Fertilizer Calculator",
    weatherUpdates: "Weather Updates",
    marketPrices: "Market Prices",
    expertConnect: "Expert Connect",
    communityAlerts: "Community Alerts",
    govSchemes: "Government Schemes",
    
    // Scan
    takePhoto: "Take Photo",
    uploadPhoto: "Upload Photo",
    analyzing: "Analyzing your crop...",
    scanAgain: "Scan Again",
    cropIdentified: "Crop Identified",
    diseaseDetected: "Disease Detected",
    healthy: "Healthy",
    
    // Results
    severity: "Severity",
    confidence: "Confidence",
    low: "Low",
    medium: "Medium",
    high: "High",
    immediateAction: "Immediate Action",
    preventiveCare: "Preventive Care",
    recommendedMedicines: "Recommended Medicines",
    explanation: "Explanation",
    
    // History
    scanHistory: "Scan History",
    noHistory: "No scan history yet",
    date: "Date",
    crop: "Crop",
    disease: "Disease",
    
    // Alerts
    communityAlertsTitle: "Community Alerts",
    noAlerts: "No alerts in your area",
    alertsNearby: "Alerts nearby",
    casesReported: "cases reported in nearby villages",
    
    // Expert Connect
    talkToExpert: "Talk to Agro Expert",
    whatsappChat: "WhatsApp Chat",
    ivrCall: "Voice Call (IVR)",
    expertAvailability: "Expert availability may vary",
    
    // Fertilizer
    fertilizerCalcTitle: "Fertilizer Calculator",
    cropType: "Crop Type",
    landSize: "Land Size",
    acre: "Acre",
    hectare: "Hectare",
    growthStage: "Growth Stage",
    calculate: "Calculate",
    recommendation: "Recommendation",
    dosage: "Dosage",
    frequency: "Frequency",
    
    // Weather
    weatherTitle: "Weather Updates",
    enableWeather: "Enable live weather updates?",
    temperature: "Temperature",
    humidity: "Humidity",
    rainfall: "Rainfall",
    diseaseRisk: "Disease Risk",
    
    // Market
    marketPricesTitle: "Market Prices",
    pricePerQuintal: "Price per Quintal",
    trending: "Trending",
    rising: "Rising",
    stable: "Stable",
    falling: "Falling",
    goodTimeToSell: "Good time to sell",
    holdForFewDays: "Hold for few days",
    priceDisclaimer: "Prices are indicative, not guaranteed",
    
    // Schemes
    govSchemesTitle: "Government Schemes",
    eligibility: "Eligibility",
    benefits: "Benefits",
    applyNow: "Apply Now",
    
    // Settings
    language: "Language",
    selectLanguage: "Select Language",
    resetOnboarding: "Reset Onboarding",
    privacyPolicy: "Privacy Policy",
    about: "About",
    version: "Version",
    
    // Privacy
    privacyTitle: "Your Privacy Matters",
    privacyDescription: "We take your privacy seriously",
    noFaceDetection: "No face detection",
    noIdentityStorage: "No identity storage",
    localProcessing: "Images processed locally",
    
    // TTS
    listen: "Listen",
    stopListening: "Stop",
    
    // Errors
    imageTooBlurry: "Image unclear. Please take a clearer photo.",
    tryAgain: "Try Again",
    networkError: "Network error. Working offline.",
    offlineMode: "Offline Mode",
    
    // Growth stages
    seedling: "Seedling",
    vegetative: "Vegetative",
    flowering: "Flowering",
    fruiting: "Fruiting",
    harvesting: "Harvesting",
    
    // Common crops
    rice: "Rice",
    wheat: "Wheat",
    cotton: "Cotton",
    sugarcane: "Sugarcane",
    tomato: "Tomato",
    potato: "Potato",
    onion: "Onion",
    soybean: "Soybean",
    maize: "Maize",
    groundnut: "Groundnut",
  },
  
  hi: {
    // App
    appName: "फार्मवाइज़ AI",
    tagline: "स्मार्ट खेती, बेहतर उपज",
    
    // Navigation
    home: "होम",
    history: "इतिहास",
    scan: "स्कैन",
    alerts: "अलर्ट",
    schemes: "योजनाएं",
    settings: "सेटिंग्स",
    
    // Onboarding
    onboardingTitle: "फार्मवाइज़ AI में आपका स्वागत है",
    onboardingQuestion: "क्या आप इस ऐप को उपयोग करने के लिए मार्गदर्शन चाहते हैं?",
    yes: "हां",
    no: "नहीं",
    skip: "छोड़ें",
    next: "आगे",
    back: "पीछे",
    getStarted: "शुरू करें",
    
    // Home
    welcomeBack: "स्वागत है, किसान",
    scanYourCrop: "फसल स्कैन करें",
    scanDescription: "बीमारी का पता लगाने के लिए अपनी फसल की तस्वीर लें",
    quickActions: "त्वरित कार्रवाई",
    recentScans: "हाल के स्कैन",
    viewAll: "सभी देखें",
    noRecentScans: "कोई हाल का स्कैन नहीं। अपनी फसल स्कैन करके शुरू करें!",
    
    // Features
    diseaseDetection: "रोग पहचान",
    fertilizerCalculator: "उर्वरक कैलकुलेटर",
    weatherUpdates: "मौसम अपडेट",
    marketPrices: "बाजार भाव",
    expertConnect: "विशेषज्ञ से बात",
    communityAlerts: "सामुदायिक अलर्ट",
    govSchemes: "सरकारी योजनाएं",
    
    // Scan
    takePhoto: "फोटो लें",
    uploadPhoto: "फोटो अपलोड करें",
    analyzing: "आपकी फसल का विश्लेषण हो रहा है...",
    scanAgain: "फिर से स्कैन करें",
    cropIdentified: "फसल पहचानी गई",
    diseaseDetected: "रोग पाया गया",
    healthy: "स्वस्थ",
    
    // Results
    severity: "गंभीरता",
    confidence: "विश्वास स्तर",
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",
    immediateAction: "तुरंत कार्रवाई",
    preventiveCare: "बचाव के उपाय",
    recommendedMedicines: "सुझाई गई दवाइयां",
    explanation: "विवरण",
    
    // History
    scanHistory: "स्कैन इतिहास",
    noHistory: "अभी तक कोई स्कैन इतिहास नहीं",
    date: "तारीख",
    crop: "फसल",
    disease: "रोग",
    
    // Alerts
    communityAlertsTitle: "सामुदायिक अलर्ट",
    noAlerts: "आपके क्षेत्र में कोई अलर्ट नहीं",
    alertsNearby: "आस-पास के अलर्ट",
    casesReported: "आस-पास के गांवों में मामले",
    
    // Expert Connect
    talkToExpert: "कृषि विशेषज्ञ से बात करें",
    whatsappChat: "व्हाट्सएप चैट",
    ivrCall: "वॉइस कॉल (IVR)",
    expertAvailability: "विशेषज्ञ की उपलब्धता भिन्न हो सकती है",
    
    // Fertilizer
    fertilizerCalcTitle: "उर्वरक कैलकुलेटर",
    cropType: "फसल का प्रकार",
    landSize: "भूमि का आकार",
    acre: "एकड़",
    hectare: "हेक्टेयर",
    growthStage: "विकास अवस्था",
    calculate: "गणना करें",
    recommendation: "सुझाव",
    dosage: "खुराक",
    frequency: "आवृत्ति",
    
    // Weather
    weatherTitle: "मौसम अपडेट",
    enableWeather: "लाइव मौसम अपडेट चालू करें?",
    temperature: "तापमान",
    humidity: "नमी",
    rainfall: "बारिश",
    diseaseRisk: "रोग का खतरा",
    
    // Market
    marketPricesTitle: "मंडी भाव",
    pricePerQuintal: "प्रति क्विंटल कीमत",
    trending: "ट्रेंड",
    rising: "बढ़ रहा है",
    stable: "स्थिर",
    falling: "गिर रहा है",
    goodTimeToSell: "बेचने का अच्छा समय",
    holdForFewDays: "कुछ दिन रुकें",
    priceDisclaimer: "कीमतें सांकेतिक हैं, गारंटी नहीं",
    
    // Schemes
    govSchemesTitle: "सरकारी योजनाएं",
    eligibility: "पात्रता",
    benefits: "लाभ",
    applyNow: "अभी आवेदन करें",
    
    // Settings
    language: "भाषा",
    selectLanguage: "भाषा चुनें",
    resetOnboarding: "ऑनबोर्डिंग रीसेट करें",
    privacyPolicy: "गोपनीयता नीति",
    about: "हमारे बारे में",
    version: "संस्करण",
    
    // Privacy
    privacyTitle: "आपकी गोपनीयता महत्वपूर्ण है",
    privacyDescription: "हम आपकी गोपनीयता को गंभीरता से लेते हैं",
    noFaceDetection: "कोई चेहरा पहचान नहीं",
    noIdentityStorage: "कोई पहचान संग्रहण नहीं",
    localProcessing: "छवियां स्थानीय रूप से संसाधित",
    
    // TTS
    listen: "सुनें",
    stopListening: "रुकें",
    
    // Errors
    imageTooBlurry: "छवि स्पष्ट नहीं है। कृपया स्पष्ट फोटो लें।",
    tryAgain: "पुनः प्रयास करें",
    networkError: "नेटवर्क त्रुटि। ऑफलाइन मोड में।",
    offlineMode: "ऑफलाइन मोड",
    
    // Growth stages
    seedling: "अंकुर",
    vegetative: "वानस्पतिक",
    flowering: "फूल",
    fruiting: "फल",
    harvesting: "कटाई",
    
    // Common crops
    rice: "धान",
    wheat: "गेहूं",
    cotton: "कपास",
    sugarcane: "गन्ना",
    tomato: "टमाटर",
    potato: "आलू",
    onion: "प्याज",
    soybean: "सोयाबीन",
    maize: "मक्का",
    groundnut: "मूंगफली",
  },
  
  mr: {
    // App
    appName: "फार्मवाइज AI",
    tagline: "स्मार्ट शेती, चांगले उत्पादन",
    
    // Navigation
    home: "होम",
    history: "इतिहास",
    scan: "स्कॅन",
    alerts: "अलर्ट",
    schemes: "योजना",
    settings: "सेटिंग्ज",
    
    // Onboarding
    onboardingTitle: "फार्मवाइज AI मध्ये आपले स्वागत आहे",
    onboardingQuestion: "आपल्याला हे अ‍ॅप वापरण्यासाठी मार्गदर्शन हवे आहे का?",
    yes: "होय",
    no: "नाही",
    skip: "वगळा",
    next: "पुढे",
    back: "मागे",
    getStarted: "सुरू करा",
    
    // Home
    welcomeBack: "स्वागत आहे, शेतकरी",
    scanYourCrop: "पीक स्कॅन करा",
    scanDescription: "रोग ओळखण्यासाठी आपल्या पिकाचा फोटो घ्या",
    quickActions: "जलद क्रिया",
    recentScans: "अलीकडील स्कॅन",
    viewAll: "सर्व पहा",
    noRecentScans: "अलीकडील स्कॅन नाहीत. आपले पीक स्कॅन करून सुरुवात करा!",
    
    // Features
    diseaseDetection: "रोग ओळख",
    fertilizerCalculator: "खत कॅल्क्युलेटर",
    weatherUpdates: "हवामान अपडेट",
    marketPrices: "बाजार भाव",
    expertConnect: "तज्ञांशी बोला",
    communityAlerts: "समुदाय अलर्ट",
    govSchemes: "सरकारी योजना",
    
    // Scan
    takePhoto: "फोटो घ्या",
    uploadPhoto: "फोटो अपलोड करा",
    analyzing: "आपल्या पिकाचे विश्लेषण होत आहे...",
    scanAgain: "पुन्हा स्कॅन करा",
    cropIdentified: "पीक ओळखले",
    diseaseDetected: "रोग आढळला",
    healthy: "निरोगी",
    
    // Results
    severity: "तीव्रता",
    confidence: "विश्वास पातळी",
    low: "कमी",
    medium: "मध्यम",
    high: "उच्च",
    immediateAction: "तात्काळ कृती",
    preventiveCare: "प्रतिबंधात्मक उपाय",
    recommendedMedicines: "शिफारस केलेली औषधे",
    explanation: "स्पष्टीकरण",
    
    // History
    scanHistory: "स्कॅन इतिहास",
    noHistory: "अद्याप स्कॅन इतिहास नाही",
    date: "तारीख",
    crop: "पीक",
    disease: "रोग",
    
    // Alerts
    communityAlertsTitle: "समुदाय अलर्ट",
    noAlerts: "तुमच्या भागात अलर्ट नाहीत",
    alertsNearby: "जवळील अलर्ट",
    casesReported: "जवळच्या गावांमध्ये प्रकरणे",
    
    // Expert Connect
    talkToExpert: "कृषी तज्ञांशी बोला",
    whatsappChat: "व्हाट्सअ‍ॅप चॅट",
    ivrCall: "व्हॉइस कॉल (IVR)",
    expertAvailability: "तज्ञांची उपलब्धता बदलू शकते",
    
    // Fertilizer
    fertilizerCalcTitle: "खत कॅल्क्युलेटर",
    cropType: "पिकाचा प्रकार",
    landSize: "जमिनीचा आकार",
    acre: "एकर",
    hectare: "हेक्टर",
    growthStage: "वाढीची अवस्था",
    calculate: "गणना करा",
    recommendation: "शिफारस",
    dosage: "डोस",
    frequency: "वारंवारता",
    
    // Weather
    weatherTitle: "हवामान अपडेट",
    enableWeather: "लाइव्ह हवामान अपडेट सुरू करायचे?",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    rainfall: "पाऊस",
    diseaseRisk: "रोगाचा धोका",
    
    // Market
    marketPricesTitle: "बाजार भाव",
    pricePerQuintal: "प्रति क्विंटल किंमत",
    trending: "ट्रेंड",
    rising: "वाढत आहे",
    stable: "स्थिर",
    falling: "घसरत आहे",
    goodTimeToSell: "विकण्याची चांगली वेळ",
    holdForFewDays: "काही दिवस थांबा",
    priceDisclaimer: "किंमती सूचक आहेत, हमी नाही",
    
    // Schemes
    govSchemesTitle: "सरकारी योजना",
    eligibility: "पात्रता",
    benefits: "फायदे",
    applyNow: "आता अर्ज करा",
    
    // Settings
    language: "भाषा",
    selectLanguage: "भाषा निवडा",
    resetOnboarding: "ऑनबोर्डिंग रीसेट करा",
    privacyPolicy: "गोपनीयता धोरण",
    about: "आमच्याबद्दल",
    version: "आवृत्ती",
    
    // Privacy
    privacyTitle: "तुमची गोपनीयता महत्त्वाची आहे",
    privacyDescription: "आम्ही तुमची गोपनीयता गांभीर्याने घेतो",
    noFaceDetection: "चेहरा ओळख नाही",
    noIdentityStorage: "ओळख संग्रहण नाही",
    localProcessing: "प्रतिमा स्थानिक पातळीवर प्रक्रिया केल्या",
    
    // TTS
    listen: "ऐका",
    stopListening: "थांबा",
    
    // Errors
    imageTooBlurry: "प्रतिमा स्पष्ट नाही. कृपया स्पष्ट फोटो घ्या.",
    tryAgain: "पुन्हा प्रयत्न करा",
    networkError: "नेटवर्क त्रुटी. ऑफलाइन मोडमध्ये.",
    offlineMode: "ऑफलाइन मोड",
    
    // Growth stages
    seedling: "रोप",
    vegetative: "वनस्पतिजन्य",
    flowering: "फुलोरा",
    fruiting: "फळधारणा",
    harvesting: "काढणी",
    
    // Common crops
    rice: "भात",
    wheat: "गहू",
    cotton: "कापूस",
    sugarcane: "ऊस",
    tomato: "टोमॅटो",
    potato: "बटाटा",
    onion: "कांदा",
    soybean: "सोयाबीन",
    maize: "मका",
    groundnut: "भुईमूग",
  }
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी'
};

export const getTranslation = (lang: Language, key: keyof TranslationStrings): string => {
  return translations[lang][key] || translations.en[key] || key;
};
