import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useParams, useNavigate } from "react-router-dom";
import { useAPI } from "../../component/contexts/ApiContext";

function AnnouncementsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getData, putData } = useAPI();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formValid, setFormValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await getData(`announcements/${id}`);
        setTitle(res.title);
        setDescription(res.description);
        setImagePreview(res.image);
        setStatus(res.status); // assuming API returns 'draft' or 'published'
      } catch (error) {
        console.error("Failed to fetch announcement data", error);
      }
    };
    fetchAnnouncement();
  }, [id, getData]);

  const titleCount = `${title.length}/700 characters`;
  const descriptionCount = `${description.length}/2000 characters`;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePreview = () => {
    const isValid = title.trim() !== "" && description.trim() !== "";
    setFormValid(true);
    if (isValid) {
      new Modal(document.getElementById("previewModal")).show();
    }
  };

  const showSuccessAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const handleUpdate = async (publish) => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required!");
      return;
    }

    try {
      const payload = {
        title,
        description,
        image,
        status: publish ? "published" : status, // Update the status if publish is true
      };

      await putData(`announcements/${id}`, payload);
      showSuccessAlert("Announcement updated successfully!");
      setTimeout(() => navigate("/admin/announcements"), 2000);
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update announcement.");
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="mb-4 border-bottom pb-3">
        <h4 className="fw-bold">Edit Announcement</h4>
        <p className="text-muted m-0">Modify your article below.</p>
      </div>

      {showAlert && (
        <div
          className="alert alert-success alert-dismissible fade show"
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

      <form className="row g-4 needs-validation" noValidate>
        <div className="col-md-8">
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold text-dark">
              Title
            </label>
            <input
              type="text"
              className={`form-control ${
                formValid && !title ? "is-invalid" : ""
              }`}
              id="title"
              placeholder="Enter title..."
              maxLength="700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <small className="form-text text-muted">{titleCount}</small>
          </div>

          <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label fw-bold text-dark"
            >
              Description
            </label>
            <textarea
              className={`form-control ${
                formValid && !description ? "is-invalid" : ""
              }`}
              id="description"
              rows="15"
              placeholder="Enter detailed description..."
              maxLength="2000"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <small className="form-text text-muted">{descriptionCount}</small>
          </div>
        </div>

        <div className="col-md-4">
          <label className="w-100 d-flex flex-column align-items-center border p-4 rounded-3 bg-light-subtle">
            <i
              className="bi bi-image text-primary"
              style={{ fontSize: "3rem" }}
            ></i>
            <p className="text-muted">Click to upload a new image</p>
            <input
              type="file"
              className="d-none"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={
                  imagePreview && imagePreview.startsWith("http")
                    ? imagePreview
                    : `/storage/${imagePreview || "placeholder.png"}`
                }
                alt="Preview"
                className="img-fluid rounded-3 mt-3"
              />
            )}
          </label>
        </div>
      </form>

      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-primary fw-bold text-white px-5 py-2"
          onClick={handlePreview}
        >
          <i className="bi bi-eye"></i> Preview
        </button>
        <button
          className="btn btn-success fw-bold text-white px-5 py-2 mx-2"
          onClick={() => handleUpdate(false)} // No publishing action
        >
          <i className="bi bi-save"></i> Update
        </button>
        {status === "draft" && (
          <button
            className="btn btn-success fw-bold text-white px-5 py-2 mx-2"
            onClick={() => handleUpdate(true)} // For publishing action
          >
            <i className="bi bi-upload"></i> Publish
          </button>
        )}
      </div>

      <ModalPreview
        id="previewModal"
        title={title}
        description={description}
        imagePreview={imagePreview}
        currentDate={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        status={status} // pass status
        onPublish={() => handleUpdate(true)} // Pass publish to update
      />
    </>
  );
}

function ModalPreview({
  id,
  title,
  description,
  imagePreview,
  currentDate,
  status,
  onPublish,
}) {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              Preview Content
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <h1>{title}</h1>
            <p className="text-muted ps-2">{currentDate}</p>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="img-fluid rounded-3 mb-3"
              />
            )}
            <p style={{ textIndent: "50px", textAlign: "justify" }}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementsEdit;
