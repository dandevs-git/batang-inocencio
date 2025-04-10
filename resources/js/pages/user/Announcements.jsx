import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAPI } from "../../component/contexts/ApiContext";

function Announcements({ isFullPage = false }) {
  const { getData, postData, putData, deleteData } = useAPI();
  const [filterDate, setFilterDate] = useState("");
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getData("announcements", setFilteredAnnouncements, setLoading, setError);
  }, [getData]);

  useEffect(() => {
    if (isFullPage) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const defaultFilter = `${year}-${month}`;
      setFilterDate(defaultFilter);
      filterAnnouncements(defaultFilter);
    } else {
      setFilteredAnnouncements(filteredAnnouncements);
    }
  }, [isFullPage]);

  const filterAnnouncements = (selected) => {
    const filtered = filteredAnnouncements.filter((a) => a.data_date === selected);
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
              <div className="card rounded-3 shadow-lg  border-0 h-100 d-flex flex-column">
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
            <p>No announcements found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Announcements;
