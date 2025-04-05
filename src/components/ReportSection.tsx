import { Camera, MapPin, Shield, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const ReportSection = () => {
  return (
    <div className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-start justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Report Incidents Safely and Securely
            </h2>
            <p className="text-gray-300 mb-8">
              Your safety and privacy are our top priorities. Our platform ensures complete anonymity 
              while providing efficient channels to report incidents to relevant authorities.
            </p>
            <div className="space-y-4">
              {[
                { icon: <Lock />, text: "End-to-end encrypted submissions" },
                { icon: <Shield />, text: "Anonymous reporting option" },
                { icon: <Camera />, text: "Secure evidence upload" },
                { icon: <MapPin />, text: "Optional location tracking" },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3 text-gray-300"
                >
                  <div className="text-indigo-500">{item.icon}</div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReportSection;
