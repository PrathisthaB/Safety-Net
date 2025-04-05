
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-indigo-500" />
              <span className="text-xl font-bold text-white">SafetyNet</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering communities to report incidents securely and anonymously.
              Together we can make our neighborhoods safer.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">Report Incident</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400">Track Case</a></li>
             
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Emergency</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Support: 24/7</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-gray-400">
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
