import React, { useState, useEffect } from 'react';
import { ArrowLeft, CloudSun, Droplets, Thermometer, Wind, AlertTriangle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
  diseaseRisk: 'low' | 'medium' | 'high';
  diseaseRiskReason: string;
}

const WeatherPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { weatherEnabled, setWeatherEnabled } = useApp();
  
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate weather API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock weather data - in production, use actual weather API
      const mockWeather: WeatherData = {
        temperature: 28 + Math.floor(Math.random() * 10),
        humidity: 60 + Math.floor(Math.random() * 30),
        rainfall: Math.random() > 0.5 ? Math.floor(Math.random() * 20) : 0,
        windSpeed: 5 + Math.floor(Math.random() * 15),
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        diseaseRisk: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low',
        diseaseRiskReason: 'High humidity and recent rainfall increase fungal disease risk'
      };
      
      setWeather(mockWeather);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weatherEnabled) {
      fetchWeather();
    }
  }, [weatherEnabled]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-destructive bg-destructive-light';
      case 'medium': return 'text-warning bg-warning-light';
      default: return 'text-success bg-success-light';
    }
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
              {t('weatherTitle')}
            </h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Enable Weather Toggle */}
        <div className="card-farmer p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{t('enableWeather')}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Get real-time weather updates and disease risk alerts
              </p>
            </div>
            <Switch
              checked={weatherEnabled}
              onCheckedChange={setWeatherEnabled}
            />
          </div>
        </div>

        {weatherEnabled && (
          <>
            {loading ? (
              <div className="card-farmer p-8 text-center">
                <div className="spinner mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Fetching weather data...</p>
              </div>
            ) : error ? (
              <div className="card-farmer p-6 text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={fetchWeather} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            ) : weather && (
              <>
                {/* Current Weather */}
                <div className="card-farmer p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Weather</p>
                      <p className="text-3xl font-bold text-foreground">{weather.temperature}°C</p>
                      <p className="text-muted-foreground">{weather.condition}</p>
                    </div>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center">
                      <CloudSun className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-xl bg-muted">
                      <Thermometer className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                      <p className="text-sm text-muted-foreground">{t('temperature')}</p>
                      <p className="font-semibold">{weather.temperature}°C</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-muted">
                      <Droplets className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                      <p className="text-sm text-muted-foreground">{t('humidity')}</p>
                      <p className="font-semibold">{weather.humidity}%</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-muted">
                      <Wind className="w-5 h-5 mx-auto mb-1 text-cyan-500" />
                      <p className="text-sm text-muted-foreground">Wind</p>
                      <p className="font-semibold">{weather.windSpeed} km/h</p>
                    </div>
                  </div>
                </div>

                {/* Disease Risk Alert */}
                <div className={`card-farmer p-5 border-l-4 ${
                  weather.diseaseRisk === 'high' ? 'border-destructive' :
                  weather.diseaseRisk === 'medium' ? 'border-warning' :
                  'border-success'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getRiskColor(weather.diseaseRisk)}`}>
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {t('diseaseRisk')}: {t(weather.diseaseRisk)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {weather.diseaseRiskReason}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Refresh Button */}
                <Button
                  onClick={fetchWeather}
                  variant="outline"
                  className="w-full h-12 rounded-xl"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Weather
                </Button>
              </>
            )}
          </>
        )}

        {/* Info Notice */}
        <div className="p-4 rounded-xl bg-muted/50 text-center">
          <p className="text-xs text-muted-foreground">
            Weather data is fetched from online sources. App functionality is not blocked when offline.
          </p>
        </div>
      </main>
    </div>
  );
};

export default WeatherPage;
