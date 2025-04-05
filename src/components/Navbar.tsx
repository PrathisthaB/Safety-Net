import { useState, useEffect } from "react";
import { Shield, Menu, X, UserCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {db} from "../config/firebase"

const Navbar = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  // Navigation Links
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/report", label: "Report" },
    { path: "/track", label: "Track" },
    { path: "/about", label: "About Us" },
  ];


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const userData = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            ...docSnap.data(), 
          };
          setUser(userData); 
        } else {
          console.log("No user data found in Firestore");
          setUser(currentUser); 
        }
      } else {
        setUser(null); 
      }
    });
  
    return () => unsubscribe();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isAdmin");
      alert("Successfully logged out!")
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <nav className="fixed w-full bg-slate-900/90 backdrop-blur-sm z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Links */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-500" />
            </Link>

            {/* Desktop Navigation */}
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

          {/* Right: Sign Up Button */}
          <div className="hidden md:block">
            {user ? (
              <div style={{display: "flex", alignItems: "center", gap: "15px", color: "white"}}>
                <p>Welcome {user.displayName} {isAdmin && " (Admin)"}</p>
                <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200" onClick={handleLogout}>
              <UserCircle className="h-5 w-5" />
              <span>Logout</span>
            </button>
              </div>
              
            ) : (
            <div className="flex items-center justify-center gap-3">
              <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200" onClick={() => navigate("/signup")}>
                <UserCircle className="h-5 w-5" />
                <span>Sign Up</span>
              </button>
               <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200" onClick={() => navigate("/admin-login")}>
               <UserCircle className="h-5 w-5" />
               <span>Admin Panel</span>
             </button>
             </div>
            )}
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
        <div className="md:hidden transition-all duration-300 ease-in-out">
          <div className="px-4 pb-3 space-y-2">
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
