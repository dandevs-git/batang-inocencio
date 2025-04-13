import React, { useState, useEffect } from "react";
import Carousel from "../../component/Caroucel";
import { Link, useLocation } from "react-router-dom";
import { useAPI } from "../../component/contexts/ApiContext";

const EventsCard = ({ events }) => {
  const { id, title, description, date, image } = events;  

  return (
    <div
      className="events-card card border-0 shadow-lg rounded-4 mb-4"
      data-date={date.substring(0, 7)}
    >
      <div className="row g-0 align-items-stretch">
        <div className="col-md-2">
          <img
            src={
              image ? `/storage/${image}` : "/storage/images/placeholder.png"
            }
            className="w-100 h-100 object-fit-cover rounded-start"
            alt="Events"
          />
        </div>
        <div className="col-md-8 d-flex flex-column p-4">
          <div>
            <h5 className="card-title fw-bold">{title}</h5>
            <p className="small text-muted fw-bold">
              Date:{" "}
              <span className="date">
                {new Date(date).toLocaleDateString()}
              </span>
            </p>
            <p>{description.slice(0, 100)}...</p>
          </div>
          <div className="d-flex align-items-center mt-auto">
            <Link
              to={`/events/${id}`}
              className="fw-bold text-primary text-decoration-none"
            >
              View full events
            </Link>
          </div>
        </div>
        <div className="col-md-2 d-flex align-items-center p-3">
          <div className="h-100 w-100 shadow-lg rounded-4 bg-opacity-50 text-dark d-flex justify-content-center align-items-center flex-column fw-bold py-3">
            <div className="fs-3">
              {new Date(date).toLocaleString("default", { month: "long" })}
            </div>
            <div className="fs-1">{new Date(date).getDate()}</div>
            <div className="fs-3">{new Date(date).getFullYear()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Events({ isFullPage = true }) {
  const { getData } = useAPI();
  const location = useLocation();

  const [eventsList, setEventsList] = useState([]);
    const [carouselItems, setCarouselItems] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

   useEffect(() => {
      getData("carousel?page=events", setCarouselItems, setLoading, setError);
    }, [getData]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const defaultMonth = `${year}-${month}`;
    setSelectedMonth(defaultMonth);

    const fetchData = async () => {
      try {
        const data = await getData("events");
        setEventsList(data);

        if (isFullPage) {
          const filtered = data.filter(
            (events) => events.date.substring(0, 7) === defaultMonth
          );
          setFilteredEvents(filtered);
        } else {
          setFilteredEvents(data.slice(0, 4));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getData, isFullPage]);
  

  const handleMonthChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedMonth(selectedValue);

    const filtered = eventsList.filter(
      (events) => events.date.substring(0, 7) === selectedValue
    );
    console.log(eventsList);
    console.log(filteredEvents);
    
    setFilteredEvents(filtered);
  };

  if (loading) return null;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <>
      {isFullPage && <Carousel carouselItems={carouselItems} />}

      <div className="container pb-5">
        {isFullPage ? (
          <div className="input-group mb-4" style={{ maxWidth: "300px" }}>
            <input
              type="month"
              className="form-control"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
            <button
              className="btn btn-primary"
              onClick={() =>
                handleMonthChange({ target: { value: selectedMonth } })
              }
            >
              Filter
            </button>
          </div>
        ) : (
          <div className="container text-center my-5">
            <h5 className="section-title text-primary">Latest Events</h5>
            <h2 className="main-heading mt-3 text-dark">
              Get the Latest <br /> Events & Announcements
            </h2>
            <p className="sub-text mt-3">
              Stay informed about community projects, public service
              information, and updates from the Sangguniang Kabataan of Barangay
              Inocencio.
            </p>
          </div>
        )}

        <div className="row g-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((events, index) => (
              <EventsCard key={index} events={events} />
            ))
          ) : (
            <div id="noEventsMessage" className="text-center text-muted">
              <p>No events found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Events;
