
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HeartPulse, Menu, X, User, Home, Calendar, BookOpen, MessageSquare, Settings, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add scroll event listener to change navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if current route is active
  const isRouteActive = (route: string) => {
    if (route === '/' && location.pathname === '/') return true;
    if (route !== '/' && location.pathname.startsWith(route)) return true;
    return false;
  };

  // Render nav link with appropriate active styles
  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link 
      to={to} 
      className={cn(
        "transition-colors duration-200 flex items-center gap-2 px-3 py-2 rounded-md",
        isRouteActive(to) 
          ? "text-primary font-medium bg-primary-50" 
          : "text-gray-600 hover:text-primary hover:bg-gray-50"
      )}
    >
      {children}
    </Link>
  );

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/90 backdrop-blur-sm shadow-md py-2" 
          : "bg-white shadow-sm py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and site name */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
              <HeartPulse className="h-8 w-8 text-primary" />
            </div>
            <span className="text-xl font-bold text-gray-900">HealthConsult</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/consultation">
              <MessageSquare className="h-4 w-4" />
              <span>Consultation</span>
            </NavLink>
            <NavLink to="/learning">
              <BookOpen className="h-4 w-4" />
              <span>Resources</span>
            </NavLink>
            <NavLink to="/appointments">
              <Calendar className="h-4 w-4" />
              <span>Appointments</span>
            </NavLink>
            <NavLink to="/settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </NavLink>
            
            <div className="ml-4 flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="flex items-center gap-2 bg-primary hover:bg-primary-600">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "fixed inset-x-0 top-[65px] bg-white border-t shadow-lg md:hidden transition-all duration-300 ease-in-out transform",
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="px-4 py-6 space-y-4">
            <div className="space-y-2">
              <NavLink to="/">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </NavLink>
              <NavLink to="/consultation">
                <MessageSquare className="h-5 w-5" />
                <span>Consultation</span>
              </NavLink>
              <NavLink to="/learning">
                <BookOpen className="h-5 w-5" />
                <span>Resources</span>
              </NavLink>
              <NavLink to="/appointments">
                <Calendar className="h-5 w-5" />
                <span>Appointments</span>
              </NavLink>
              <NavLink to="/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </NavLink>
            </div>
            
            <div className="pt-4 space-y-3">
              <Link to="/login" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-5 w-5 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/signup" className="block">
                <Button className="w-full justify-start bg-primary hover:bg-primary-600">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
