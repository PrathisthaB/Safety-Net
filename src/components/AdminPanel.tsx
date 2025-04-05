import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminLogin from "./AdminLogin";
import AdminSignUp from "./AdminSignUp";

const AdminPanel: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean | null>(null);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black">
      {/* 🟢 Matrix Falling Code Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle,#011627,#000)] opacity-50"></div>
        <div className="absolute w-full h-full opacity-40">
          {[...Array(30)].map((_, i) => {
            const topValue = -Math.random() * 100;
            const leftValue = Math.random() * 100;

            return (
              <motion.div
                key={i}
                className="absolute text-green-400 font-mono text-lg"
                animate={{
                  y: [0, window.innerHeight + 50],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                }}
                style={{
                  top: `${topValue}px`,
                  left: `${leftValue}%`,
                }}
              >
                {
                  ["101", "010", "110", "011", "100", "001"][
                    Math.floor(Math.random() * 6)
                  ]
                }
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 🛡️ Cybersecurity Circuit Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 mix-blend-overlay"></div>

      {/* 🏠 Main Sign-Up Card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-black/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[400px] border border-green-500"
      >
        <h2 className="text-3xl font-extrabold text-green-400 text-center mb-6">
          Admin Sign Up 🔐
        </h2>

        {isSignUp === null ? (
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsSignUp(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl"
            >
              Sign Up with an Account
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsSignUp(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl"
            >
              Login to an existing account
            </motion.button>
          </div>
        ) : isSignUp ? (
          <AdminSignUp />
        ) : (
          <AdminLogin />
        )}
      </motion.div>
    </div>
  );
};

export default AdminPanel;
