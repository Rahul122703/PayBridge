const Hero = () => {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 h-[90vh]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 px-6 md:px-12 lg:px-16 py-20">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Manage Payments
            <span className="text-blue-600 dark:text-blue-400 ml-2">
              Flawlessly
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
            Simplify transactions, track records, and ensure secure processing
            with our smart payment management platform. Perfect for{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              schools, colleges, and organizations
            </span>
            .
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/get-started"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors duration-200 font-semibold">
              Get Started
            </a>
            <a
              href="/learn-more"
              className="px-8 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg shadow-md transition-colors duration-200 font-semibold">
              Learn More
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src="https://img.freepik.com/free-vector/online-payment-concept-illustration_114360-1675.jpg"
            alt="Payment Illustration"
            className="w-full max-w-md mx-auto lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
