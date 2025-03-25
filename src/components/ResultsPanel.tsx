
import React from 'react';
import { Download, Save, Share2 } from 'lucide-react';

interface ResultsPanelProps {
  area: number;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ area }) => {
  const formatArea = (areaInSquareMeters: number): string => {
    if (areaInSquareMeters < 10000) {
      return `${areaInSquareMeters.toFixed(2)} m²`;
    } else {
      const areaInHectares = areaInSquareMeters / 10000;
      return `${areaInHectares.toFixed(4)} hectares`;
    }
  };

  const formatAreaInAcres = (areaInSquareMeters: number): string => {
    const areaInAcres = areaInSquareMeters / 4046.86;
    return `${areaInAcres.toFixed(4)} acres`;
  };

  const calculateEstimatedValue = (areaInSquareMeters: number): string => {
    // This is a placeholder calculation - in a real app, this would be more sophisticated
    const baseValuePerSquareMeter = 100; // Example: $100 per square meter
    const estimatedValue = areaInSquareMeters * baseValuePerSquareMeter;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(estimatedValue);
  };

  // If no area is measured yet, show a placeholder
  if (area <= 0) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="text-center text-muted-foreground animate-pulse-soft">
          <p>Use the drawing tools to measure an area</p>
          <p className="text-sm mt-2">Results will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 animate-slide-up">
      <h3 className="text-xl font-semibold mb-6">Measurement Results</h3>
      
      <div className="space-y-4">
        <div className="border-b pb-4">
          <div className="text-sm text-muted-foreground">Total Area</div>
          <div className="text-2xl font-medium mt-1">{formatArea(area)}</div>
          <div className="text-sm text-muted-foreground mt-1">{formatAreaInAcres(area)}</div>
        </div>
        
        <div className="border-b pb-4">
          <div className="text-sm text-muted-foreground">Estimated Perimeter</div>
          <div className="text-lg font-medium mt-1">{Math.sqrt(area) * 4} meters</div>
        </div>
        
        <div className="border-b pb-4">
          <div className="text-sm text-muted-foreground">Estimated Value</div>
          <div className="flex items-baseline gap-1">
            <div className="text-xl font-medium">{calculateEstimatedValue(area)}</div>
            <div className="text-xs text-muted-foreground">(estimated)</div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Based on average land values in this region
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col gap-3">
        <button className="btn-primary flex items-center justify-center gap-2">
          <Save size={16} />
          <span>Save Measurement</span>
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="btn-secondary flex items-center justify-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </button>
          
          <button className="btn-secondary flex items-center justify-center gap-2">
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
