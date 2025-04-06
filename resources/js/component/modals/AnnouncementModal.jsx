import React from "react";
import { Link } from "react-router-dom";

const announcements = [
  {
    id: 1,
    title: "HARVEST FESTIVAL 2023",
    date: "AUGUST 16, 2023",
    image: "/storage/images/Announcement1.png",
    description: `“Invest in your hair. It’s the crown you never take off.” 
      Sa huling pagkatok ng Batang Inocencio ay pinagbuksan ito para sa 
      proyektong “Knock-knock, Who’s hair?” na ....`,
  },
  {
    id: 2,
    title: "HARVEST FESTIVAL 2023",
    date: "AUGUST 16, 2023",
    image: "/storage/images/Announcement1.png",
    description: `“Invest in your hair. It’s the crown you never take off.” 
      Sa huling pagkatok ng Batang Inocencio ay pinagbuksan ito para sa 
      proyektong “Knock-knock, Who’s hair?” na ....`,
  },
];

function AnnouncementModal() {
  return (
    <>
      <div
        className="modal fade"
        id="announcement_modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="announcementModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="announcementModalLabel">
                Announcements
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container mb-5">
                <div className="row g-5">
                  {announcements.map((announcement) => (
                    <div className="col-12" key={announcement.id}>
                      <div className="card shadow">
                        <img
                          src={announcement.image}
                          className="card-img-top object-fit-fill"
                          alt={announcement.title}
                        />
                        <div className="card-body">
                          <p className="small">{announcement.date}</p>
                          <h5 className="card-title">{announcement.title}</h5>
                          <p className="card-text">
                            {announcement.description}
                          </p>
                          <Link to={'#'} className="btn btn-primary">
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success text-light"
                data-bs-dismiss="modal"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnnouncementModal;
