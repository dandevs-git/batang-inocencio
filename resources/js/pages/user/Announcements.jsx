import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAPI } from "../../component/contexts/ApiContext";

function Announcements({ isFullPage = false }) {
  const { getData } = useAPI();
  const [announcementList, setAnnouncementList] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const defaultFilter = `${year}-${month}`;
    setFilterDate(defaultFilter);

    const fetchData = async () => {
      await getData("announcements", (data) => {
        // Sort by date descending
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        setAnnouncementList(sorted);

        if (isFullPage) {
          // Filter by selected month (YYYY-MM)
          const filtered = sorted.filter((a) => a.data_date === defaultFilter);
          setFilteredAnnouncements(filtered);
        } else {
          // Show latest 4 only
          setFilteredAnnouncements(sorted.slice(0, 4));
        }
      }, setLoading, setError);
    };

    fetchData();
  }, [getData, isFullPage]);

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setFilterDate(selected);

    const filtered = announcementList.filter((a) => a.data_date === selected);
    setFilteredAnnouncements(filtered);
  };

  const handleManualFilter = () => {
    const filtered = announcementList.filter((a) => a.data_date === filterDate);
    setFilteredAnnouncements(filtered);
  };

  if (loading) return null;
  if (error) return <div className="text-danger text-center">Failed to load announcements.</div>;

  return (
    <div className="container p-5">
      {isFullPage ? (
        <div className="input-group mb-4" style={{ maxWidth: "300px" }}>
          <input
            type="month"
            className="form-control"
            value={filterDate}
            onChange={handleFilterChange}
          />
          <button className="btn btn-primary" onClick={handleManualFilter}>
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
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <div className="card rounded-3 shadow-lg border-0 h-100 d-flex flex-column">
                <img
                  src={
                    announcement.image
                      ? `/storage/images/${announcement.image}`
                      : "/storage/images/placeholder.png"
                  }
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
                      to={`/announcements/${announcement.id}`}
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
            <p>No announcements found{isFullPage && " for this period"}.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Announcements;
