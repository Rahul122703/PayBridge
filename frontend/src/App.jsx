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
      <div className="flex min-h-screen bg-[#7785EE] dark:bg-gray-900 dark:text-white transition">
        <Sidebar />

        <div className="flex flex-col flex-1">
          <TopBar />

          <main className="flex-1 overflow-y-auto md:h-[90vh] rounded-2xl border border-black p-4 bg-white">
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
