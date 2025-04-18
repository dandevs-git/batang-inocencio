import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAPI } from "./contexts/ApiContext";

const navItems = {
  Home: "/",
  Membership: "/membership",
  "News & Updates": "/news",
  Events: "/events",
  Services: "/services",
  "About Us": "/about",
  FAQs: "/faqs",
  Transparency: "/transparency",
};

function Header() {
  const { getData } = useAPI();
  const location = useLocation();
  const currentPath = location.pathname;

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

  if (loading) return null;

  return (
    <>
      {/* First Nav */}
      <nav className="navbar bg-primary">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={websiteInformation.logo ?`/storage/${websiteInformation.logo}` : "images/Logo.png"} 
              alt="Logo"
              width="110"
              height="100"
              className="object-fit-contain"
            />
            <div className="text-light ms-3">
              <h1 className="m-0 fw-bold">
                {websiteInformation.website_name || "Batang Inocencio"}
              </h1>
              <h5 className="m-0">Brgy. Inocencio, Trece Martires</h5>
            </div>
          </NavLink>
          <form className="d-flex" role="search">
            <div className="input-group">
              <span className="input-group-text rounded-start-pill">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control rounded-end-pill"
                placeholder="Search"
              />
            </div>
          </form>
        </div>
      </nav>

      {/* Second Nav */}
      <nav className="navbar nav-underline navbar-expand-lg bg-body-tertiary shadow-lg">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100 nav-fill">
              {Object.entries(navItems).map(([name, link]) => {
                const isActive =
                  link === "/"
                    ? currentPath === link
                    : currentPath.startsWith(link);

                return (
                  <li className="nav-item" key={name}>
                    <NavLink
                      to={link}
                      className={({ isActive: isNavLinkActive }) =>
                        `nav-link ${
                          isActive || isNavLinkActive ? "active" : ""
                        }`
                      }
                    >
                      {name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
