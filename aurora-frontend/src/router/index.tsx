import { createBrowserRouter, Navigate } from "react-router-dom";

// CLIENT PAGES
import RootPage from "@/pages/client/index";
import HomePage from "@/pages/client/Home";
import AboutPage from "@/pages/client/About";
import AccommodationPage from "@/pages/client/Accommodation";
import ServicePage from "@/pages/client/Service";
import ExperiencePage from "@/pages/client/Experience";
import GalleryPage from "@/pages/client/Gallery";
import NewsPage from "@/pages/client/News";
import PromotionPage from "@/pages/client/Promotion";
import ContactPage from "@/pages/client/Contact";

// ADMIN PAGES
import AdminPage from "@/pages/admin/index";

// Error Page
import ErrorPage from "@/pages/commons/ErrorPage";

const router = createBrowserRouter([
  // =========================
  // CLIENT ROUTE GROUP
  // =========================
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "accommodation", element: <AccommodationPage /> },
      { path: "service", element: <ServicePage /> },
      { path: "experience", element: <ExperiencePage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "news", element: <NewsPage /> },
      { path: "promotion", element: <PromotionPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },

  // =========================
  // ADMIN ROUTE GROUP
  // =========================
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true, 
        element: (
          <div className="p-8">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p>Chào mừng đến với trang quản trị Aurora Hotel</p>
          </div>
        ) 
      },
    ],
  },

  // =========================
  // CATCH ALL - 404
  // =========================
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;