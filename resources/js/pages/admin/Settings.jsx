import React from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";

function Settings() {
  return (
    <>
      <Breadcrumb />

      <div className="container py-4">
        <h2 className="fw-bold mb-4 text-primary">Website Settings</h2>

        <div className="mb-4 p-4 bg-white rounded-3 shadow-lg rounded-4 border">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 text-secondary">Website Information</h5>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Logo</label>
              <input type="file" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Website Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter website name"
              />
            </div>
            <div className="col-12">
              <button className="btn btn-sm btn-primary me-2">
                Save Website Info
              </button>
              <button className="btn btn-sm btn-outline-danger">Cancel</button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-4 p-4 bg-white rounded-3 shadow-lg rounded-4 border">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 text-secondary">Contact Information</h5>
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                defaultValue="Inocencio (B. Pook), Trece Martires, Cavite"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                defaultValue="09346890357"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                defaultValue="batang.inocencio@gmail.com"
              />
            </div>
            <div className="col-12">
              <button className="btn btn-sm btn-primary me-2">
                Save Contact Info
              </button>
              <button className="btn btn-sm btn-outline-danger">Cancel</button>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-4 p-4 bg-white rounded-3 shadow-lg rounded-4 border">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 text-secondary">Mission & Vision</h5>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Mission</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter mission..."
              ></textarea>
            </div>
            <div className="col-md-6">
              <label className="form-label">Vision</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter vision..."
              ></textarea>
            </div>
            <div className="col-12">
              <button className="btn btn-sm btn-primary me-2">
                Save Mission & Vision
              </button>
              <button className="btn btn-sm btn-outline-danger">Cancel</button>
            </div>
          </div>
        </div>

        {/* Organizational Chart */}
        <div className="mb-4 p-4 bg-white rounded-3 shadow-lg rounded-4 border">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 text-secondary">Organizational Chart</h5>
          </div>

          <h6 className="text-muted">Chairman</h6>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label">Chairman Name</label>
              <input
                type="text"
                className="form-control"
                defaultValue="Hon. Krisha Shane D. Atas"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Chairman Title</label>
              <input
                type="text"
                className="form-control"
                defaultValue="SK Chairperson"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Chairman Image</label>
              <input type="file" className="form-control" />
            </div>
          </div>

          <h6 className="text-muted">Committee Members</h6>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Member Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Member Title</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Member Image</label>
              <input type="file" className="form-control" />
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-sm btn-success text-light me-2">
              Add Member
            </button>
            <button className="btn btn-sm btn-primary">
              Save Organizational Chart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
