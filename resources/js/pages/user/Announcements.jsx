import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

function Announcements({ isFullPage = false }) {
  const [filterDate, setFilterDate] = useState("");
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  useEffect(() => {
    if (isFullPage) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const defaultFilter = `${year}-${month}`;
      setFilterDate(defaultFilter);
      filterAnnouncements(defaultFilter);
    } else {
      setFilteredAnnouncements(announcementList);
    }
  }, [isFullPage]);

  const filterAnnouncements = (selected) => {
    const filtered = announcementList.filter((a) => a.data_date === selected);
    setFilteredAnnouncements(filtered);
  };

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setFilterDate(selected);
    filterAnnouncements(selected);
  };

  return (
    <div className="container pb-5">
      {isFullPage ? (
        <div className="input-group mb-4" style={{ maxWidth: "300px" }}>
          <input
            type="month"
            className="form-control"
            value={filterDate}
            onChange={handleFilterChange}
          />
          <button
            className="btn btn-primary"
            onClick={() => filterAnnouncements(filterDate)}
          >
            Filter
          </button>
        </div>
      ) : (
        <div className="container text-center my-5">
          <h5 className="section-title text-primary">Announcements</h5>
          <h2 className="main-heading mt-3 text-dark">
            Important Updates & Notices
          </h2>
          <p className="sub-text mt-3">
            Stay updated with the latest announcements, important reminders, and
            community notices.
          </p>
        </div>
      )}

      <div className="row g-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement, index) => (
            <div className="col-3 announcement-card" key={index}>
              <div className="card rounded-3 shadow-lg border-0 h-100 d-flex flex-column">
                <img
                  src={`/storage/images/${announcement.image}`}
                  className="card-img-top rounded-top-3 object-fit-cover"
                  alt="Announcement"
                  style={{ height: "160px" }}
                />
                <div className="card-body d-flex flex-column h-100 p-3">
                  <p className="announcement-date small text-uppercase">
                    {new Date(announcement.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h5 className="card-title">{announcement.title}</h5>
                  <p className="card-text flex-grow-1">
                    {announcement.description.slice(0, 100)}...
                  </p>
                  <div className="mt-auto mb-3">
                    <Link
                      to={`/announcements/${index + 1}`}
                      className="btn btn-primary rounded-pill px-4 py-1 read-more-btn"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">
            <p>No announcements found for the selected month and year.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Announcements;
