import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { HomePage, AboutPage, LoginSignUpPage, FirstPage } from "./pages";
import {
  Sidebar,
  TopBar,
  FooterComponent,
  NavbarComponent,
} from "./components";

// Layout with Sidebar + TopBar
function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 dark:text-white transition">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 overflow-y-auto md:h-[50vh] rounded-2xl p-4 bg-white dark:bg-gray-800">
          {children}
        </main>
      </div>
    </div>
  );
}

// Layout with Navbar + Footer (for "/")
function LandingLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarComponent />
      <main className="flex-1">{children}</main>
      <FooterComponent />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const darkMode = useSelector((state) => state.ui.darkMode);
  const themeColor = useSelector((state) => state.ui.themeColor);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // "/" route → Landing layout
  if (location.pathname === "/") {
    return (
      <LandingLayout>
        <FirstPage />
      </LandingLayout>
    );
  } else if (location.pathname === "/auth") {
    return (
      <LandingLayout>
        <LoginSignUpPage />
      </LandingLayout>
    );
  } else if (location.pathname === "/about") {
    return (
      <LandingLayout>
        <AboutPage />
      </LandingLayout>
    );
  }

  // Other routes → Sidebar + TopBar layout
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
