import React, { useState } from "react";
import { motion } from "framer-motion";

const SignUp: React.FC = () => {
  const [isAnonymous, setIsAnonymous] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnonymous) {
      console.log("Signing up anonymously...");
    } else {
      console.log("User details:", formData);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black">
      {/* 🟢 Matrix Falling Code Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle,#011627,#000)] opacity-50"></div>
        <div className="absolute w-full h-full opacity-40">
          {[...Array(30)].map((_, i) => (
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
                top: `-${Math.random() * 100}px`,
                left: `${Math.random() * 100}%`,
              }}
            >
              {["101", "010", "110", "011", "100", "001"][Math.floor(Math.random() * 6)]}
            </motion.div>
          ))}
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
          Sign Up 🔐
        </h2>

        {isAnonymous === null ? (
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsAnonymous(true)}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl"
            >
              Sign Up Anonymously
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsAnonymous(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl"
            >
              Sign Up with an Account
            </motion.button>
          </div>
        ) : isAnonymous ? (
          <div className="text-center">
            <p className="mb-4 text-green-300 font-medium">
              You have chosen to sign up anonymously.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl"
            >
              Confirm
            </motion.button>
          </div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-green-300 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-900 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <div>
              <label className="block text-green-300 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-900 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <div>
              <label className="block text-green-300 font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-900 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <div>
              <label className="block text-green-300 font-medium">Phone Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg bg-gray-900 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl"
            >
              Sign Up
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default SignUp;
