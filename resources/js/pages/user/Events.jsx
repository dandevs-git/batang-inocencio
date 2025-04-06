import React, { useState, useEffect } from "react";
import Carousel from "../../component/Caroucel";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const { id, title, registration_period, details, date, image, data_date } =
    event;
  return (
    <div
      className="event-card card border-0 shadow-lg rounded-4 mb-4"
      data-date={data_date}
    >
      <div className="row g-0 align-items-stretch">
        <div className="col-md-2">
          <img
            src={`/storage/images/${image}`}
            className="w-100 h-100 object-fit-cover rounded-start"
            alt="Event Image"
          />
        </div>
        <div className="col-md-8 d-flex flex-column p-4">
          <div>
            <h5 className="card-title fw-bold">{title}</h5>
            <p className="small text-muted fw-bold">
              Registration Period:{" "}
              <span className="date">{registration_period}</span>
            </p>
            <ul className="ps-3 mb-2">
              {details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="d-flex align-items-center mt-auto">
            <Link to={'#'} className="fw-bold text-primary text-decoration-none">
              View details
            </Link>
            <Link
              to={`/events/${id}`}
              className="btn btn-primary rounded-pill register-btn ms-auto px-5"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="col-md-2 d-flex align-items-center p-3">
          <div className="h-100 w-100 shadow rounded-4 bg-opacity-50 text-dark d-flex justify-content-center align-items-center flex-column fw-bold py-3">
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

const carousel = [
  {
    image: "/storage/images/Carousel2.png",
    title: "Youth Events & Activities",
    description:
      "Join our various programs to develop your skills and talents.",
  },
  {
    image: "/storage/images/Carousel1.png",
    title: "Welcome to Batang Inocencio",
    description:
      "Empowering the youth through leadership and community service.",
  },
  {
    image: "/storage/images/Carousel3.png",
    title: "Be a Part of the Change",
    description: "Engage with the community and make a difference.",
  },
  {
    image: "no-image",
    title: "Sample Placeholder",
    description:
      "Displays a placeholder image when no actual image is available",
  },
];

const events = [
  {
    id: "1",
    data_date: "2025-04",
    image: "Event2.png",
    title: "Knock-Knock, Who’s Hair?",
    registration_period: "April 12 - 15, 2025",
    details: [
      "Tradition Homes Ph2 Court Subdivision | 2:00PM",
      "April 15, 2025 (Sunday)",
    ],
    date: "2025-04-17",
    description: `Ito na yun Batang Inocencio! Date ba kamo? For single or for couple? Syempre sagot na namin yan! Join us for the first-ever event of Sangguniang Kabataan...`,
  },
  {
    id: "2",
    data_date: "2025-04",
    image: "Event2.png",
    title: "Another Event Title",
    registration_period: "April 20 - 23, 2025",
    details: ["Another Venue | 3:00PM", "April 23, 2025 (Wednesday)"],
    date: "2025-04-23",
    description: `Ito na yun Batang Inocencio! Date ba kamo? For single or for couple? Syempre sagot na namin yan! Join us for the first-ever event of Sangguniang Kabataan...`,
  },
  {
    id: "3",
    data_date: "2025-04",
    image: "Event2.png",
    title: "Knock-Knock, Who’s Hair?",
    registration_period: "April 12 - 15, 2025",
    details: [
      "Tradition Homes Ph2 Court Subdivision | 2:00PM",
      "April 15, 2025 (Sunday)",
    ],
    date: "2025-04-17",
    description: `Ito na yun Batang Inocencio! Date ba kamo? For single or for couple? Syempre sagot na namin yan! Join us for the first-ever event of Sangguniang Kabataan...`,
  },
  {
    id: "4",
    data_date: "2025-04",
    image: "Event2.png",
    title: "Another Event Title",
    registration_period: "April 20 - 23, 2025",
    details: ["Another Venue | 3:00PM", "April 23, 2025 (Wednesday)"],
    date: "2025-04-23",
    description: `Ito na yun Batang Inocencio! Date ba kamo? For single or for couple? Syempre sagot na namin yan! Join us for the first-ever event of Sangguniang Kabataan...`,
  },
];

function Events() {
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [eventsList, setEventsList] = useState(events);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    setSelectedMonthYear(`${year}-${month}`);
  }, []);

  const getEventSelectedMonthYear = () => {
    const filteredEvents = eventsList.filter(
      (event) => event.data_date === selectedMonthYear
    );
    return filteredEvents;
  };

  const handleMonthYearChange = (e) => {
    setSelectedMonthYear(e.target.value);
  };

  const filteredEvents = getEventSelectedMonthYear();
  const hasEvents = filteredEvents.length > 0;

  const isEventsPage = location.pathname.endsWith("events");

  return (
    <>
      {isEventsPage && <Carousel carouselItems={carousel} />}
      <div className="container pb-5">
        {isEventsPage && (
          <div className="input-group mb-4" style={{ maxWidth: "300px" }}>
            <input
              type="month"
              className="form-control"
              value={selectedMonthYear}
              onChange={handleMonthYearChange}
            />
            <button
              className="btn btn-primary"
              onClick={getEventSelectedMonthYear}
            >
              Filter
            </button>
          </div>
        )}

        {!window.location.pathname.includes("events") && (
          <div className="container text-center my-5">
            <h5 className="section-title text-primary">Upcoming Events</h5>
            <h2 className="main-heading mt-3 text-dark">
              Stay Updated with the Latest <br /> Events & Activities
            </h2>
            <p className="sub-text mt-3">
              Be part of the latest events, community projects, and exciting
              activities. Check back for important announcements and
              registration details. Stay connected with the events organized by
              the Sangguniang Kabataan (SK) of Barangay Inocencio.
            </p>
          </div>
        )}

        <div className="container">
          {hasEvents ? (
            filteredEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))
          ) : (
            <div id="noEventsMessage" className="text-center text-muted">
              <p>No events found for the selected month and year.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Events;
