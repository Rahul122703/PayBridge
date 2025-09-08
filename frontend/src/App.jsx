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

  const themeColor = useSelector((state) => state.ui.themeColor);

  return (
    <Router>
      <div
        className={`flex min-h-screen bg-[${themeColor}] dark:bg-gray-900 dark:text-white transition`}>
        <Sidebar />

        <div className="flex flex-col flex-1">
          <TopBar />

          <main className="flex-1 overflow-y-auto md:h-[50vh] rounded-2xl p-4 bg-white">
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
