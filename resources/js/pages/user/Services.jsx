import { useState, useEffect } from "react";
import Carousel from "../../component/Caroucel";
import CustomCalendar from "../../component/CustomCalendar";

const pcAvailability = [
  { name: "PC-1", status: "full" },
  { name: "PC-2", status: "available" },
  { name: "PC-3", status: "available" },
  { name: "PC-4", status: "full" },
  { name: "PC-5", status: "full" },
  { name: "PC-6", status: "available" },
  { name: "PC-7", status: "available" },
  { name: "PC-8", status: "full" },
];

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

function Services() {
  const [value, onChange] = useState(new Date());
  const [todayEvents, setTodayEvents] = useState([]);

  useEffect(() => {
    const fetchTodayEvents = async () => {
      // const response = await fetch("/public/fetch_events.php"); // replace with the actual endpoint
      // const events = await response.json();
      // const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
      // setTodayEvents(events.filter((event) => event.start === today));
    };

    fetchTodayEvents();
  }, []);

  return (
    <>
      <Carousel carouselItems={carousel} />

      <div className="container mt-5 pb-5" id="calendar-section">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card rounded-4 shadow-lg ">
              <div className="card-header bg-primary text-white text-center rounded-top-4">
                <h2 className="mb-0 fw-bold">Reservation Calendar</h2>
              </div>
              <div className="card-body p-4">
                <CustomCalendar onChange={onChange} value={value} />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card rounded-4 shadow-lg  h-100">
              <div className="card-header bg-primary text-white text-center rounded-top-4">
                <h4 className="mb-0 fw-bold">Sunday, March 23, 2025</h4>
              </div>
              <div className="card-body">
                <ul id="today-events" className="list-group list-group-flush">
                  {todayEvents.length === 0 ? (
                    <li className="list-group-item text-center text-muted fst-italic">
                      No reserves for today.
                    </li>
                  ) : (
                    todayEvents.map((event, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex align-items-center"
                      >
                        <span className="badge bg-primary me-2">📅</span>{" "}
                        {event.title}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 pb-5">
        <div className="row g-4 justify-content-center">
          {pcAvailability.map((pc, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card text-center shadow-lg  border-0 rounded-4 h-100 hover-shadow">
                <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                  <i
                    className={`bi bi-pc-display display-3 mb-3 ${
                      pc.status === "full" ? "text-danger" : "text-success"
                    }`}
                  ></i>
                  <h5 className="card-title fw-semibold mb-2">{pc.name}</h5>
                  <span
                    className={`badge rounded-pill fs-6 px-3 py-2 ${
                      pc.status === "full"
                        ? "bg-danger-subtle text-danger"
                        : "bg-success-subtle text-success"
                    }`}
                  >
                    {pc.status === "full" ? "Full Slot" : "Available"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;
