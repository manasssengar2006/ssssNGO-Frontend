import { motion } from "framer-motion";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0C2C55] to-[#296374] text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* NGO INFO */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-lg font-semibold">
            Svabhiman Siksha Sanskriti Samaajotthaan
          </h2>
          <p className="text-sm mt-2 text-gray-200">
            शिक्षा • संस्कृति • समाज सेवा
          </p>
          <p className="text-xs mt-2 text-gray-300">
            Empowering society through education and cultural values.
          </p>
        </motion.div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-200">
            <li>Home</li>
            <li>Posts</li>
            <li>Join NGO</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <div className="space-y-2 text-sm text-gray-200">
            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 XXXXX XXXXX
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> svabhimanngo@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Delhi, India
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-t border-white/20 text-center text-xs py-4 text-gray-200"
      >
        © {new Date().getFullYear()} Svabhiman shiksha sanskriti samjotthaan • Built with{" "}
        <Heart size={12} className="inline text-red-400" /> for society
      </motion.div>
    </footer>
  );
};

export default Footer;
