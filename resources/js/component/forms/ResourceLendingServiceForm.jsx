import React, { useState } from "react";
import Breadcrumb from "../ui/Breadcrumb";

function ResourceLendingServiceForm() {
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    resourceName: "",
    availableResources: "",
    category: "Event Materials",
    location: "",
    dayStart: "",
    dayEnd: "",
    timeStart: "",
    timeEnd: "",
    penaltyDescription: "",
    launchDate: "",
    availabilityStatus: "Available",
    penaltyEnabled: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Lending Service Data:", formData);
    // You can add further form submission logic here, like API calls.
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Service Name</label>
                <input
                  name="serviceName"
                  type="text"
                  className="form-control"
                  value={formData.serviceName}
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
                  name="resourceName"
                  type="text"
                  className="form-control"
                  value={formData.resourceName}
                  onChange={handleChange}
                  placeholder="Enter resource name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Number of Available Resources</label>
                <input
                  name="availableResources"
                  type="number"
                  className="form-control"
                  value={formData.availableResources}
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
                  <option value="Educational Resources">Educational Resources</option>
                  <option value="Audio-Visual Equipment">Audio-Visual Equipment</option>
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
                    name="dayStart"
                    type="date"
                    className="form-control"
                    value={formData.dayStart}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Available Until (Day)</label>
                  <input
                    name="dayEnd"
                    type="date"
                    className="form-control"
                    value={formData.dayEnd}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label">Time Start</label>
                  <input
                    name="timeStart"
                    type="time"
                    className="form-control"
                    value={formData.timeStart}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label">Time End</label>
                  <input
                    name="timeEnd"
                    type="time"
                    className="form-control"
                    value={formData.timeEnd}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3 form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={formData.penaltyEnabled}
                  onChange={handleChange}
                  id="penaltySwitch"
                  name="penaltyEnabled"
                />
                <label className="form-check-label" htmlFor="penaltySwitch">
                  Penalty Policy: {formData.penaltyEnabled ? "Enabled" : "Disabled"}
                </label>
              </div>

              {formData.penaltyEnabled && (
                <div className="mb-3">
                  <label className="form-label">Penalty Description</label>
                  <textarea
                    name="penaltyDescription"
                    className="form-control"
                    rows="2"
                    value={formData.penaltyDescription}
                    onChange={handleChange}
                    placeholder="Describe penalty policy"
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Launch Date</label>
                <input
                  name="launchDate"
                  type="date"
                  className="form-control"
                  value={formData.launchDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Availability Status</label>
                <select
                  name="availabilityStatus"
                  className="form-select"
                  value={formData.availabilityStatus}
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
