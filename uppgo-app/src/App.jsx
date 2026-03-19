import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop"; // ✅ IMPORTANT

import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import EventDetail from "./pages/EventDetail";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";

import UserDashboard from "./pages/UserDashboard";

import OrganizerDashboard from "./pages/OrganizerDashboard";
import OrganizerAddEventPage from "./pages/OrganizerAddEventPage";
import OrganizerEditEventPage from "./pages/OrganizerEditEventPage";

import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import AddEventPage from "./pages/AddEventPage";
import EditEventPage from "./pages/EditEventPage";

import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      {/* ✅ SCROLL FIX */}
      <ScrollToTop />

      <Navbar />

      <div className="pt-24">

        <Routes>

          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* ================= AUTH ================= */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ================= USER ================= */}
          <Route
            path="/user"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= ORGANIZER ================= */}
          <Route
            path="/organizer"
            element={
              <ProtectedRoute role="organizer">
                <OrganizerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizer/add"
            element={
              <ProtectedRoute role="organizer">
                <OrganizerAddEventPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizer/edit/:id"
            element={
              <ProtectedRoute role="organizer">
                <OrganizerEditEventPage />
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="add-event" element={<AddEventPage />} />
            <Route path="edit/:id" element={<EditEventPage />} />
          </Route>

          {/* ================= 404 ================= */}
          <Route path="*" element={<NotFound />} />

        </Routes>

      </div>

      <Footer />

    </BrowserRouter>
  );
}

export default App;