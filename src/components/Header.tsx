
import React from 'react';
import { History, Menu, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 flex items-center justify-between glassmorphism border-0 border-b border-border mb-6 animate-slide-down">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-foreground">MapWise Measure</h1>
        <div className="ml-2 px-2 py-0.5 bg-primary/10 rounded-full text-xs text-primary font-medium">Beta</div>
      </div>
      
      <nav className="flex items-center space-x-1">
        <button className="p-2 rounded-full hover:bg-secondary transition-colors">
          <History size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-secondary transition-colors">
          <Settings size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-secondary transition-colors">
          <Menu size={20} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
