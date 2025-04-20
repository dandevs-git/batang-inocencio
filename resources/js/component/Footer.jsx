import React, { useEffect, useState } from "react";
import { useAPI } from "./contexts/ApiContext";

function Footer() {
  const { getData } = useAPI();
  const [websiteInformation, setWebsiteInformation] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchWebsiteInformation = async () => {
      try {
        const response = await getData(
          "settings",
          setWebsiteInformation,
          setLoading,
          setError
        );
      } catch (error) {
        console.error("Error fetching websiteInformation:", error);
      }
    };

    fetchWebsiteInformation();
  }, [getData]);

  if (loading) return null;

  return (
    <div className="mt-5">
      <div className="text-bg-primary">
        <div className="container d-flex py-4">
          <div className="col-2 d-flex justify-content-center align-items-center">
          <img
              src={websiteInformation?.logo ?`/storage/${websiteInformation.logo}` : "images/Logo.png"} 
              alt="Logo"
              className="img-fluid"
            />
          </div>
          <div className="col-7 d-flex justify-content-center align-items-center">
            <div className="flex-column p-3">
              <div className="fs-1 text-uppercase fw-semibold mb-3">
                Contact Information
              </div>
              <div className="d-flex mb-3">
                <i className="bi bi-geo-alt-fill me-2"></i>
                <div>{websiteInformation.address ? websiteInformation.address : "Default Address"}</div>
              </div>
              <div className="d-flex mb-3">
                <i className="bi bi-telephone-fill me-2"></i>
                <div>{websiteInformation.phone_number ? websiteInformation.phone_number : "Default Phone Number"}</div>
              </div>
              <div className="d-flex mb-3">
                <i className="bi bi-envelope-at-fill me-2"></i>
                <div>{websiteInformation.email ? websiteInformation.email : "Default Email"}</div>
              </div>
            </div>
          </div>
          <div className="col-3 d-flex justify-content-center align-items-center">
            <div className="flex-column d-flex w-100 p-3">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="input-group mb-3">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Write your message here"
                ></textarea>
              </div>
              <button className="btn btn-success text-light text-uppercase">
                Send feedback
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-success text-light text-center fs-4">
        &copy; 2025. Batang Inocencio. All Rights Reserved.
      </div>
    </div>
  );
}

export default Footer;
