
import React from 'react';
import { ArrowRight, MapPin, Calculator, BarChart4 } from 'lucide-react';

interface IntroPaneProps {
  onStartMeasuring: () => void;
}

const IntroPane: React.FC<IntroPaneProps> = ({ onStartMeasuring }) => {
  return (
    <div className="w-full max-w-xl mx-auto p-8 glassmorphism rounded-2xl animate-fade-in">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Measure Land Areas with Precision
      </h2>
      
      <p className="text-muted-foreground text-center mb-8">
        The most intuitive way to calculate land size, estimate value, and share your findings
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <MapPin className="text-primary" size={24} />
          </div>
          <h3 className="font-medium mb-2">Simple Mapping</h3>
          <p className="text-sm text-muted-foreground">Draw and edit property boundaries with ease</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Calculator className="text-primary" size={24} />
          </div>
          <h3 className="font-medium mb-2">Precise Calculations</h3>
          <p className="text-sm text-muted-foreground">Get accurate area measurements in multiple units</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <BarChart4 className="text-primary" size={24} />
          </div>
          <h3 className="font-medium mb-2">Value Estimation</h3>
          <p className="text-sm text-muted-foreground">Estimate land value based on location and size</p>
        </div>
      </div>
      
      <button 
        onClick={onStartMeasuring}
        className="w-full py-3 bg-primary text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-md"
      >
        <span>Start Measuring Now</span>
        <ArrowRight size={18} />
      </button>
      
      <p className="text-xs text-center text-muted-foreground mt-4">
        No account needed to get started
      </p>
    </div>
  );
};

export default IntroPane;
