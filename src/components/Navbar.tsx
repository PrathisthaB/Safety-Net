import { useState } from "react";
import { Shield, Menu, X, UserCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/report", label: "Report" },
    { path: "/track", label: "Track" },
    { path: "/about", label: "About Us" },
  ];

  return (
    <nav className="fixed w-full bg-slate-900/90 backdrop-blur-sm z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Links */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-500" />
            </Link>
            <span className="company-name ml-2 text-white font-semibold text-lg">
              SafetyNet
            </span>
            <div className="hidden md:flex ml-10 space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                    location.pathname === link.path
                      ? "text-indigo-400"
                      : "text-gray-300 hover:text-indigo-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/signup">
              <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200">
                <UserCircle className="h-5 w-5" />
                <span>Sign Up</span>
              </button>
            </Link>
            <Link to="/admin-login">
              <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200">
                <UserCircle className="h-5 w-5" />
                <span>Admin Panel</span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden transition-all duration-300 ease-in-out bg-slate-900/95 px-4 pb-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium transition duration-200 ${
                location.pathname === link.path
                  ? "text-indigo-400"
                  : "text-gray-300 hover:text-indigo-400"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/signup" onClick={() => setIsOpen(false)}>
            <div className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Sign Up
            </div>
          </Link>
          <Link to="/admin-login" onClick={() => setIsOpen(false)}>
            <div className="block px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700">
              Admin Login
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
