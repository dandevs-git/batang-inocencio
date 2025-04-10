import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout"; // Admin Layout
import Login from "./pages/Login";

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
import EventRegistration from "./pages/user/EventRegistration";

import Dashboard from "./pages/admin/Dashboard";
import MembershipManagement from "./pages/admin/MembershipManagement";
import NewsManagement from "./pages/admin/NewsManagement";
import AnnouncementsManagement from "./pages/admin/AnnouncementsManagement";
import TransparencyManagement from "./pages/admin/TransparencyManagement";
import Settings from "./pages/admin/Settings";
import EventsManagement from "./pages/admin/EventsManagement";
import EventsParticipantsManagement from "./pages/admin/EventsParticipantsManagement";
import ServicesManagement from "./pages/admin/ServicesManagement";
import ServicesComputerManagement from "./pages/admin/ServicesComputerManagement";
import ServicesPrintingManagement from "./pages/admin/ServicesPrintingManagement";
import NewsCreate from "./pages/admin/NewsCreate";
import NewsDrafts from "./pages/admin/NewsDrafts";
import AnnouncementsCreate from "./pages/admin/AnnouncementsCreate";
import AnnouncementsDrafts from "./pages/admin/AnnouncementsDrafts";
import PrivateRoute from "./pages/PrivateRoute"; // Assuming PrivateRoute is a component
import EventsCreate from "./pages/admin/EventsCreate";
import EventsDrafts from "./pages/admin/EventsDrafts";

function route() {
  return (
    <Routes>
      {/* Main User Routes */}
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
        <Route path="events/:id" element={<EventDetail />} />
        <Route path="registration/:id" element={<EventRegistration />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/transparency" element={<Transparency />} />
      </Route>

      {/* Authentication Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Admin Routes - Use PrivateRoute as element of Route */}
      <Route element={<PrivateRoute element={<AdminLayout />} />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/membership" element={<MembershipManagement />} />

        {/* News Management Routes */}
        <Route path="/admin/news" element={<NewsManagement />} />
        <Route path="/admin/news/create" element={<NewsCreate />} />
        <Route path="/admin/news/drafts" element={<NewsDrafts />} />

        {/* Announcements Management Routes */}
        <Route
          path="/admin/announcements"
          element={<AnnouncementsManagement />}
        />
        <Route
          path="/admin/announcements/create"
          element={<AnnouncementsCreate />}
        />
        <Route
          path="/admin/announcements/drafts"
          element={<AnnouncementsDrafts />}
        />

        {/* Transparency & Settings Routes */}
        <Route
          path="/admin/transparency"
          element={<TransparencyManagement />}
        />
        <Route path="/admin/settings" element={<Settings />} />

        {/* Events Management Routes */}
        <Route path="/admin/events" element={<Navigate to={"manage"} />} />
        <Route path="/admin/events/manage" element={<EventsManagement />} />
        <Route path="/admin/events/create" element={<EventsCreate />} />
        <Route path="/admin/events/drafts" element={<EventsDrafts />} />
        <Route
          path="/admin/events/participants"
          element={<EventsParticipantsManagement />}
        />

        {/* Services Management Routes */}
        <Route path="/admin/services" element={<Navigate to={"manage"} />} />
        <Route path="/admin/services/manage" element={<ServicesManagement />} />
        <Route
          path="/admin/services/computer"
          element={<ServicesComputerManagement />}
        />
        <Route
          path="/admin/services/printing"
          element={<ServicesPrintingManagement />}
        />
      </Route>

      {/* Error Handling */}
      <Route path="*" element={<ErrorPage statusCode={404} />} />
    </Routes>
  );
}

export default route;
