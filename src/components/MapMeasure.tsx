
import React, { useEffect, useRef, useState } from 'react';
import { MousePointer, Move, Square, Trash2, XCircle } from 'lucide-react';

interface MapMeasureProps {
  onAreaChange?: (area: number) => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const MapMeasure: React.FC<MapMeasureProps> = ({ onAreaChange }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(null);
  const [polygon, setPolygon] = useState<google.maps.Polygon | null>(null);
  const [mode, setMode] = useState<'select' | 'draw' | 'edit'>('select');
  const [area, setArea] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize Google Maps
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing,geometry&callback=initMap`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      
      window.initMap = () => {
        if (mapRef.current) {
          initializeMap();
          setIsLoading(false);
        }
      };
      
      document.head.appendChild(googleMapsScript);
      
      return () => {
        document.head.removeChild(googleMapsScript);
        delete window.initMap;
      };
    };

    loadGoogleMapsApi();
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;
    
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 48.8566, lng: 2.3522 }, // Paris as default
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      styles: [
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [{ visibility: "simplified" }]
        },
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }]
        }
      ]
    };
    
    const newMap = new google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);
    
    // Initialize drawing manager
    const drawingManagerOptions: google.maps.drawing.DrawingManagerOptions = {
      drawingMode: null,
      drawingControl: false,
      polygonOptions: {
        fillColor: "#007AFF",
        fillOpacity: 0.2,
        strokeColor: "#007AFF",
        strokeWeight: 2,
        editable: false,
        draggable: false,
        zIndex: 1
      }
    };
    
    const newDrawingManager = new google.maps.drawing.DrawingManager(drawingManagerOptions);
    newDrawingManager.setMap(newMap);
    setDrawingManager(newDrawingManager);
    
    // Add polygon complete listener
    google.maps.event.addListener(newDrawingManager, 'polygoncomplete', (poly: google.maps.Polygon) => {
      // Remove existing polygon if any
      if (polygon) {
        polygon.setMap(null);
      }
      
      setPolygon(poly);
      newDrawingManager.setDrawingMode(null);
      setMode('select');
      
      // Calculate area when polygon is complete
      const newArea = google.maps.geometry.spherical.computeArea(poly.getPath().getArray());
      setArea(newArea);
      if (onAreaChange) onAreaChange(newArea);
      
      // Add listeners for when polygon is edited
      google.maps.event.addListener(poly, 'dragend', () => updateArea(poly));
      google.maps.event.addListener(poly.getPath(), 'insert_at', () => updateArea(poly));
      google.maps.event.addListener(poly.getPath(), 'remove_at', () => updateArea(poly));
      google.maps.event.addListener(poly.getPath(), 'set_at', () => updateArea(poly));
    });
  };

  const updateArea = (poly: google.maps.Polygon) => {
    const newArea = google.maps.geometry.spherical.computeArea(poly.getPath().getArray());
    setArea(newArea);
    if (onAreaChange) onAreaChange(newArea);
  };

  const handleModeChange = (newMode: 'select' | 'draw' | 'edit') => {
    setMode(newMode);
    
    if (!map || !drawingManager || !polygon) {
      if (newMode === 'draw' && drawingManager) {
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
      }
      return;
    }
    
    switch (newMode) {
      case 'select':
        drawingManager.setDrawingMode(null);
        if (polygon) {
          polygon.setEditable(false);
          polygon.setDraggable(false);
        }
        break;
      case 'draw':
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        break;
      case 'edit':
        drawingManager.setDrawingMode(null);
        polygon.setEditable(true);
        polygon.setDraggable(true);
        break;
    }
  };

  const clearPolygon = () => {
    if (polygon) {
      polygon.setMap(null);
      setPolygon(null);
      setArea(0);
      if (onAreaChange) onAreaChange(0);
    }
  };

  const formatArea = (areaInSquareMeters: number): string => {
    if (areaInSquareMeters < 10000) {
      return `${areaInSquareMeters.toFixed(2)} m²`;
    } else {
      const areaInHectares = areaInSquareMeters / 10000;
      return `${areaInHectares.toFixed(4)} hectares`;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="glassmorphism rounded-lg mb-4 p-3 flex items-center justify-between shadow-sm animate-fade-in">
        <div className="flex items-center space-x-3">
          <button
            className={`p-2 rounded-md transition-all ${mode === 'select' ? 'bg-primary text-white' : 'hover:bg-secondary'}`}
            onClick={() => handleModeChange('select')}
            title="Select mode"
          >
            <MousePointer size={18} />
          </button>
          <button
            className={`p-2 rounded-md transition-all ${mode === 'draw' ? 'bg-primary text-white' : 'hover:bg-secondary'}`}
            onClick={() => handleModeChange('draw')}
            title="Draw polygon"
          >
            <Square size={18} />
          </button>
          <button
            className={`p-2 rounded-md transition-all ${mode === 'edit' ? 'bg-primary text-white' : 'hover:bg-secondary'}`}
            onClick={() => handleModeChange('edit')}
            disabled={!polygon}
            title="Edit polygon"
          >
            <Move size={18} />
          </button>
          <button
            className="p-2 rounded-md hover:bg-secondary text-destructive transition-all"
            onClick={clearPolygon}
            disabled={!polygon}
            title="Clear polygon"
          >
            <Trash2 size={18} />
          </button>
        </div>
        
        <div className="text-sm font-medium">
          {area > 0 ? (
            <div className="animate-slide-up">Area: {formatArea(area)}</div>
          ) : (
            <div className="text-muted-foreground">Draw a polygon to measure area</div>
          )}
        </div>
      </div>
      
      <div className="relative flex-1 min-h-[400px] rounded-lg overflow-hidden border border-border shadow-sm">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-3"></div>
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}
        <div 
          ref={mapRef} 
          className="w-full h-full"
        />
      </div>
      
      {isLoading && (
        <div className="absolute bottom-4 left-4 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-600 max-w-xs animate-fade-in">
          <div className="flex items-start">
            <XCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">API Key Required</p>
              <p className="mt-1">Replace 'YOUR_API_KEY' with a valid Google Maps API key to enable the map.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapMeasure;
