import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useAPI } from "../../component/contexts/ApiContext";
import ModalConfirmPublish from "../../component/modals/ModalConfirmPublish";
import ModalDiscard from "../../component/modals/ModalDiscard";
import ModalPreview from "../../component/modals/ModalPreview";
import { useParams } from "react-router-dom";

function EventsEdit() {
  const { postData, getData } = useAPI();
  const { id } = useParams(); // Using object destructuring for id
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    location: "",
    event_organizer: "",
    registration_start_date: "",
    registration_end_date: "",
    event_type: "",
    requirements: "",
    description: "",
    time: "",
    contact_number: "",
    number_of_participants: "",
    image: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const currentDate = new Date().toLocaleDateString();

  // Fetch event details on component mount
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await getData(`events/${id}`);
        setEventDetails(res);
        setImagePreview(res.images || []);
      } catch (error) {
        console.error("Failed to fetch event data", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchEvent();
    }
  }, [id, getData]);


  const formatDate = (date) => {
    return date ? date.split("T")[0] : "";
  };
  
  const titleCount = eventDetails.title.length;
  const descriptionCount = eventDetails.description.length;

  const handleImageChange = (file) => {
    const maxSizeMB = 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      alert(`Image must be less than ${maxSizeMB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setImagePreview([reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePreview = () => {
    const form = document.querySelector(".needs-validation");
    const isValid =
      form.checkValidity() &&
      Object.values(eventDetails).every((val) => val.trim() !== "") &&
      image;

    setFormValid(isValid);
    form.classList.add("was-validated");

    if (isValid) {
      new Modal(document.getElementById("previewModal")).show();
    }
  };

  const handleDiscard = () => {
    new Modal(document.getElementById("discardModal")).show();
  };

  const discard = () => {
    setEventDetails({
      title: "",
      date: "",
      location: "",
      event_organizer: "",
      registration_start_date: "",
      registration_end_date: "",
      event_type: "",
      requirements: "",
      description: "",
      time: "",
      contact_number: "",
      number_of_participants: "",
      image: "",
    });
    setImage(null);
    setImagePreview([]);
    setFormValid(false);
  };

  const showSuccessAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  const buildFormData = () => {
    const formData = new FormData();
    if (image) formData.append("image", image);
    Object.entries(eventDetails).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    return formData;
  };

  const saveAsDraft = async () => {
    try {
      const formData = buildFormData();
      await postData("events", formData);
      showSuccessAlert("Event saved as draft!");
      Modal.getInstance(document.getElementById("previewModal"))?.hide();
    } catch (err) {
      console.error(err);
      alert("Failed to save draft.");
    } finally {
      discard();
    }
  };

  const confirmPublish = () => {
    new Modal(document.getElementById("confirmPublishModal")).show();
  };

  const publishEvent = async () => {
    try {
      const formData = buildFormData();
      await postData("events", formData);
      showSuccessAlert("Event published successfully!");
      Modal.getInstance(document.getElementById("previewModal"))?.hide();
    } catch (err) {
      console.error(err);
      alert("Failed to publish event.");
    } finally {
      discard();
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="mb-4 border-bottom pb-3">
        <h4 className="fw-bold">Edit Event</h4>
        <p className="text-muted m-0">
          Update the details below for this event.
        </p>
      </div>

      {showAlert && (
        <div
          className={`alert alert-${
            alertMessage.includes("published") ? "success" : "warning"
          } alert-dismissible fade show`}
          role="alert"
        >
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAlert(false)}
          ></button>
        </div>
      )}

      <form
        className={`row g-4 needs-validation ${
          formValid ? "was-validated" : ""
        }`}
        noValidate
      >
        <div className="col-md-8">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={eventDetails.title}
              maxLength="100"
              placeholder="Enter event title"
              onChange={handleInputChange}
              required
              aria-describedby="titleCount"
            />
            <small id="titleCount">{titleCount}</small>
            <div className="invalid-feedback">
              Title is required and must be under 100 characters.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formatDate(eventDetails?.date)}
              onChange={handleInputChange}
              required
              aria-describedby="eventDateHelp"
            />
            <small id="eventDateHelp" className="form-text text-muted">
              Select the event date.
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={eventDetails.location}
              onChange={handleInputChange}
              placeholder="Enter event location"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="event_organizer" className="form-label">
              Event Organizer
            </label>
            <input
              type="text"
              className="form-control"
              id="event_organizer"
              name="event_organizer"
              value={eventDetails.event_organizer}
              onChange={handleInputChange}
              placeholder="Enter organizer name"
              required
            />
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="registration_start_date" className="form-label">
                  Registration Period (Start)
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="registration_start_date"
                  name="registration_start_date"
                  value={formatDate(eventDetails.registration_start_date)}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="registration_end_date" className="form-label">
                  Registration Period (End)
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="registration_end_date"
                  name="registration_end_date"
                  value={formatDate(eventDetails.registration_end_date)}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="event_type" className="form-label">
              Event Type
            </label>
            <input
              type="text"
              className="form-control"
              id="event_type"
              name="event_type"
              value={eventDetails.event_type}
              onChange={handleInputChange}
              placeholder="e.g., Seminar"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="requirements" className="form-label">
              Requirements
            </label>
            <input
              type="text"
              className="form-control"
              id="requirements"
              name="requirements"
              value={eventDetails.requirements}
              onChange={handleInputChange}
              placeholder="Enter event requirements"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={eventDetails.description}
              onChange={handleInputChange}
              rows="3"
              maxLength="2000"
              placeholder="Enter event description"
              required
              aria-describedby="descriptionCount"
            ></textarea>
            <small id="descriptionCount">{descriptionCount}</small>
          </div>

          <div className="mb-3">
            <label htmlFor="time" className="form-label">
              Time
            </label>
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              value={eventDetails.time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contact_number" className="form-label">
              Contact Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="contact_number"
              name="contact_number"
              value={eventDetails.contact_number}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  if (value.length <= 11) {
                    handleInputChange(e);
                  }
                }
              }}
              maxLength={11}
              placeholder="Enter contact number"
              required
              aria-describedby="contactHelp"
            />
            <small id="contactHelp" className="form-text text-muted">
              Enter a valid contact number.
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="number_of_participants" className="form-label">
              Number of Participants
            </label>
            <input
              type="number"
              className="form-control"
              id="number_of_participants"
              name="number_of_participants"
              value={eventDetails.number_of_participants}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
        </div>

        <div className="col-md-4 d-flex flex-column align-items-center">
          <label
            className="w-100 h-100 d-flex flex-column align-items-center justify-content-center border border-2 rounded-4 text-center p-4 bg-light-subtle position-relative upload-label"
            style={{ cursor: "pointer" }}
          >
            <i
              className="bi bi-image text-primary"
              style={{ fontSize: "3rem" }}
            ></i>
            <p className="text-muted m-0">Click to upload an image</p>
            <input
              type="file"
              className={`d-none form-control ${
                formValid && !imagePreview.length ? "is-invalid" : ""
              }`}
              accept="image/*"
              onChange={handleImageChange}
              aria-describedby="imageUploadHelp"
            />
            <small id="imageUploadHelp" className="form-text text-muted">
              Image size should be under 5MB.
            </small>
            {imagePreview?.length > 0 && (
              <div
                id="imagePreviewAnnouncementEditCarousel"
                className="carousel slide mt-3 w-100"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {imagePreview.map((src, i) => (
                    <div
                      key={i}
                      className={`carousel-item ${i === 0 ? "active" : ""}`}
                    >
                      <img
                        src={
                          src.startsWith("http") || src.startsWith("blob:")
                            ? src
                            : `/storage/${src}`
                        }
                        alt={`Preview ${i + 1}`}
                        className="d-block w-100 img-fluid rounded-3"
                        style={{
                          height: "400px",
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {imagePreview.length > 1 && (
                  <>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#imagePreviewAnnouncementEditCarousel"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                        style={{ filter: "invert(100%)" }}
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#imagePreviewAnnouncementEditCarousel"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                        style={{ filter: "invert(100%)" }}
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm mt-2 justify-content-center d-flex w-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImage([]);
                    setImagePreview([]);
                  }}
                >
                  <i className="bi bi-trash3"></i> Clear Images
                </button>
              </div>
            )}
            <div className="invalid-feedback">
              Image is required (max 5mb size).
            </div>
          </label>
        </div>
      </form>

      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-danger fw-bold px-5 py-2"
          onClick={() =>
            new Modal(document.getElementById("discardModal")).show()
          }
        >
          <i className="bi bi-x-circle"></i> Discard
        </button>
        <button
          className="btn btn-primary fw-bold text-white px-5 py-2 mx-2"
          onClick={handlePreview}
        >
          <i className="bi bi-eye"></i> Preview
        </button>
      </div>

      <ModalPreview
        id="previewModal"
        title={eventDetails.title}
        description={eventDetails.description}
        imagePreview={imagePreview}
        currentDate={currentDate}
        onSaveDraft={saveAsDraft}
        onPublish={confirmPublish}
      />
      <ModalDiscard id="discardModal" onConfirm={discard} />
      <ModalConfirmPublish id="confirmPublishModal" onConfirm={publishEvent} />
    </>
  );
}

export default EventsEdit;
