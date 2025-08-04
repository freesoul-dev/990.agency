'use client';

import { NinePointedStar } from '@/components/icons';

interface LandingPageProps {
  onTransition: () => void;
}

export default function LandingPage({ onTransition }: LandingPageProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen bg-background text-primary cursor-pointer"
      onClick={onTransition}
    >
      <div className="flex flex-col justify-center text-center">
        <div className="relative flex flex-col items-center justify-center">
          <NinePointedStar className="w-48 h-48 md:w-64 md:h-64 text-accent animate-pulse-star blur-[5px]" />
          <div className="absolute">
            <h1 className="text-3xl md:text-5xl font-headPrimary text-black tracking-wide">
              990
            </h1>
          </div>
        </div>
        <p className="text-sm md:text-base text-muted-foreground mt-8 max-w-md font-body">
          
        </p>
      </div>
    </div>
  );
}
