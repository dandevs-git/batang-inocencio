import React from "react";

function Footer() {
  return (
    <div className="mt-5">
      <div className="text-bg-primary">
        <div className="container d-flex py-4">
          <div className="col-2 d-flex justify-content-center align-items-center">
            <img src="/storage/logos/Logo.png" alt="Logo" className="img-fluid" />
          </div>
          <div className="col-7 d-flex justify-content-center align-items-center">
            <div className="flex-column p-3">
              <div className="fs-1 text-uppercase fw-semibold mb-3">
                Contact Information
              </div>
              <div className="d-flex mb-3">
                <i className="bi bi-geo-alt-fill"></i>
                <div>
                  2nd Floor, City Hall Bldg., Governor's Drive, Brgy. Inocencio,
                  Trece Martires City, Cavite
                </div>
              </div>
              <div className="d-flex mb-3">
                <i className="bi bi-telephone-fill"></i>
                <div>(046) 419-0353 • (046) 419-0887</div>
              </div>
              <div className="d-flex mb-3">
                <i className="bi bi-envelope-at-fill"></i>
                <div>trecemartires.CMO@gmail.com</div>
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
        &copy; 2023. Batang Inocencio. All Rights Reserved.
      </div>
    </div>
  );
}

export default Footer;
