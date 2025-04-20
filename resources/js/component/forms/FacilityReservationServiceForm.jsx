import React, { useState } from "react";
import Breadcrumb from "../ui/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../contexts/ApiContext";

function FacilityReservationServiceForm() {
  const { postData } = useAPI();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
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
  const navigate = useNavigate();

  const [timeslotEnabled, setTimeslotEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(true);

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
      navigate("/admin/FacilityReservationServiceForm");
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
            <h4 className="mb-0">Facility Reservation Service</h4>
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
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Number of Available Facility(s)
                </label>
                <input
                  name="available_facilities"
                  type="number"
                  className="form-control"
                  value={formData.available_facilities}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                />
              </div>

              <div className="mb-3 form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={timeslotEnabled}
                  onChange={() => setTimeslotEnabled(!timeslotEnabled)}
                  id="timeslotSwitch"
                />
                <label className="form-check-label" htmlFor="timeslotSwitch">
                  Timeslot Management:{" "}
                  {timeslotEnabled ? "Enabled" : "Disabled"}
                </label>
              </div>

              {timeslotEnabled && (
                <div className="row mb-3">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Timeslot Duration</label>
                    <select
                      name="timeslot_duration"
                      className="form-select"
                      value={formData.timeslot_duration}
                      onChange={handleChange}
                    >
                      <option>30 minutes</option>
                      <option>1 hour</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">
                      Max Reservation per Timeslot
                    </label>
                    <input
                      name="max_reservation_per_timeslot"
                      type="number"
                      className="form-control"
                      value={formData.max_reservation_per_timeslot}
                      onChange={handleChange}
                      placeholder="e.g. 10"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Start Time</label>
                    <input
                      name="start_time"
                      type="time"
                      className="form-control"
                      value={formData.start_time}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">End Time</label>
                    <input
                      name="end_time"
                      type="time"
                      className="form-control"
                      value={formData.end_time}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Reservation Type</label>
                <select
                  name="reservation_type"
                  className="form-select"
                  value={formData.reservation_type}
                  onChange={handleChange}
                >
                  <option value="Individual">Individual</option>
                  <option value="Group">Group</option>
                </select>
              </div>

              {formData.reservation_type === "Individual" ? (
                <div className="mb-3">
                  <label className="form-label">
                    Number of Individuals Per Reservation
                  </label>
                  <input
                    name="individuals_per_reservation"
                    type="number"
                    className="form-control"
                    value={formData.individuals_per_reservation}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                  />
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <label className="form-label">Minimum Group Size</label>
                    <input
                      name="min_group_size"
                      type="number"
                      className="form-control"
                      value={formData.min_group_size}
                      onChange={handleChange}
                      placeholder="e.g. 2"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Maximum Group Size</label>
                    <input
                      name="max_group_size"
                      type="number"
                      className="form-control"
                      value={formData.max_group_size}
                      onChange={handleChange}
                      placeholder="e.g. 10"
                    />
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">Maximum Booking Window</label>
                <input
                  name="booking_window"
                  type="text"
                  className="form-control"
                  value={formData.booking_window}
                  onChange={handleChange}
                  placeholder="e.g. 1 week"
                />
              </div>

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

              <div className="mb-3">
                <label className="form-label">Launch Date</label>
                <input
                  name="launch_date"
                  type="date"
                  className="form-control"
                  value={formData.launch_date}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Availability Status</label>
                <select
                  name="availability_status"
                  className="form-select"
                  value={formData.availability_status}
                  onChange={handleChange}
                >
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn text-light btn-primary btn-lg"
                >
                  Create Facility Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FacilityReservationServiceForm;
