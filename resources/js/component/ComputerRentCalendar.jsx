import { useEffect, useState } from "react";
import { useAPI } from "./contexts/ApiContext";
import CustomCalendar from "./CustomCalendar";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

function ComputerRentCalendar() {
  const { postData, getData } = useAPI();

  const [value, onChange] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validated, setValidate] = useState(false);
  const [error, setError] = useState(null);
  const [reservationTimes, setReservationTimes] = useState([]);
  const [selectedPC, setSelectedPC] = useState(null);
  const [allPCs, setAllPCs] = useState([]);
  const [formData, setFormData] = useState({
    pcNumber: "",
    timeRange: "",
    name: "",
    address: "",
    email: "",
    contact: "",
  });

  const timeOptions = [
    { slot: "08:00 AM - 10:00 AM" },
    { slot: "10:00 AM - 12:00 PM" },
    { slot: "01:00 PM - 03:00 PM" },
    { slot: "03:00 PM - 05:00 PM" },
    { slot: "05:00 PM - 07:00 PM" },
  ];

  // Fetch initial PC list and reservations
  useEffect(() => {
    getData("available-resources/computer", setAllPCs, setLoading, setError);
    getData("computer-services", setReservations, setLoading, setError);
  }, []);

  // Fetch reservations when date changes
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getData("/computer-services");
        setReservations(data);
      } catch (err) {
        console.error("Fetch reservations failed", err);
      }
    };
    fetchReservations();
  }, [value]);

  useEffect(() => {
    if (selectedPC) {
      const filtered = reservations.filter(
        (res) => res.pc_number == selectedPC.id
      );
      const updated = timeOptions.map((option) => ({
        ...option,
        reserved: filtered.some((res) => res.time_range === option.slot),
      }));
      setReservationTimes(updated);
    }
  }, [selectedPC, reservations]);

  const handleCardClick = (pc) => {
    setSelectedPC(pc);
    const modal = new Modal(
      document.getElementById("availableReservationModal")
    );
    modal.show();
  };

  const handleOpenModal = () => {
    const modal = new Modal(document.getElementById("reservationModal"));
    modal.show();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidate(true);
    setError(null);

    const { pcNumber, timeRange, name, email, contact } = formData;
    if (!pcNumber || !timeRange || !name || !email || !contact) return;

    setLoading(true);

    try {
      const payload = {
        pc_number: pcNumber,
        time_range: timeRange,
        name: formData.name,
        address: formData.address,
        email: formData.email,
        contact: formData.contact,
        reservation_date: value.toLocaleDateString("en-CA"),
      };

      await postData("/computer-services", payload);
      const updated = await getData("/computer-services");
      setReservations(updated);
      setFormData({
        pcNumber: "",
        timeRange: "",
        name: "",
        address: "",
        email: "",
        contact: "",
      });
      setValidate(false);

      const modal = Modal.getInstance(
        document.getElementById("reservationModal")
      );
      modal?.hide();
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setError(err?.message || "Failed to submit reservation.");
    } finally {
      setLoading(false);
    }
  };

  const localDate = value.toLocaleDateString("en-CA");
  const filteredPCs = allPCs.map((pc) => {
    const reservedSlots = reservations
      .filter(
        (res) => res.pc_number == pc.id && res.reservation_date === localDate
      )
      .map((res) => res.time_range);

    const isFull = timeOptions.every((option) =>
      reservedSlots.includes(option.slot)
    );
    return { ...pc, status: isFull ? "full" : "available" };
  });

  const reservedDates = reservations.map((r) =>
    new Date(r.reservation_date).toLocaleDateString("en-CA")
  );

  return (
    <>
      <div id="calendar-section">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card rounded-4 shadow-lg border-0 h-100">
              <div className="card-header bg-primary text-white text-center rounded-top-4">
                <h2 className="mb-0 fw-bold">
                  <i className="bi bi-calendar-event me-2" />
                  Computer Rental Calendar
                </h2>
              </div>
              <div className="card-body p-4">
                {console.log(reservedDates)}
                <CustomCalendar
                  onChange={onChange}
                  value={value}
                  eventDates={reservedDates}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card rounded-4 shadow-lg border-0 h-100">
              <div className="card-header bg-primary text-white text-center rounded-top-4">
                <h4 className="mb-0 fw-semibold">
                  {value.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h4>
              </div>
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <ul className="list-group list-group-flush flex-grow-1 mb-3">
                  {filteredPCs.length === 0 ? (
                    <li className="list-group-item text-center text-muted fst-italic">
                      <i className="bi bi-info-circle me-2" />
                      No PCs available.
                    </li>
                  ) : (
                    filteredPCs.map((pc, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center px-3 py-2"
                      >
                        <span className="fw-semibold">{pc.name || pc}</span>
                        <span
                          className={`badge ${
                            pc.status === "full" ? "bg-danger" : "bg-success"
                          }`}
                        >
                          {pc.status === "full" ? "Full Slot" : "Available"}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
                <button
                  className="btn btn-outline-primary w-100 fw-bold"
                  onClick={handleOpenModal}
                >
                  <i className="bi bi-check-circle me-2" />
                  Mark Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 pb-5">
        <div className="row g-4 justify-content-center">
          {filteredPCs.map((pc, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              onClick={() => handleCardClick(pc)}
              style={{ cursor: "pointer" }}
            >
              <div className="card text-center shadow-lg border-0 rounded-4 h-100 hover-shadow">
                <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                  <i
                    className={`bi bi-pc-display display-3 mb-3 ${
                      pc.status === "full" ? "text-danger" : "text-success"
                    }`}
                  ></i>
                  <h5 className="card-title fw-semibold mb-2">{pc.name}</h5>
                  <span
                    className={`badge rounded-pill fs-6 px-3 py-2 ${
                      pc.status === "full"
                        ? "bg-danger-subtle text-danger"
                        : "bg-success-subtle text-success"
                    }`}
                  >
                    {pc.status === "full" ? "Full Slot" : "Available"}
                  </span>
                </div>
              </div>
            </div>
          ))}
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
                {selectedPC
                  ? `Reservations for ${selectedPC.name}`
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
                  {reservationTimes.map((slot, index) => (
                    <li
                      key={index}
                      className={`list-group-item d-flex justify-content-between align-items-center ${
                        slot.reserved
                          ? "list-group-item-danger"
                          : "list-group-item-success"
                      }`}
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
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
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
                Reserve a Computer
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
                className={`needs-validation ${
                  validated ? "was-validated" : ""
                }`}
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">PC Number</label>
                    <select
                      className="form-select"
                      name="pcNumber"
                      value={formData.pcNumber}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Select PC --</option>
                      {filteredPCs.map((pc, index) => (
                        <option key={index} value={pc?.id}>
                          {pc.name || pc}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">Please select a PC.</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Time Range</label>
                    <select
                      className="form-select"
                      name="timeRange"
                      value={formData.timeRange}
                      onChange={handleInputChange}
                      required
                    >
                      <option className="text-dark" value="">
                        -- Select Time --
                      </option>
                      {timeOptions.map((range, index) => {
                        const isReserved = reservations.some(
                          (res) =>
                            res.pc_number === formData.pcNumber &&
                            res.reservation_date ===
                              value.toLocaleDateString("en-CA") &&
                            res.time_range === range.slot
                        );

                        return (
                          <option
                            key={index}
                            value={range.slot}
                            disabled={isReserved}
                          >
                            {range.slot} {isReserved ? "(Reserved)" : ""}
                          </option>
                        );
                      })}
                    </select>
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
    </>
  );
}

export default ComputerRentCalendar;
