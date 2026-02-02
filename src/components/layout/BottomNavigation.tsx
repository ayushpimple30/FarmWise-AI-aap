import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, History, Camera, Bell, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, labelKey: 'home' as const },
    { path: '/history', icon: History, labelKey: 'history' as const },
    { path: '/scan', icon: Camera, labelKey: 'scan' as const, isCenter: true },
    { path: '/alerts', icon: Bell, labelKey: 'alerts' as const },
    { path: '/schemes', icon: FileText, labelKey: 'schemes' as const },
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          if (item.isCenter) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative -mt-6"
              >
                <div className="btn-scan">
                  <span className="scan-pulse" />
                  <Icon className="w-7 h-7 text-primary-foreground relative z-10" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "bottom-nav-item relative touch-target",
                isActive && "active"
              )}
            >
              <span className="nav-indicator" />
              <Icon className={cn(
                "w-6 h-6 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-xs mt-1 font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
