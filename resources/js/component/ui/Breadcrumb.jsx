// src/component/Breadcrumb.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    const path = window.location.pathname;
    const pathSegments = path.split("/").filter((segment) => segment !== "");

    const breadcrumbData = [];
    let breadcrumbPath = "/admin"; // Ensure it starts with '/admin'

    // Process the segments after 'admin'
    pathSegments.forEach((segment, index) => {
      // Skip the initial 'admin' segment
      if (segment === "admin") {
        return;
      }

      breadcrumbPath += "/" + segment;
      const isLast = index === pathSegments.length - 1;
      breadcrumbData.push({
        segment,
        path: breadcrumbPath,
        isLast,
      });
    });

    setBreadcrumb(breadcrumbData);
  }, []);

  return (
    <nav className="d-flex align-items-center mb-3">
      <ol className="breadcrumb mb-0" id="breadcrumb-list">
        {breadcrumb.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${item.isLast ? "active" : ""}`}
          >
            {item.isLast ? (
              item.segment.charAt(0).toUpperCase() + item.segment.slice(1)
            ) : (
              <Link to={item.path} className="text-decoration-none">
                {item.segment.charAt(0).toUpperCase() + item.segment.slice(1)}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
