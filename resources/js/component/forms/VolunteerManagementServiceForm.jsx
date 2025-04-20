import React, { useState } from "react";
import Breadcrumb from "../ui/Breadcrumb";

function VolunteerManagementServiceForm() {
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    category: "Community Service",
    location: "",
    startDate: "",
    endDate: "",
    contactPerson: "",
    contactNumber: "",
    contactEmail: "",
    volunteerRequirements: "",
    penaltyDescription: "",
    launchDate: "",
    availabilityStatus: "Available",
  });

  const [penaltyEnabled, setPenaltyEnabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Volunteer Service:", { ...formData, penaltyEnabled });
  };

  return (
    <>
      <Breadcrumb />
      <div className="container mt-5">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Volunteer Management Service</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Service Name */}
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

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option>Community Service</option>
                  <option>Environmental Projects</option>
                  <option>Educational Programs</option>
                  <option>Event Support</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Location */}
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

              {/* Dates */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Start Date</label>
                  <input
                    name="startDate"
                    type="date"
                    className="form-control"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">End Date</label>
                  <input
                    name="endDate"
                    type="date"
                    className="form-control"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Contact Person */}
              <div className="mb-3">
                <label className="form-label">Contact Person</label>
                <input
                  name="contactPerson"
                  type="text"
                  className="form-control"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>

              {/* Contact Number */}
              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input
                  name="contactNumber"
                  type="tel"
                  className="form-control"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                />
              </div>

              {/* Contact Email */}
              <div className="mb-3">
                <label className="form-label">Contact Email</label>
                <input
                  name="contactEmail"
                  type="email"
                  className="form-control"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                />
              </div>

              {/* Volunteer Requirements */}
              <div className="mb-3">
                <label className="form-label">Volunteer Requirements</label>
                <textarea
                  name="volunteerRequirements"
                  className="form-control"
                  rows="3"
                  value={formData.volunteerRequirements}
                  onChange={handleChange}
                  placeholder="List any requirements for volunteers"
                  required
                />
              </div>

              {/* Penalty Policy */}
              <div className="mb-3 form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={penaltyEnabled}
                  onChange={() => setPenaltyEnabled(!penaltyEnabled)}
                  id="penaltySwitch"
                />
                <label className="form-check-label" htmlFor="penaltySwitch">
                  Penalty Policy: {penaltyEnabled ? "Enabled" : "Disabled"}
                </label>
              </div>

              {/* Penalty Description (Only if penalty is enabled) */}
              {penaltyEnabled && (
                <div className="mb-3">
                  <label className="form-label">Penalty Description</label>
                  <textarea
                    name="penaltyDescription"
                    className="form-control"
                    rows="3"
                    value={formData.penaltyDescription}
                    onChange={handleChange}
                    placeholder="Describe penalty policy here..."
                  />
                </div>
              )}

              {/* Launch Date */}
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

              {/* Availability Status */}
              <div className="mb-4">
                <label className="form-label">Availability Status</label>
                <select
                  name="availabilityStatus"
                  className="form-select"
                  value={formData.availabilityStatus}
                  onChange={handleChange}
                  required
                >
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Create Volunteer Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default VolunteerManagementServiceForm;
