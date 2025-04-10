import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    eventType: "group",
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
    eventType: "group",
  },
];

const EventRegistration = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const event = eventsList.find((item) => item.id === id);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    contactNumber: "",
    address: "",
    email: "",
    agree: false,
    teamName: "",
    teamCaptain: "",
    teamCaptainAge: "",
    teamCaptainContact: "",
    teamCaptainEmail: "",
    teamMembers: [{ name: "", age: "", contact: "" }],
  });

  useEffect(() => {
    // Bootstrap validation
    (() => {
      "use strict";
      const forms = document.querySelectorAll(".needs-validation");
      Array.from(forms).forEach((form) => {
        form.addEventListener(
          "submit",
          (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (id.startsWith("teamMembers")) {
      const index = parseInt(id.split("-")[1]);
      const updatedTeamMembers = [...formData.teamMembers];
      updatedTeamMembers[index] = {
        ...updatedTeamMembers[index],
        [e.target.name]: value,
      };
      setFormData((prev) => ({
        ...prev,
        teamMembers: updatedTeamMembers,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "", age: "", contact: "" }],
    }));
  };

  // Helper function to format the date in long format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long", // "Monday"
      year: "numeric", // "2025"
      month: "long", // "April"
      day: "numeric", // "23"
    });
  };

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
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-transparent p-0">
          <li className="breadcrumb-item">
            <a href="/events" className="text-primary fw-semibold">
              Events
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/events/${id}`} className="text-primary fw-semibold">
              Details
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Registration
          </li>
        </ol>
      </nav>

      <div className="row px-3">
        <div className="col-md-8 px-3">
          <h1>{event?.title}</h1>
          <p className="text-muted ps-2">{formatDate(event?.date)}</p>
          <div className="card shadow-lg mb-5 rounded-4 w-100">
            <div className="card-body p-5">
              <h2 className="text-center fw-bold mb-4">Registration Form</h2>

              <form
                className="row g-3 needs-validation"
                noValidate
                onSubmit={handleSubmit}
              >
                {event.eventType === "individual" ? (
                  <>
                  <div className="col-md-6">
                    <label
                      htmlFor="lastName"
                      className="form-label"
                      title="Last Name"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      Please enter your last name.
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="firstName"
                      className="form-label"
                      title="First Name"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      Please enter your first name.
                    </div>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="contactNumber" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="contactNumber"
                      required
                      value={formData.contactNumber}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      Please enter a valid contact number.
                    </div>
                  </div>

                  <div className="col-md-8">
                    <label
                      htmlFor="address"
                      className="form-label"
                      title="Address"
                    >
                      Address (House Block/Lot/Street/Barangay/Municipality)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      Please provide your complete address.
                    </div>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address.
                    </div>
                  </div>
                </>


                ) : (
                  <>
                    {/* Team Registration Form */}
                    <div className="col-md-6">
                      <label
                        htmlFor="teamName"
                        className="form-label"
                        title="Team Name"
                      >
                        Team Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="teamName"
                        required
                        value={formData.teamName}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter your team name.
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="teamCaptain"
                        className="form-label"
                        title="Team Captain"
                      >
                        Team Captain
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="teamCaptain"
                        required
                        value={formData.teamCaptain}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter the team captain's name.
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label
                        htmlFor="teamCaptainAge"
                        className="form-label"
                        title="Team Captain Age"
                      >
                        Team Captain Age
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="teamCaptainAge"
                        required
                        value={formData.teamCaptainAge}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter the team captain's age.
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label
                        htmlFor="teamCaptainContact"
                        className="form-label"
                        title="Team Captain Contact Number"
                      >
                        Team Captain Contact
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="teamCaptainContact"
                        required
                        value={formData.teamCaptainContact}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter the team captain's contact number.
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label
                        htmlFor="teamCaptainEmail"
                        className="form-label"
                        title="Team Captain Email"
                      >
                        Team Captain Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="teamCaptainEmail"
                        required
                        value={formData.teamCaptainEmail}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter the team captain's email.
                      </div>
                    </div>

                    {/* Team Members Form */}
                    <div className="col-12">
                      <h5 className="mt-4">Team Members</h5>
                      {formData.teamMembers.map((member, index) => (
                        <div key={index} className="mb-3">
                          <div className="row">
                            <div className="col-md-4">
                              <label
                                htmlFor={`teamMembers-${index}-name`}
                                className="form-label"
                                title="Team Member Name"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                id={`teamMembers-${index}-name`}
                                value={member.name}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor={`teamMembers-${index}-age`}
                                className="form-label"
                                title="Team Member Age"
                              >
                                Age
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="age"
                                id={`teamMembers-${index}-age`}
                                value={member.age}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor={`teamMembers-${index}-contact`}
                                className="form-label"
                                title="Team Member Contact"
                              >
                                Contact
                              </label>
                              <input
                                type="tel"
                                className="form-control"
                                name="contact"
                                id={`teamMembers-${index}-contact`}
                                value={member.contact}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addMember}
                    >
                      Add Member
                    </button>
                  </>
                )}

<div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="agree"
                      required
                      checked={formData.agree}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="agree">
                      Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-bold py-2"
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            </div>
          </div>


          <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-1"></i> Go Back
          </button>

        </div>

        {/* Right-side Event Details Section */}
        <div className="col-md-4 px-3">
          <div className="card shadow-lg mb-4">
            <div className="card-header text-center py-3">
              <h5 className="mb-1 fw-semibold text-uppercase">Event Details</h5>
              <p className="text-muted small m-0">
                Registration Period: {event?.registration_period}
              </p>
            </div>
            <div className="card-body px-3">
              <p>
                <i className="bi bi-calendar-event me-2"></i>
                <strong>DATE:</strong> {formatDate(event?.date)}
              </p>
              <p>
                <i className="bi bi-clock me-2"></i>
                <strong>TIME:</strong> {event?.details[0].split("|")[1]}
              </p>
              <p>
                <i className="bi bi-geo-alt me-2"></i>
                <strong>PLACE:</strong> {event?.details[0].split("|")[0]}
              </p>

              <div className="mt-4">
                <h6>
                  <i className="bi bi-list-check me-2"></i>
                  <strong>Requirements:</strong>
                </h6>
                <ul className="list-unstyled">
                  <li>
                    <i className="bi bi-check-lg text-success me-1"></i>Youth
                    aged 18 - 30
                  </li>
                  <li>
                    <i className="bi bi-check-lg text-success me-1"></i>
                    Registered in Youth Profiling Form
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
