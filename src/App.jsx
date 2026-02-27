import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import EventDetail from "./pages/EventDetail";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />   
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;