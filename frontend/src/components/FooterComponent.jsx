const FooterComponent = () => {
  return (
    <footer className="w-full bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white py-4 text-center mt-auto transition">
      <p className="text-xs sm:text-sm md:text-base">
        © {new Date().getFullYear()} My App. All rights reserved.
      </p>
    </footer>
  );
};

export default FooterComponent;
