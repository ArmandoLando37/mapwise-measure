
import React, { useState } from 'react';
import Header from '@/components/Header';
import IntroPane from '@/components/IntroPane';
import MapMeasure from '@/components/MapMeasure';
import ResultsPanel from '@/components/ResultsPanel';
import Footer from '@/components/Footer';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [area, setArea] = useState(0);

  const handleStartMeasuring = () => {
    setShowIntro(false);
  };

  const handleAreaChange = (newArea: number) => {
    setArea(newArea);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 md:px-6 pb-10">
        {showIntro ? (
          <div className="flex items-center justify-center py-12">
            <IntroPane onStartMeasuring={handleStartMeasuring} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[600px]">
              <MapMeasure onAreaChange={handleAreaChange} />
            </div>
            
            <div className="lg:col-span-1 glassmorphism rounded-lg overflow-hidden border border-border shadow-sm">
              <ResultsPanel area={area} />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
