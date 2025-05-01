import React, { useState, useEffect } from "react";
import CustomCalendar from "./CustomCalendar";
import { useAPI } from "./contexts/ApiContext";

function PrintingScheduleCalendar() {
  const [value, onChange] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const { getData } = useAPI();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getData("printing-services");
        setReservations(data);
      } catch (err) {
        console.error("Fetch reservations failed", err);
      }
    };
    fetchReservations();
  }, [value]);

  const reservedDates = reservations.map((r) =>
    new Date(r.reservation_date).toLocaleDateString("en-CA")
  );
  

  return (
    <div className="mb-5" id="calendar-section">
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card rounded-4 shadow-lg">
            <div className="card-header bg-primary text-white text-center rounded-top-4">
              <h2 className="mb-0 fw-bold">Printing Schedule Calendar</h2>
            </div>
            <div className="card-body p-4">
              <CustomCalendar onChange={onChange} value={value} eventDates={reservedDates} />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card rounded-4 shadow-lg h-100">
            <div className="card-header bg-primary text-white text-center rounded-top-4">
              <h4 className="mb-0 fw-bold">
                {value.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
            </div>
            <div className="card-body p-4">
              <ul id="today-rentals" className="list-group list-group-flush">
                {reservations.length === 0 ? (
                  <li className="list-group-item text-center text-muted fst-italic">
                    No pending prints for this day.
                  </li>
                ) : (
                  reservations.map((rental, index) => (
                    <li key={index} className="list-group-item d-flex align-items-center">
                      <span className="badge bg-primary me-2"></span>
                      {rental.title || "Untitled Rental"}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintingScheduleCalendar;
