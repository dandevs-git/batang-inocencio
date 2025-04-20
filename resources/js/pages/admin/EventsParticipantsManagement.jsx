import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../component/ui/Breadcrumb";
import ParticipantsTable from "../../component/tables/ParticipantsTable";
import { useAPI } from "../../component/contexts/ApiContext";

function EventsParticipantsManagement() {
  const { getData } = useAPI();
  const navigate = useNavigate()
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(false); // Track whether to show the participants table
  const [selectedEventId, setSelectedEventId] = useState(null); // Store the selected event ID

  useEffect(() => {
    getData("events", setEventsData, setLoading, setError);
  }, [getData]);

  const handleEventClick = (eventId) => {
    navigate(`/admin/participants/${eventId}`)
    // setSelectedEventId(eventId);
    // setShowTable(true);
  };

  return (
    <>
      <Breadcrumb />
      <div className="container py-5">
        {loading ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted fw-semibold">Fetching events...</p>
          </div>
        ) : error ? (
          <div className="text-center text-danger fw-semibold">
            <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
          </div>
        ) : eventsData.length > 0 ? (
          <div className="row g-4">
            {eventsData.map((event, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div
                  onClick={() => handleEventClick(event.id)} // When clicking an event, set the selected event and show the table
                  className="card h-100 shadow-sm rounded-4 hover-shadow transition p-4 border-0 shadow-lg"
                >
                  <div className="card-body text-center">
                    <h4 className="fw-bold text-dark">{event?.title}</h4>
                    <p className="text-muted mt-2">
                      Number of Participants:
                      <span className="fw-bold text-primary ms-2">
                        {event?.participants?.length ?? 0}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted fst-italic">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No events"
              style={{ width: "80px", opacity: 0.4 }}
              className="mb-3"
            />
            <p>No events found.</p>
          </div>
        )}

        {showTable && selectedEventId && (
          <ParticipantsTable eventId={selectedEventId} />
        )}
      </div>
    </>
  );
}

export default EventsParticipantsManagement;
