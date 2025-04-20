import React, { useState } from "react";
import Breadcrumb from "../ui/Breadcrumb";
import { useAPI } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

function ResourceLendingServiceForm() {
  const { postData } = useAPI();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    resource_name: "",
    available_resources: "",
    category: "Event Materials",
    location: "",
    day_start: "",
    day_end: "",
    time_start: "",
    time_end: "",
    penalty_description: "",
    launch_date: "",
    availability_status: "Available",
    penalty_enabled: true,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.service_name || !formData.date || !formData.location) {
      setError("Please fill out all required fields.");
      navigate("/admin/ResourceLendingServiceForm");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      console.log("Submitted Event Registration Form:", formData);
      await postData("ers", formData);
      setLoading(false);
      setFormData({
        service_name: "",
        description: "",
        resource_name: "",
        available_resources: "",
        category: "Event Materials",
        location: "",
        day_start: "",
        day_end: "",
        time_start: "",
        time_end: "",
        penalty_description: "",
        launch_date: "",
        availability_status: "Available",
        penalty_enabled: true,
      });
    } catch (err) {
      setLoading(false);
      setError("Failed to submit the form. Please try again later.");
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="container mt-5">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Resource Lending Management Service</h4>
          </div>
          <div className="card-body">
            <form noValidate onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Service Name</label>
                <input
                  name="service_name"
                  type="text"
                  className="form-control"
                  value={formData.service_name}
                  onChange={handleChange}
                  placeholder="Enter service name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="2"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter a brief description"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Name of Resource</label>
                <input
                  name="resource_name"
                  type="text"
                  className="form-control"
                  value={formData.resource_name}
                  onChange={handleChange}
                  placeholder="Enter resource name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Number of Available Resources
                </label>
                <input
                  name="available_resources"
                  type="number"
                  className="form-control"
                  value={formData.available_resources}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Event Materials">Event Materials</option>
                  <option value="Educational Resources">
                    Educational Resources
                  </option>
                  <option value="Audio-Visual Equipment">
                    Audio-Visual Equipment
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  name="location"
                  type="text"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Available From (Day)</label>
                  <input
                    name="day_start"
                    type="date"
                    className="form-control"
                    value={formData.day_start}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Available Until (Day)</label>
                  <input
                    name="day_end"
                    type="date"
                    className="form-control"
                    value={formData.day_end}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label">Time Start</label>
                  <input
                    name="time_start"
                    type="time"
                    className="form-control"
                    value={formData.time_start}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label">Time End</label>
                  <input
                    name="time_end"
                    type="time"
                    className="form-control"
                    value={formData.time_end}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3 form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={formData.penalty_enabled}
                  onChange={handleChange}
                  id="penaltySwitch"
                  name="penalty_enabled"
                />
                <label className="form-check-label" htmlFor="penaltySwitch">
                  Penalty Policy:{" "}
                  {formData.penalty_enabled ? "Enabled" : "Disabled"}
                </label>
              </div>

              {formData.penalty_enabled && (
                <div className="mb-3">
                  <label className="form-label">Penalty Description</label>
                  <textarea
                    name="penalty_description"
                    className="form-control"
                    rows="2"
                    value={formData.penalty_description}
                    onChange={handleChange}
                    placeholder="Describe penalty policy"
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Launch Date</label>
                <input
                  name="launch_date"
                  type="date"
                  className="form-control"
                  value={formData.launch_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Availability Status</label>
                <select
                  name="availability_status"
                  className="form-select"
                  value={formData.availability_status}
                  onChange={handleChange}
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Create Lending Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResourceLendingServiceForm;
