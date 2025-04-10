import React from "react";
import { useParams, Link } from "react-router-dom";

const eventsList = [
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

function EventDetail() {
  const { id } = useParams();
  const event = eventsList.find((item) => item.id === id);

  if (!event) {
    return (
      <div className="container text-center my-5">
        <h3 className="text-danger">Event not found</h3>
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline-primary"
        >
          Go back to the previous page
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row px-3">
        <div className="col-8 px-3">
          <h1>{event.title}</h1>
          <p className="text-muted ps-2">Date: {event.date}</p>
          <img
            src={`/storage/images/${event.image}`}
            className="rounded-4 border shadow-lg object-fit-cover w-100"
            alt={event.title}
            width="100%" // Adjust width to fit layout
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
          <button
            className="btn btn-outline-dark"
            onClick={() => window.history.back()}
          >
            <i className="bi bi-arrow-left"></i> Go Back
          </button>
        </div>

        <div className="col-4 px-3">
          <div className="card shadow-lg mb-4">
            <div className="card-header text-center py-3">
              <h5 className="mb-1 fw-semibold text-uppercase">Event Details</h5>
              <p className="text-muted small m-0">
                Registration Period: {event.registration_period}
              </p>
            </div>
            <div className="card-body">
              <div className="px-2">
                <p>
                  <i className="bi bi-calendar-event"></i>{" "}
                  <strong>DATE:</strong> <span>{event.date}</span>
                </p>
                <p>
                  <i className="bi bi-clock"></i> <strong>TIME:</strong>{" "}
                  <span>{event.details[0]}</span>
                </p>
                <p>
                  <i className="bi bi-geo-alt"></i> <strong>PLACE:</strong>{" "}
                  <span>{event.details[1]}</span>
                </p>
              </div>

              <div className="mt-4">
                <h6>
                  <i className="bi bi-list-check"></i>{" "}
                  <strong>Requirements:</strong>
                </h6>
                <ul className="list-unstyled px-2">
                  <li className="mb-1">
                    <i className="bi bi-check-lg text-success"></i> Youth aged
                    18 - 30
                  </li>
                  <li className="mb-1">
                    <i className="bi bi-check-lg text-success"></i> Registered
                    on Youth Profiling Form
                  </li>
                </ul>
              </div>

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
