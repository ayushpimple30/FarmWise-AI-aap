import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Wifi, WifiOff, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import LanguageSelector from '@/components/ui/LanguageSelector';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const { isOffline } = useApp();

  return (
    <header className="header-farmer">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">
              {t('appName')}
            </h1>
            <p className="text-xs text-muted-foreground">
              {t('tagline')}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isOffline && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-warning-light text-warning text-xs font-medium">
              <WifiOff className="w-3 h-3" />
              <span>{t('offlineMode')}</span>
            </div>
          )}
          
          <LanguageSelector />
          
          <Link
            to="/settings"
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center touch-target"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
