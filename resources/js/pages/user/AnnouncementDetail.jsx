import React from "react";
import { useParams, Link } from "react-router-dom";

const announcementList = [
  {
    id: "1",
    date: "2025-04-01",
    data_date: "2025-04",
    title: "Community Meeting: April 2025",
    image: "Announcement1.png",
    description:
      "Join us for an important community meeting to discuss upcoming projects...",
  },
  {
    id: "2",
    date: "2025-03-25",
    data_date: "2025-03",
    title: "Scholarship Application Deadline",
    image: "Announcement1.png",
    description:
      "The deadline for the SK scholarship program applications is fast approaching...",
  },
  {
    id: "3",
    date: "2025-04-01",
    data_date: "2025-04",
    title: "Community Meeting: April 2025",
    image: "Announcement1.png",
    description:
      "Join us for an important community meeting to discuss upcoming projects...",
  },
  {
    id: "4",
    date: "2025-03-25",
    data_date: "2025-03",
    title: "Scholarship Application Deadline",
    image: "Announcement1.png",
    description:
      "The deadline for the SK scholarship program applications is fast approaching...",
  },
];

function AnnouncementDetail() {
  const { id } = useParams();
  const announcement = announcementList.find((item) => item.id === id);

  if (!announcement) {
    return (
      <div className="container text-center my-5">
        <h3 className="text-danger">Announcement not found</h3>
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
          <h1>{announcement.title}</h1>
          <p className="text-muted ps-2">
            Date:{" "}
            {new Date(announcement.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <img
            src={`/storage/images/${announcement.image}`}
            className="rounded-4 border shadow-lg object-fit-cover w-100"
            alt={announcement.title}
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
            {announcement.description}
          </p>
          <Link
            to={'/'}
            className="btn btn-outline-dark"
          >
            <i className="bi bi-arrow-left"></i> Go to Home Page
          </Link>
        </div>

        <div className="col-4 px-3">
          <h5 className="fw-bold">Latest Announcements</h5>

          {announcementList.map((item, index) => (
            <div className="card shadow-lg mb-4" key={item.id || index}>
              <div className="card-body">
                <p className="text-muted">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h5 className="fw-semibold text-uppercase">{item.title}</h5>
                <p>
                  {item.description?.slice(0, 120) || "No preview available..."}
                </p>
                <div className="text-end">
                  <Link
                    to={`/announcements/${item.id}`}
                    className="text-dark link-underline-primary link-offset-2 link-underline link-underline-opacity-50"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnnouncementDetail;
