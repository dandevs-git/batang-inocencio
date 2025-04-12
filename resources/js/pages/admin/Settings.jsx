import React, { useState } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import { useAPI } from "../../component/contexts/ApiContext";

function Settings() {
  const { getData, postData, putData, deleteData } = useAPI();
  const [logo, setLogo] = useState(null);
  const [websiteName, setWebsiteName] = useState("");

  const handleWebsiteInfoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append("website_name", websiteName);
    if (logo) formData.append("logo", logo);
  
    try {
      const existingSettings = await getData("/settings"); // Get existing settings
      const hasData = Array.isArray(existingSettings.data) && existingSettings.data.length > 0;
  
      let response;
  
      if (hasData) {
        const id = existingSettings.data[0].id; // Use the first setting's ID
        response = await putData(`/settings/${id}`, formData); // Update
        console.log("Updated:", response.data);
      } else {
        response = await postData("/settings", formData); // Create
        console.log("Created:", response.data);
      }
    } catch (error) {
      console.error(
        "Error saving website info:",
        error.response?.data || error
      );
    }
  };
  

  return (
    <>
      <Breadcrumb />

      <div className="container py-4">
        <h2 className="fw-bold mb-4 text-primary">Website Settings</h2>

        <form onSubmit={handleWebsiteInfoSubmit}>
          <div className="mb-4 p-4 bg-white rounded-3 shadow-lg rounded-4 border">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 text-secondary">Website Information</h5>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Logo</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setLogo(e.target.files[0])}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Website Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter website name"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                />
              </div>
              <div className="col-12">
                <button className="btn btn-sm btn-primary me-2" type="submit">
                  Save Website Info
                </button>
                <button type="reset" className="btn btn-sm btn-outline-danger">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>

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
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
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
