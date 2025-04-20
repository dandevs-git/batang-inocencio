import { useState, useEffect } from "react";
import Carousel from "../../component/Caroucel";
import { useAPI } from "../../component/contexts/ApiContext";
import ComputerRentCalendar from "../../component/ComputerRentCalendar";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

function Services() {
  const { getData } = useAPI();
  const [carouselItems, setCarouselItems] = useState([]);
  const [pcAvailability, setPcAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [selectedPC, setSelectedPC] = useState(null);
  const [reservationTimes, setReservationTimes] = useState([]);

  useEffect(() => {
    getData("carousel?page=home", setCarouselItems, setLoading, setError);
    getData(
      "available-resources/computer",
      setPcAvailability,
      setLoading,
      setError
    );
  }, [getData]);

  const handleCardClick = (pc) => {
    setSelectedPC(pc);
    const times = [
      { time: "09:00 AM", reserved: false },
      { time: "10:00 AM", reserved: true },
      { time: "11:00 AM", reserved: false },
      { time: "12:00 PM", reserved: true },
      { time: "01:00 PM", reserved: false },
    ];
    setReservationTimes(times);

    const modal = new Modal(document.getElementById("reservationModal"));
    modal.show();
  };

  return (
    <>
      <Carousel carouselItems={carouselItems} />

      <div className="container mt-5 pb-5" id="calendar-section">
        <ComputerRentCalendar />
      </div>

      {console.log(pcAvailability)}

      <div className="container mt-5 pb-5">
        <div className="row g-4 justify-content-center">
          {pcAvailability.map((pc, index) => (
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

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="reservationModal"
        tabIndex="-1"
        aria-labelledby="reservationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="reservationModalLabel">
                {selectedPC
                  ? `Reservations for ${selectedPC.name}`
                  : "Reservation Times"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {reservationTimes.length === 0 ? (
                <p>No reservations found.</p>
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
                      {slot.time}
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
    </>
  );
}

export default Services;
