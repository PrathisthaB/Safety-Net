import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ReportSection from "./components/ReportSection";
import Footer from "./components/Footer";
import SignUp from "./components/signup"; // Fixed case
import Track from "./components/track";
import Report from "./components/report"; // Fixed case
import About from "./components/aboutus"; // Added About page
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Navbar />
        <Routes>
          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
                <ReportSection />
                <Footer />
              </>
            }
          />
          
          {/* Other Page Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin-login" element={<AdminPanel />} />
          <Route path="/track" element={<Track />} />
          <Route path="/report" element={<Report />} />
          <Route path="/about" element={<About />} /> {/* Added About Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
