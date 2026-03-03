import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import EventDetail from "./pages/EventDetail";
import LoginPage from "./pages/LoginPage";
import EditEventPage from "./pages/EditEventPage";
import NotFound from "./pages/NotFound";

// Admin Layout System
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";

function App() {
  return (
    <BrowserRouter>

      {/* Public Navbar */}
      <Navbar />

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<AdminDashboard />} />

          {/* Manage Events */}
          <Route path="events" element={<AdminEvents />} />

          {/* Edit Event */}
          <Route
            path="edit/:id"
            element={<EditEventPage />}
          />

          {/* Activity (placeholder) */}
          <Route
            path="activity"
            element={
              <div className="p-10 text-xl">
                Activity Log Coming Soon
              </div>
            }
          />
        </Route>

        {/* ================= 404 ================= */}
        <Route path="*" element={<NotFound />} />

      </Routes>

      {/* Public Footer */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;