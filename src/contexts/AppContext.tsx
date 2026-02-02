import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface ScanResult {
  id: string;
  date: string;
  cropName: string;
  cropNameKey?: string;
  diseaseName: string;
  diseaseNameHi?: string;
  diseaseNameMr?: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  explanation: string;
  explanationHi?: string;
  explanationMr?: string;
  immediateAction: string;
  immediateActionHi?: string;
  immediateActionMr?: string;
  preventiveCare: string;
  preventiveCareHi?: string;
  preventiveCareMr?: string;
  medicines: string[];
  imageUrl?: string;
}

export interface CommunityAlert {
  id: string;
  disease: string;
  diseaseHi?: string;
  diseaseMr?: string;
  crop: string;
  casesCount: number;
  location: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
}

interface AppContextType {
  // Onboarding
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (value: boolean) => void;
  wantsGuidedHelp: boolean;
  setWantsGuidedHelp: (value: boolean) => void;
  resetOnboarding: () => void;
  
  // Scan History
  scanHistory: ScanResult[];
  addScanResult: (result: Omit<ScanResult, 'id' | 'date'>) => void;
  clearScanHistory: () => void;
  
  // Community Alerts
  communityAlerts: CommunityAlert[];
  
  // Weather
  weatherEnabled: boolean;
  setWeatherEnabled: (value: boolean) => void;
  
  // Offline status
  isOffline: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample community alerts data
const sampleAlerts: CommunityAlert[] = [
  {
    id: '1',
    disease: 'Late Blight',
    diseaseHi: 'लेट ब्लाइट',
    diseaseMr: 'लेट ब्लाइट',
    crop: 'Tomato',
    casesCount: 15,
    location: 'Nearby villages',
    severity: 'high',
    date: new Date().toISOString()
  },
  {
    id: '2',
    disease: 'Bacterial Leaf Blight',
    diseaseHi: 'बैक्टीरियल लीफ ब्लाइट',
    diseaseMr: 'बॅक्टेरियल लीफ ब्लाइट',
    crop: 'Rice',
    casesCount: 8,
    location: 'Nearby villages',
    severity: 'medium',
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    disease: 'Powdery Mildew',
    diseaseHi: 'पाउडरी मिल्ड्यू',
    diseaseMr: 'पावडरी मिल्ड्यू',
    crop: 'Cotton',
    casesCount: 5,
    location: 'Nearby villages',
    severity: 'low',
    date: new Date(Date.now() - 172800000).toISOString()
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Onboarding state
  const [hasCompletedOnboarding, setHasCompletedOnboardingState] = useState(() => {
    return localStorage.getItem('farmwise-onboarding-complete') === 'true';
  });
  
  const [wantsGuidedHelp, setWantsGuidedHelpState] = useState(() => {
    return localStorage.getItem('farmwise-guided-help') === 'true';
  });
  
  // Scan history
  const [scanHistory, setScanHistory] = useState<ScanResult[]>(() => {
    const stored = localStorage.getItem('farmwise-scan-history');
    return stored ? JSON.parse(stored) : [];
  });
  
  // Weather preference
  const [weatherEnabled, setWeatherEnabledState] = useState(() => {
    return localStorage.getItem('farmwise-weather-enabled') === 'true';
  });
  
  // Offline status
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Onboarding handlers
  const setHasCompletedOnboarding = useCallback((value: boolean) => {
    setHasCompletedOnboardingState(value);
    localStorage.setItem('farmwise-onboarding-complete', String(value));
  }, []);

  const setWantsGuidedHelp = useCallback((value: boolean) => {
    setWantsGuidedHelpState(value);
    localStorage.setItem('farmwise-guided-help', String(value));
  }, []);

  const resetOnboarding = useCallback(() => {
    setHasCompletedOnboardingState(false);
    setWantsGuidedHelpState(false);
    localStorage.removeItem('farmwise-onboarding-complete');
    localStorage.removeItem('farmwise-guided-help');
  }, []);

  // Scan history handlers
  const addScanResult = useCallback((result: Omit<ScanResult, 'id' | 'date'>) => {
    const newResult: ScanResult = {
      ...result,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    
    setScanHistory(prev => {
      const updated = [newResult, ...prev].slice(0, 50); // Keep last 50 scans
      localStorage.setItem('farmwise-scan-history', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearScanHistory = useCallback(() => {
    setScanHistory([]);
    localStorage.removeItem('farmwise-scan-history');
  }, []);

  // Weather preference
  const setWeatherEnabled = useCallback((value: boolean) => {
    setWeatherEnabledState(value);
    localStorage.setItem('farmwise-weather-enabled', String(value));
  }, []);

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AppContext.Provider value={{
      hasCompletedOnboarding,
      setHasCompletedOnboarding,
      wantsGuidedHelp,
      setWantsGuidedHelp,
      resetOnboarding,
      scanHistory,
      addScanResult,
      clearScanHistory,
      communityAlerts: sampleAlerts,
      weatherEnabled,
      setWeatherEnabled,
      isOffline
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
