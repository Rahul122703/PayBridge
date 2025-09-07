const Hero = () => {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 px-6 py-16">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Build Fast with React + Vite
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            A minimal starter kit for rapid development with Tailwind.
          </p>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*v2s19jk0rs5OfwWcB9j44w.png"
            alt="Hero Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
