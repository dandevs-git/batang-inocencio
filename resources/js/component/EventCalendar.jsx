import React, { useState, useEffect } from "react";
import CustomCalendar from "./CustomCalendar";
import { useAPI } from "./contexts/ApiContext";

function EventCalendar() {
  const [value, setValue] = useState(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getData } = useAPI();

  useEffect(() => {
    const fetchEventsByDate = async () => {
      const selectedDate = value.toLocaleDateString("en-CA");
      console.log(selectedDate);

      await getData(
        `/events?date=${selectedDate}`,
        setSelectedDateEvents,
        setLoading
      );
    };
    fetchEventsByDate();
  }, [value]);

  return (
    <div className="mb-5" id="calendar-section">
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card rounded-4 shadow-lg border-0 h-100">
            <div className="card-header bg-gradient bg-primary text-white text-center rounded-top-4 py-3">
              <h2 className="mb-0 fw-bold">Events Calendar</h2>
            </div>
            <div className="card-body p-4">
              <CustomCalendar onChange={setValue} value={value} />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card rounded-4 shadow-lg border-0 h-100">
            <div className="card-header bg-gradient bg-primary text-white text-center rounded-top-4 py-3">
              <h4 className="mb-0 fw-semibold">
                {value.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
            </div>
            <div className="card-body p-4">
              {loading ? (
                <div
                  className="d-flex flex-column justify-content-center align-items-center calendar-loading-overlay"
                  style={{ minHeight: "400px" }}
                >
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-muted fw-semibold">
                    Loading calendar events...
                  </p>
                </div>
              ) : (
                <>
                  {selectedDateEvents.length === 0 ? (
                    <div className="text-center text-muted fst-italic">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                        alt="No events"
                        style={{ width: "80px", opacity: 0.4 }}
                        className="mb-3"
                      />
                      <p>No events for this date.</p>
                    </div>
                  ) : (
                    <ul className="list-group list-group-flush">
                      {selectedDateEvents.map((event, index) => (
                        <li
                          key={index}
                          className="list-group-item d-flex align-items-center border-0 px-4"
                        >
                          <div className="flex-grow-1">
                            <h6 className="mb-0 fw-semibold">{event.title}</h6>
                            {event.time && (
                              <small className="text-muted">{event.time}</small>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCalendar;
