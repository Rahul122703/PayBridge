import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const managements = ["SCHOOL", "COLLEGE", "MANAGEMENTS"];
  const [currentIndex, setCurrentIndex] = useState(0);

  // cycle through managements array
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % managements.length);
    }, 2000); // change every 2s
    return () => clearInterval(interval);
  }, [managements.length]);

  return (
    <section className="bg-gray-50 dark:bg-gray-800 text-center py-20 px-6 sm:px-12 transition h-[92vh]">
      <div className="max-w-4xl mx-auto h-full grid place-items-center">
        <div className="border border-none">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 flex flex-wrap justify-center gap-2">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>
              Manage Payments
            </motion.span>

            <motion.span
              className="text-blue-600 dark:text-blue-400 ml-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}>
              Very Flawlessly
            </motion.span>

            <motion.span
              className="text-blue-600 dark:text-blue-400 ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}>
              For
            </motion.span>

            {/* Animated managements word */}
            <motion.span
              key={currentIndex} // trigger re-animation
              className="text-black dark:text-white ml-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}>
              {managements[currentIndex]}
            </motion.span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 my-8">
            Simplify transactions, track records, and ensure secure processing
            with our platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/auth"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
