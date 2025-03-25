
import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <div className="mb-4 md:mb-0">
          © {new Date().getFullYear()} MapWise Measure. All rights reserved.
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-foreground transition-colors">About</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          
          <div className="flex items-center space-x-2 ml-2">
            <a href="#" className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
