import React, { useState } from "react";
import Breadcrumb from "../ui/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../contexts/ApiContext";

function VolunteerManagementServiceForm() {
  const { postData } = useAPI();
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null); 
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    category: "Community Service",
    location: "",
    start_date: "",
    end_date: "",
    contact_person: "",
    contact_number: "",
    contact_email: "",
    volunteer_requirements: "",
    penalty_description: "",
    launch_date: "",
    availability_status: "Available",
  });
  const navigate = useNavigate()

  const [penaltyEnabled, setPenaltyEnabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        available_facilities: "",
        timeslot_duration: "30 minutes",
        max_reservation_per_timeslot: "",
        start_time: "",
        end_time: "",
        reservation_type: "Individual",
        individuals_per_reservation: "",
        min_group_size: "",
        max_group_size: "",
        booking_window: "",
        penalty_description: "",
        launch_date: "",
        availability_status: "Available",
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
            <h4 className="mb-0">Volunteer Management Service</h4>
          </div>
          <div className="card-body">
            <form noValidate onSubmit={handleSubmit}>
              {/* Service Name */}
              <div className="mb-3">
                <label className="form-label">Service Name</label>
                <input
                  name="serviceN\ame"
                  type="text"
                  className="form-control"
                  value={formData.service_name}
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
                    name="start_date"
                    type="date"
                    className="form-control"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">End Date</label>
                  <input
                    name="end_date"
                    type="date"
                    className="form-control"
                    value={formData.end_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Contact Person */}
              <div className="mb-3">
                <label className="form-label">Contact Person</label>
                <input
                  name="contact_person"
                  type="text"
                  className="form-control"
                  value={formData.contact_person}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>

              {/* Contact Number */}
              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input
                  name="contact_number"
                  type="tel"
                  className="form-control"
                  value={formData.contact_number}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                />
              </div>

              {/* Contact Email */}
              <div className="mb-3">
                <label className="form-label">Contact Email</label>
                <input
                  name="contact_email"
                  type="email"
                  className="form-control"
                  value={formData.contact_email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                />
              </div>

              {/* Volunteer Requirements */}
              <div className="mb-3">
                <label className="form-label">Volunteer Requirements</label>
                <textarea
                  name="volunteer_requirements"
                  className="form-control"
                  rows="3"
                  value={formData.volunteer_requirements}
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
                    name="penalty_description"
                    className="form-control"
                    rows="3"
                    value={formData.penalty_description}
                    onChange={handleChange}
                    placeholder="Describe penalty policy here..."
                  />
                </div>
              )}

              {/* Launch Date */}
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

              {/* Availability Status */}
              <div className="mb-4">
                <label className="form-label">Availability Status</label>
                <select
                  name="availability_status"
                  className="form-select"
                  value={formData.availability_status}
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
