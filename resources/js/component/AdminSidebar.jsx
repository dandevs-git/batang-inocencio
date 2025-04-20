import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import { useAPI } from "./contexts/ApiContext";

const AdminSidebar = () => {
  const { getData } = useAPI();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeEventMenu, setActiveEventMenu] = useState(false);
  const [activeServicesMenu, setActiveServicesMenu] = useState(false);

  const [websiteInformation, setWebsiteInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const settings = await getData(
        "settings",
        setWebsiteInformation,
        setLoading,
        setError
      );
    };

    fetchData();
  }, []);

  const pages = [
    {
      page: "Dashboard",
      link: "/admin/dashboard",
      icon: "bi bi-graph-up-arrow",
    },
    {
      page: "Membership",
      link: "/admin/membership",
      icon: "bi bi-people-fill",
    },
    { page: "News & Updates", link: "/admin/news", icon: "bi bi-newspaper" },
    {
      page: "Announcement",
      link: "/admin/announcements",
      icon: "bi bi-megaphone-fill",
    },
    {
      page: "Manage Events",
      link: "/admin/events/manage",
      icon: "bi bi-calendar-check-fill",
    },
    {
      page: "Participants",
      link: "/admin/events/participants",
      icon: "bi bi-person-up",
    },
    {
      page: "Manage Services",
      link: "/admin/services/manage",
      icon: "bi bi-sliders",
    },
    {
      page: "Computer",
      link: "/admin/services/resource-reservation/1",
      icon: "bi bi-pc-display",
    },
    {
      page: "Printing",
      link: "/admin/services/resource-reservation/2",
      icon: "bi bi-printer-fill",
    },
    {
      page: "Transparency",
      link: "/admin/transparency",
      icon: "bi bi-transparency",
    },
    { page: "Settings", link: "/admin/settings", icon: "bi bi-gear-fill" },
    { page: "Logout", link: "/admin/logout", icon: "bi bi-box-arrow-left" },
  ];

  const isEventPageActive = (link) => location.pathname.startsWith(link);
  const isServicesPageActive = (link) => location.pathname.startsWith(link);

  const toggleEventMenu = () => setActiveEventMenu((prevState) => !prevState);
  const toggleServicesMenu = () =>
    setActiveServicesMenu((prevState) => !prevState);

  useEffect(() => {
    setActiveEventMenu(isEventPageActive("/admin/events"));
    setActiveServicesMenu(isServicesPageActive("/admin/services"));
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await api.post("logout");
      localStorage.removeItem("auth_token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="d-flex flex-column vh-100 shadow-lg border text-bg-primary fixed-top"
      style={{ width: "300px" }}
      id="Adminsidebar"
    >
      <Link to="/admin/dashboard" className="text-decoration-none text-dark">
        <div className="d-flex justify-content-start p-3 text-light">
          <img
            src={
              websiteInformation?.logo
                ? `/storage/${websiteInformation.logo}`
                : "/images/Logo.png"
            }
            alt="Logo"
            width="40"
            height="40"
          />
          <div className="ms-2 d-flex flex-column justify-content-center">
            <div className="m-0 fw-bold" style={{ fontSize: "0.8rem" }}>
              {websiteInformation?.website_name}
            </div>
            <div className="m-0" style={{ fontSize: "0.6rem" }}>
              Brgy. Inocencio, Trece Martires
            </div>
          </div>
        </div>
      </Link>

      <div className="nav nav-underline flex-column h-100">
        <div className="px-2 px-md-4 pb-4 w-100 h-100">
          <ul className="text-nowrap list-unstyled h-100 d-flex flex-column">
            {pages
              .filter(
                (page) =>
                  page.page !== "Logout" &&
                  !page.link.includes("/admin/events") &&
                  !page.link.includes("/admin/services")
              )
              .map((page) => (
                <li className="nav-item text-start" key={page.link}>
                  <Link
                    to={page.link}
                    className={`nav-link text-light ${
                      location.pathname === page.link ||
                      (page.link !== "/admin" &&
                        location.pathname.startsWith(page.link))
                        ? "active fw-bold"
                        : ""
                    }`}
                  >
                    <i className={`${page.icon} me-3`}></i> {page.page}
                  </Link>
                </li>
              ))}

            {/* Events Menu */}
            <li className="nav-item">
              <button
                className="nav-link text-light d-flex align-items-center w-100"
                onClick={toggleEventMenu}
                aria-expanded={activeEventMenu}
              >
                <i className="bi bi-calendar-event-fill me-3"></i> Events {}
                <i className="bi bi-chevron-down ms-auto"></i>
              </button>
              <ul
                className={`collapse list-unstyled ms-4 ${
                  activeEventMenu ? "show" : ""
                }`}
                id="eventsMenu"
              >
                {pages
                  .filter((page) => page.link.includes("/admin/events"))
                  .map((page) => (
                    <li key={page.link}>
                      <Link
                        to={page.link}
                        className={`nav-link text-light ${
                          location.pathname.startsWith(page.link)
                            ? "active fw-bold"
                            : ""
                        }`}
                      >
                        <i className={`${page.icon} me-3`}></i> {page.page}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>

            {/* Services Menu */}
            <li className="nav-item">
              <button
                className="nav-link text-light d-flex align-items-center w-100"
                onClick={toggleServicesMenu}
                aria-expanded={activeServicesMenu}
              >
                <i className="bi bi-tools me-3"></i> Services{" "}
                <i className="bi bi-chevron-down ms-auto"></i>
              </button>
              <ul
                className={`collapse list-unstyled ms-4 ${
                  activeServicesMenu ? "show" : ""
                }`}
                id="servicesMenu"
              >
                {pages
                  .filter((page) => page.link.includes("/admin/services"))
                  .map((page) => (
                    <li key={page.link}>
                      <Link
                        to={page.link}
                        className={`nav-link text-light ${
                          location.pathname.startsWith(page.link)
                            ? "active fw-bold"
                            : ""
                        }`}
                      >
                        <i className={`${page.icon} me-3`}></i> {page.page}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>

            {/* Logout */}
            <li className="nav-item mt-auto">
              <button
                type="submit"
                className="nav-link text-light border-0 bg-transparent w-100 text-start"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-left me-3"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
