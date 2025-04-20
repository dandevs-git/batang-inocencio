import React, { useState } from "react";
import Breadcrumb from "../ui/Breadcrumb";

function FacilityReservationServiceForm() {
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    availableFacilities: "",
    timeslotDuration: "30 minutes",
    maxReservationPerTimeslot: "",
    startTime: "",
    endTime: "",
    reservationType: "Individual",
    individualsPerReservation: "",
    minGroupSize: "",
    maxGroupSize: "",
    bookingWindow: "",
    penaltyDescription: "",
    launchDate: "",
    availabilityStatus: "Available",
  });

  const [timeslotEnabled, setTimeslotEnabled] = useState(true);
  const [penaltyEnabled, setPenaltyEnabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted formData:", {
      ...formData,
      timeslotEnabled,
      penaltyEnabled,
    });
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
                <label className="form-label">Number of Available Facility(s)</label>
                <input
                  name="availableFacilities"
                  type="number"
                  className="form-control"
                  value={formData.availableFacilities}
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
                  Timeslot Management: {timeslotEnabled ? "Enabled" : "Disabled"}
                </label>
              </div>

              {timeslotEnabled && (
                <div className="row mb-3">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Timeslot Duration</label>
                    <select
                      name="timeslotDuration"
                      className="form-select"
                      value={formData.timeslotDuration}
                      onChange={handleChange}
                    >
                      <option>30 minutes</option>
                      <option>1 hour</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Max Reservation per Timeslot</label>
                    <input
                      name="maxReservationPerTimeslot"
                      type="number"
                      className="form-control"
                      value={formData.maxReservationPerTimeslot}
                      onChange={handleChange}
                      placeholder="e.g. 10"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Start Time</label>
                    <input
                      name="startTime"
                      type="time"
                      className="form-control"
                      value={formData.startTime}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">End Time</label>
                    <input
                      name="endTime"
                      type="time"
                      className="form-control"
                      value={formData.endTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Reservation Type</label>
                <select
                  name="reservationType"
                  className="form-select"
                  value={formData.reservationType}
                  onChange={handleChange}
                >
                  <option value="Individual">Individual</option>
                  <option value="Group">Group</option>
                </select>
              </div>

              {formData.reservationType === "Individual" ? (
                <div className="mb-3">
                  <label className="form-label">Number of Individuals Per Reservation</label>
                  <input
                    name="individualsPerReservation"
                    type="number"
                    className="form-control"
                    value={formData.individualsPerReservation}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                  />
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <label className="form-label">Minimum Group Size</label>
                    <input
                      name="minGroupSize"
                      type="number"
                      className="form-control"
                      value={formData.minGroupSize}
                      onChange={handleChange}
                      placeholder="e.g. 2"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Maximum Group Size</label>
                    <input
                      name="maxGroupSize"
                      type="number"
                      className="form-control"
                      value={formData.maxGroupSize}
                      onChange={handleChange}
                      placeholder="e.g. 10"
                    />
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">Maximum Booking Window</label>
                <input
                  name="bookingWindow"
                  type="text"
                  className="form-control"
                  value={formData.bookingWindow}
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
                  name="penaltyDescription"
                  className="form-control"
                  rows="3"
                  value={formData.penaltyDescription}
                  onChange={handleChange}
                  placeholder="Describe penalty policy here..."
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Launch Date</label>
                <input
                  name="launchDate"
                  type="date"
                  className="form-control"
                  value={formData.launchDate}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Availability Status</label>
                <select
                  name="availabilityStatus"
                  className="form-select"
                  value={formData.availabilityStatus}
                  onChange={handleChange}
                >
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn text-light btn-primary btn-lg">
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
