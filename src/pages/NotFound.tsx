
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glassmorphism p-8 rounded-2xl max-w-md w-full text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center gap-2 btn-primary px-6 py-3"
        >
          <HomeIcon size={18} />
          <span>Return to Home</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
