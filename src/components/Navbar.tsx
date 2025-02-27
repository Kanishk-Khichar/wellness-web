
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HeartPulse, Menu, X, User, Home } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and site name */}
          <Link to="/" className="flex items-center space-x-2">
            <HeartPulse className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-800">HealthConsult</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/consultation" 
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Consultation
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Contact
            </Link>
            <Link to="/login">
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out pt-16", 
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col items-center space-y-6 p-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link 
              to="/consultation" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <HeartPulse className="h-5 w-5" />
              Consultation
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-primary transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/login" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Button variant="outline" className="flex items-center gap-2 w-full">
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
