import { Camera, MapPin, Shield, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: <Camera className="h-8 w-8 text-indigo-500" />,
      title: "Live Recording & Upload",
      description: "Record incidents in real-time and securely upload evidence directly through the platform.",
      image: ""
    },
    {
      icon: <MapPin className="h-8 w-8 text-indigo-500" />,
      title: "Precise Geo-Tagging",
      description: "Automatically tag locations for accurate incident reporting and faster response times.",
      image: ""
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      title: "Authority Dashboard",
      description: "Dedicated interface for law enforcement to verify and respond to reported incidents.",
      image: ""
    },
    {
      icon: <Bell className="h-8 w-8 text-indigo-500" />,
      title: "Real-time Updates",
      description: "Stay informed with instant notifications about your case progress and status changes.",
      image: ""
    }
  ];

  return (
    <div className="py-24 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Platform Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform provides comprehensive tools for secure incident reporting and efficient case management.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-700 rounded-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
