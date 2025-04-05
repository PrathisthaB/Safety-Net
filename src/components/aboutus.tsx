import { motion, useTransform, useViewportScroll } from "framer-motion";
import { FaRocket, FaTools, FaShieldAlt, FaEnvelope } from "react-icons/fa";
import { useRef } from "react";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useViewportScroll();

  const bgGradientOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.2, 0.1]);
  const particleSize = useTransform(scrollYProgress, [0, 0.5, 1], [1, 3, 1]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);
  const particleY = useTransform(scrollYProgress, [0, 1], ["0vh", "-20vh"]);

  return (
    <div className="relative min-h-screen bg-black text-white flex justify-center items-center px-6 py-12" ref={containerRef}>
      {/* Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A202C]/80 to-[#000000]/90"></div>
        <div className="absolute inset-0 bg-noise opacity-5"></div>

        {/* Animated Background Particles */}
        <motion.div
          className="absolute inset-0"
          style={{ y: particleY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, index) => {
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              const delay = Math.random() * 2;
              const color = `rgba(100, 149, 237, ${Math.random() * 0.3 + 0.1})`;

              return (
                <motion.div
                  key={index}
                  className="absolute rounded-full"
                  style={{
                    left: `${x}vw`,
                    top: `${y}vh`,
                    width: particleSize,
                    height: particleSize,
                    backgroundColor: color,
                    opacity: particleOpacity,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 2, delay: delay, ease: "easeInOut" }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Enhanced Radial Gradient */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4A5568]/10 via-transparent to-black/0 blur-3xl"
          style={{ opacity: bgGradientOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        ></motion.div>
      </div>

      {/* Content Container (rest of the component remains the same) */}
      <motion.div
        className="relative max-w-5xl mx-auto bg-white/5 backdrop-blur-xl p-12 md:p-16 rounded-3xl shadow-2xl border border-white/10 space-y-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* ... (rest of the component) */}
      </motion.div>
    </div>
  );
};

export default About;