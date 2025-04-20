import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAPI } from "../../component/contexts/ApiContext";

// const eventsList = [
//   {
//     id: "1",
//     data_date: "2025-04",
//     image: "Event2.png",
//     title: "Knock-Knock, Who’s Hair?",
//     registration_period: "April 12 - 15, 2025",
//     details: [
//       "Tradition Homes Ph2 Court Subdivision | 2:00PM",
//       "April 15, 2025 (Sunday)",
//     ],
//     date: "2025-04-17",
//     description: `Ito na yun Batang Inocencio! Date ba kamo? For single or for couple? Syempre sagot na namin yan! Join us for the first-ever event of Sangguniang Kabataan...`,
//   },
//   {
//     id: "2",
//     data_date: "2025-04",
//     image: "Event2.png",
//     title: "Another Event Title",
//     registration_period: "April 20 - 23, 2025",
//     details: ["Another Venue | 3:00PM", "April 23, 2025 (Wednesday)"],
//     date: "2025-04-23",
//     description: `Ito na yun Batang Inocencio! Date ba kamo? For single or for couple? Syempre sagot na namin yan! Join us for the first-ever event of Sangguniang Kabataan...`,
//   },
//   {
//     id: "3",
//     data_date: "2025-04",
//     image: "Event2.png",
//     title: "Knock-Knock, Who’s Hair?",
//     registration_period: "April 12 - 15, 2025",
//     details: [
//       "Tradition Homes Ph2 Court Subdivision | 2:00PM",
//       "April 15, 2025 (Sunday)",
//     ],
//     date: "2025-04-17",
//     description: `Ito na yun Batang Inocencio! Date ba kamo? For single or for couple? Syempre sagot na namin yan! Join us for the first-ever event of Sangguniang Kabataan...`,
//   },
//   {
//     id: "4",
//     data_date: "2025-04",
//     image: "Event2.png",
//     title: "Another Event Title",
//     registration_period: "April 20 - 23, 2025",
//     details: ["Another Venue | 3:00PM", "April 23, 2025 (Wednesday)"],
//     date: "2025-04-23",
//     description: `Ito na yun Batang Inocencio! Date ba kamo? For single or for couple? Syempre sagot na namin yan! Join us for the first-ever event of Sangguniang Kabataan...`,
//   },
// ];

function EventDetail() {
  const { getData } = useAPI();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [event, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`events/${id}`, setLoading, setError);
      setEvents(data);
    };
    fetchData();
  }, []);

  if (!event) {
    return (
      // <div className="container text-center my-5">
      //   <h3 className="text-danger">Event not found</h3>
      //   <button
      //     onClick={() => window.history.back()}
      //     className="btn btn-outline-primary"
      //   >
      //     Go back to the previous page
      //   </button>
      // </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <div className="spinner-border text-primary mb-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted fw-semibold">Fetching data, please wait...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row px-3">
        <div className="col-8 px-3">
          <h1>{event.title}</h1>
          <p className="text-muted ps-2">
            Date:{" "}
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            at {event.time}
          </p>
          <img
            src={
              event.image && event.image.startsWith("http")
                ? event.image
                : `/storage/${event.image || "placeholder.png"}`
            }
            className="rounded-4 border shadow-lg object-fit-cover w-100"
            alt={event.title}
          />
          <div className="fs-3 mt-3">
            <Link
              to={"#"}
              className="bi bi-facebook"
              style={{ color: "#1877F2" }}
              aria-label="Share on Facebook"
            ></Link>
            <Link
              to={"#"}
              className="bi bi-instagram"
              style={{ color: "#E4405F" }}
              aria-label="Share on Instagram"
            ></Link>
            <Link
              to={"#"}
              className="bi bi-twitter"
              style={{ color: "#1DA1F2" }}
              aria-label="Share on Twitter"
            ></Link>
          </div>
          <p
            className="p-3 lead"
            style={{ textIndent: "50px", textAlign: "justify" }}
          >
            {event.description}
          </p>
          <Link to={"/"} className="btn btn-outline-dark">
            <i className="bi bi-arrow-left"></i> Go to Home Page
          </Link>
        </div>

        <div className="col-4 px-3">
          <div className="card shadow-lg mb-4">
            <div className="card-header text-center py-3">
              <h5 className="mb-1 fw-semibold text-uppercase">Event Details</h5>
              <p className="text-muted small m-0">
                Registration:{" "}
                {new Date(event.registration_start_date).toLocaleDateString()} -{" "}
                {new Date(event.registration_end_date).toLocaleDateString()}
              </p>
            </div>
            <div className="card-body">
              <div className="px-2">
                <p>
                  <i className="bi bi-calendar-event"></i>{" "}
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p>
                  <i className="bi bi-clock"></i> <strong>Time:</strong>{" "}
                  {event.time}
                </p>
                <p>
                  <i className="bi bi-geo-alt"></i> <strong>Location:</strong>{" "}
                  {event.location}
                </p>
                <p>
                  <i className="bi bi-person-workspace"></i>{" "}
                  <strong>Organizer:</strong> {event.event_organizer}
                </p>
                <p>
                  <i className="bi bi-people"></i>{" "}
                  <strong>Max Participants:</strong>{" "}
                  {event.number_of_participants}
                </p>
                <p>
                  <i className="bi bi-telephone"></i> <strong>Contact:</strong>{" "}
                  {event.contact_number}
                </p>
                <p>
                  <i className="bi bi-tags"></i> <strong>Type:</strong>{" "}
                  {event.event_type} ({event.registration_type})
                </p>
              </div>

              {event.requirements && (
                <div className="mt-4">
                  <h6>
                    <i className="bi bi-list-check"></i>{" "}
                    <strong>Requirements:</strong>
                  </h6>
                  <ul className="list-unstyled px-2">
                    {event.requirements.split("\n").map((req, index) => (
                      <li key={index} className="mb-1">
                        <i className="bi bi-check-lg text-success"></i> {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                to={`/registration/${event.id}`}
                className="btn btn-primary w-100"
              >
                <i className="bi bi-pencil-square"></i> Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
