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
    <div className="container my-5">
      <div className="mb-4">
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline-primary"
        >
          ← Back to Previous Page
        </button>
      </div>

      <div className="card shadow-lg border-0 rounded-4 p-4">
        <img
          src={`/storage/images/${announcement.image}`}
          className="card-img-top rounded-top-4"
          alt="Announcement"
        />
        <h2 className="mb-2">{announcement.title}</h2>
        <p className="text-muted">
          {new Date(announcement.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="mt-4">{announcement.description}</p>
      </div>
    </div>
  );
}

export default AnnouncementDetail;
