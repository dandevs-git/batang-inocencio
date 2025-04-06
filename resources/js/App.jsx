import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/user/Home";
import Transparency from "./pages/user/Transparency";
import FAQs from "./pages/user/FAQs";
import About from "./pages/user/About";
import Services from "./pages/user/Services";
import Events from "./pages/user/Events";
import News from "./pages/user/News";
import Membership from "./pages/user/Membership";
import MembershipRegistration from "./pages/user/MembershipRegistration";
import ErrorPage from "./pages/ErrorPage";
import NewsDetail from "./pages/user/NewsDetail";
import AnnouncementDetail from "./pages/user/AnnouncementDetail";
import EventDetail from "./pages/user/EventDetail";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/announcements/:id" element={<AnnouncementDetail />} />
        <Route path="/membership" element={<Membership />} />
        <Route
          path="/membership/registration"
          element={<MembershipRegistration />}
        />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/transparency" element={<Transparency />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<ErrorPage statusCode={404} />} />
    </Routes>
  );
}

export default App;
