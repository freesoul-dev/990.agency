'use client';
import { useState, useEffect } from 'react';
import LandingPage from '@/components/landing-page';
import MainPage from '@/components/main-page';
import { cn } from '@/lib/utils';

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTransition = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowLanding(false);
    }, 500); // Duration of the animation
  };

  if (!isClient) {
    return null; 
  }

  return (
    <>
      {showLanding && (
        <div
          className={cn(
            'transition-all duration-500 ease-in-out',
            isTransitioning ? 'animate-blur-out' : 'animate-fade-in'
          )}
        >
          <LandingPage onTransition={handleTransition} />
        </div>
      )}
      {!showLanding && (
         <div className="animate-fade-in">
            <MainPage />
        </div>
      )}
    </>
  );
}
