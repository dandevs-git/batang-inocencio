import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useLocation, useNavigate } from "react-router-dom";
import { useAPI } from "../../component/contexts/ApiContext";
import Breadcrumb from "../../component/ui/Breadcrumb";

function OtherServices() {
  const navigate = useNavigate();
  const location = useLocation();
  const slug = location.pathname.split("/").pop();
  const { getData, postData } = useAPI();
  const [value, onChange] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [reservationTimes, setReservationTimes] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [loadingResources, setLoadingResources] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allResources, setAllResources] = useState([]);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    service_name: "",
    resource_number: "",
    time_range: "",
    name: "",
    address: "",
    email: "",
    contact: "",
    reservation_code: "",
  });

  const [error, setError] = useState(null);

  const formattedDate = value.toLocaleDateString("en-CA");

  const timeOptions = [
    { slot: "08:00 AM - 10:00 AM" },
    { slot: "10:00 AM - 12:00 PM" },
    { slot: "01:00 PM - 03:00 PM" },
    { slot: "03:00 PM - 05:00 PM" },
    { slot: "05:00 PM - 07:00 PM" },
  ];

  const slugify = (str) => str.toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    getData("rrs", setServices, setLoadingServices, setError);
    getData(
      "other-services",
      setReservations,
      setLoadingReservations,
      setError
    );
  }, []);

  useEffect(() => {
    if (selectedService) {
      getData(
        `available-resources/rrs/${selectedService.id}`,
        setAllResources,
        setLoadingResources,
        setError
      );
    }
  }, [selectedService]);

  const fetchReservations = async () => {
    try {
      const data = await getData("other-services");
      setReservations(data);
      console.log(data);
    } catch (err) {
      console.error("Fetch reservations failed", err);
    }
  };

  useEffect(() => {
    if (services.length > 0) {
      const matched = services.find(
        (service) => slugify(service.service_name) === slug
      );
      setSelectedService(matched);
    }
  }, [services, slug]);

  useEffect(() => {
    if (selectedResource) {
      const filtered = reservations?.filter(
        (res) => res.resource_number == selectedResource.id
      );
      const updated = timeOptions.map((option) => ({
        ...option,
        reserved: filtered.some((res) => res.time_range === option.slot),
      }));
      setReservationTimes(updated);
    }
  }, [selectedResource, reservations]);

  const handleCardClick = (resource) => {
    setSelectedResource(resource);
    Modal.getOrCreateInstance(
      document.getElementById("availableReservationModal")
    ).show();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSlotClick = (slot) => {
    setFormData((prev) => ({
      ...prev,
      resource_number: selectedResource?.id || "",
      time_range: slot.slot,
    }));

    Modal.getOrCreateInstance(
      document.getElementById("reservationModal")
    ).show();

    Modal.getOrCreateInstance(
      document.getElementById("availableReservationModal")
    ).hide();
  };

  if (loadingServices || loadingReservations || loadingResources) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  const localDate = value.toLocaleDateString("en-CA");

  const filteredResources = allResources.map((resource) => {
    const reservedSlots = reservations
      .filter(
        (res) =>
          res.resource_number == resource.id &&
          res.reservation_date === localDate
      )
      .map((res) => res.time_range);

    const isFull = timeOptions.every((option) =>
      reservedSlots.includes(option.slot)
    );
    return { ...resource, status: isFull ? "full" : "available" };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "reservation_code") data.append(key, value);
    });
    data.append("service_name", selectedService.service_name || "");
    data.append("reservation_date", value.toLocaleDateString("en-CA"));

    try {
      const response = await postData(
        "other-services",
        data,
        null,
        setLoading,
        setError
      );

      const reservationCode = response?.reservation_code || "N/A";

      setFormData((prevData) => ({
        ...prevData,
        reservation_code: reservationCode,
      }));

      await fetchReservations();

      Modal.getInstance(document.getElementById("reservationModal"))?.hide();
      Modal.getOrCreateInstance(document.getElementById("successModal")).show();
    } catch (err) {
      setError(err?.message || "Failed to submit reservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-header text-center bg-primary text-light rounded-top-4">
            <h1 className="text-capitalized fw-semibold">
              {selectedService?.service_name}
            </h1>
          </div>
          <div className="card-body p-5">
            <div className="row g-4 justify-content-center">
              {allResources.map((resource, index) => (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  onClick={() => handleCardClick(resource)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card text-center shadow-lg border-0 rounded-4 h-100 hover-shadow">
                    <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                      <i
                        className={`bi bi-collection-fill display-3 mb-3 ${
                          resource.status === "full"
                            ? "text-danger"
                            : "text-success"
                        }`}
                      ></i>
                      <h5 className="card-title fw-semibold mb-2">
                        {resource.name}
                      </h5>
                      <span
                        className={`badge rounded-pill fs-6 px-3 py-2 ${
                          resource.status === "full"
                            ? "bg-danger-subtle text-danger"
                            : "bg-success-subtle text-success"
                        }`}
                      >
                        {resource.status === "full" ? "Full Slot" : "Available"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="availableReservationModal"
        tabIndex="-1"
        aria-labelledby="reservationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title" id="reservationModalLabel">
                {selectedResource
                  ? `Reservations for ${selectedResource.name}`
                  : "Reservation Times"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {reservationTimes.length === 0 ? (
                <p className="text-center text-muted">
                  <i className="bi bi-info-circle me-2"></i>No time slots
                  available.
                </p>
              ) : (
                <ul className="list-group">
                  {reservationTimes.map((slot, index) => {
                    const reservedRes = reservations?.find((res) => {
                      return (
                        res.resource_number == selectedResource?.id &&
                        res.reservation_date === value &&
                        res.time_range === slot.slot
                      );
                    });
                    

                    return (
                      <li
                        key={index}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                          slot.reserved && !reservedRes
                            ? "list-group-item-danger"
                            : "list-group-item-success"
                        } ${!slot.reserved ? "clickable" : ""}`}
                        style={{
                          cursor:
                            !slot.reserved && reservedRes
                              ? "pointer"
                              : "not-allowed",
                        }}
                        onClick={() => {
                          if (!slot.reserved) {
                            handleSlotClick(slot);
                          }
                        }}
                        disabled={reservedRes}
                      >
                        {slot.slot}
                        <span
                          className={`badge bg-${
                            slot.reserved ? "danger" : "success"
                          }`}
                        >
                          {slot.reserved ? "Reserved" : "Available"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="reservationModal"
        tabIndex="-1"
        aria-labelledby="reservationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="reservationModalLabel">
                Reserve a Resources
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p className="fw-bold mb-4">
                Selected Date:{" "}
                {value.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {error && (
                <div className="alert alert-danger">
                  {typeof error === "string" ? error : "An error occurred."}
                </div>
              )}
              <form
                className="needs-validation"
                ref={formRef}
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Resource Number</label>
                    <select
                      className="form-select"
                      name="resource_number"
                      value={formData.resource_number}
                      onChange={handleInputChange}
                      disabled
                      required
                    >
                      <option value="">-- Select Resource --</option>
                      {filteredResources.map((resource, index) => (
                        <option key={index} value={resource.id}>
                          {resource.name || `Resource ${resource.id}`}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      Please select a Resource.
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Time Range</label>
                    <select
                      className="form-select"
                      name="time_range"
                      value={formData.time_range}
                      onChange={handleInputChange}
                      disabled
                      required
                    >
                      <option value="">-- Select Time Slot --</option>
                      {timeOptions.map((option, index) => (
                        <option key={index} value={option.slot}>
                          {option.slot}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      Please select a Time Slot.
                    </div>

                    <div className="invalid-feedback">
                      Please select a time range.
                    </div>
                  </div>
                </div>

                {["name", "address", "email", "contact"].map((field, index) => (
                  <div className="mb-3" key={index}>
                    <label className="form-label">
                      {field === "contact"
                        ? "Contact Number"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      className="form-control"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid{" "}
                      {field === "contact" ? "contact number" : field}.
                    </div>
                  </div>
                ))}

                <div className="modal-footer px-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Reservation"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        id="successModal"
        aria-labelledby="successModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title" id="successModalLabel">
                Reservation Successful
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Your reservation was successful. Please check your email for
                confirmation.
              </p>
              <p>
                <strong>Reservation Code:</strong>{" "}
                <span className="text-primary">
                  {formData.reservation_code}
                </span>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => setTimeout(() => window.location.reload(), 500)}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtherServices;
