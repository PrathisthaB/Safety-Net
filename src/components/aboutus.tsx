import { motion } from "framer-motion";
import { FaRocket, FaTools, FaShieldAlt, FaEnvelope } from "react-icons/fa";

const About = () => {
  return (
    <div className="relative min-h-screen bg-black text-white flex justify-center items-center px-6 py-12">
      {/* Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A202C]/80 to-[#000000]/90"></div>
        <div className="absolute inset-0 bg-noise opacity-10"></div>
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4A5568]/20 via-transparent to-black/0 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        ></motion.div>
      </div>

      {/* Content Container */}
      <motion.div
        className="relative max-w-5xl mx-auto bg-white/5 backdrop-blur-xl p-12 md:p-16 rounded-3xl shadow-2xl border border-white/10 space-y-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#A0AEC0] mb-8 font-serif tracking-tight">
            Elevating Community Safety
          </h1>
          <p className="text-xl text-[#CBD5E0] max-w-3xl mx-auto leading-relaxed font-light">
            Empowering citizens with a sophisticated platform for real-time crime reporting, fostering a secure and transparent community.
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Our Mission */}
          <motion.div
            className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex items-center mb-6">
              <FaRocket className="text-[#81E6D9] text-3xl mr-4" />
              <h2 className="text-2xl text-[#E2E8F0] font-semibold font-sans tracking-wide">
                Our Vision
              </h2>
            </div>
            <p className="text-[#CBD5E0] leading-relaxed font-light text-lg">
              To revolutionize crime reporting by providing a seamless, intelligent, and accessible platform that strengthens community bonds and ensures safety for all.
            </p>
          </motion.div>

          {/* What We Offer */}
          <motion.div
            className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex items-center mb-6">
              <FaTools className="text-[#ECC94B] text-3xl mr-4" />
              <h2 className="text-2xl text-[#E2E8F0] font-semibold font-sans tracking-wide">
                Key Features
              </h2>
            </div>
            <ul className="text-[#CBD5E0] space-y-4 font-light text-lg">
              <li className="flex items-center">
                <span className="mr-3 text-[#ECC94B]">🔹</span>
                <strong>Real-Time Incident Reporting</strong>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-[#ECC94B]">🔹</span>
                <strong>Precision Geo-Tagging & Tracking</strong>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-[#ECC94B]">🔹</span>
                <strong>Secure Authority Dashboard</strong>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-[#ECC94B]">🔹</span>
                <strong>Confidential Anonymity</strong>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-[#ECC94B]">🔹</span>
                <strong>Intuitive User Interface</strong>
              </li>
            </ul>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex items-center mb-6">
              <FaShieldAlt className="text-[#63B3ED] text-3xl mr-4" />
              <h2 className="text-2xl text-[#E2E8F0] font-semibold font-sans tracking-wide">
                Our Commitment
              </h2>
            </div>
            <ul className="text-[#CBD5E0] space-y-4 font-light text-lg">
              <li className="flex items-center">
                <span className="mr-3 text-[#63B3ED]">✅</span>
                <strong>Direct Authority Reporting</strong>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-[#63B3ED]">✅</span>
                <strong>Verified Security & Efficiency</strong>
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-[#63B3ED]">✅</span>
                <strong>Enhanced Citizen-Authority Collaboration</strong>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-xl text-[#CBD5E0] mb-8 font-light">
            Your insights are invaluable. Let's build a safer community together.
          </p>
          <motion.button
            className="flex items-center justify-center mx-auto px-10 py-5 bg-[#667EEA] hover:bg-[#5A67D8] transition duration-300 text-white text-lg font-semibold rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FaEnvelope className="mr-3" /> Connect With Us
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;