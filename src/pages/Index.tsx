import React from 'react';
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import OnboardingModal from '@/components/onboarding/OnboardingModal';
import HeroSection from '@/components/home/HeroSection';
import FeatureGrid from '@/components/home/FeatureGrid';
import RecentScans from '@/components/home/RecentScans';
import AlertsPreview from '@/components/home/AlertsPreview';

const Index: React.FC = () => {
  return (
    <div className="page-container">
      <OnboardingModal />
      <Header />
      
      <main className="pb-4">
        <HeroSection />
        <AlertsPreview />
        <FeatureGrid />
        <RecentScans />
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Index;
