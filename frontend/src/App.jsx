import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { HomePage, AboutPage, LoginSignUpPage } from "./pages";
import {
  Sidebar,
  TopBar,
  FooterComponent,
  NavbarComponent,
} from "./components";

function App() {
  const darkMode = useSelector((state) => state.ui.darkMode);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="flex min-h-screen bg-white dark:bg-gray-900 dark:text-white transition">
        {/* Sidebar on left */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col flex-1">
          {/* Top bar */}
          <TopBar />

          {/* Main routes */}
          <main className="flex-1 overflow-y-auto md:h-[90vh] rounded-2xl border border-none p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/auth" element={<LoginSignUpPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
