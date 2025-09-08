import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";

import {
  HomePage,
  AboutPage,
  LoginSignUpPage,
  FirstPage,
  PageNotFound,
} from "./pages";

import {
  Sidebar,
  TopBar,
  FooterComponent,
  NavbarComponent,
} from "./components";

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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  if (
    location.pathname === "/" ||
    location.pathname === "/auth" ||
    location.pathname === "/about"
  ) {
    return (
      <LandingLayout>
        {location.pathname === "/" && <FirstPage />}
        {location.pathname === "/auth" && <LoginSignUpPage />}
        {location.pathname === "/about" && <AboutPage />}
      </LandingLayout>
    );
  }

  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Toaster />
    </Router>
  );
}

export default App;
