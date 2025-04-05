import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-16 bg-black text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=2670')] bg-cover bg-center opacity-15"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Report Incidents
            <span className="text-red-500"> Instantly & Securely</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Your safety matters. Report incidents in real-time and help make our community safer.
            All reports are geo-tagged and can be made anonymously.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/report">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 flex items-center justify-center space-x-2"
              >
                <AlertTriangle className="h-5 w-5" />
                <span>Report Incident</span>
              </motion.button>
            </Link>
            <Link to="/track">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-8 py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-200 flex items-center justify-center space-x-2"
              >
                <Shield className="h-5 w-5" />
                <span>Track Case</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Subtle Animation: Pulsing Alert Message - Changed to Rectangle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
            className="mt-8 px-8 py-3 bg-black text-yellow-400 text-2xl font-bold rounded-lg border-l-8 border-yellow-500 mx-auto w-full sm:w-auto"
          >
            LIVE INCIDENT REPORTING - REPORT NOW & HELP YOUR COMMUNITY!
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
