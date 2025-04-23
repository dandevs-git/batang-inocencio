import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useAPI } from "../../component/contexts/ApiContext";
import { useParams, useNavigate } from "react-router-dom";
import ModalPreview from "../../component/modals/ModalPreview";

function NewsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getData, putData } = useAPI();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState(""); // add this line

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getData(`news/${id}`);
        setTitle(res.title);
        setDescription(res.description);
        setImagePreviews(res.images);
        setStatus(res.status); // assuming API returns 'draft' or 'published'
      } catch (error) {
        console.error("Failed to fetch news data", error);
      }
    };
    fetchNews();
  }, [id, getData]);

  const titleCount = `${title.length}/700 characters`;
  const descriptionCount = `${description.length}/2000 characters`;

  // Handle images change and convert it to base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviews(reader.result); // base64 images string
      setImages(reader.result); // store base64 string
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

  // Build the payload object without FormData
  const handleUpdate = async (publish) => {
    console.log("Title:", title); // Debugging
    console.log("Description:", description); // Debugging

    if (!title.trim() || !description.trim()) {
      alert("Title and description are required!");
      return;
    }

    try {
      const payload = {
        title,
        description,
        images,
        status: publish ? "published" : status, // Update the status if publish is true
      };

      console.log("Sending payload:", payload); // Debug log

      await putData(`news/${id}`, payload); // PUT request with JSON payload
      showSuccessAlert("News updated successfully!");
      setTimeout(() => navigate("/admin/news"), 2000);
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update news.");
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="mb-4 border-bottom pb-3">
        <h4 className="fw-bold">Edit News</h4>
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
              className="bi bi-images text-primary"
              style={{ fontSize: "3rem" }}
            ></i>
            <p className="text-muted">Click to upload a new images</p>
            <input
              type="file"
              className="d-none"
              accept="images/*"
              onChange={handleImageChange}
            />
            {imagePreviews.length > 0 && (
              <div className="mt-3 w-100">
                {imagePreviews.map((src, i) => (
                  <img
                    key={i}
                    src={
                      src.startsWith("http")
                          ? src
                          : `/storage/${src}`
                    }    
                    alt={`Preview ${i + 1}`}
                    className="img-fluid rounded-3 mb-2"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ))}
              </div>
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
        {status == "draft" && (
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
        imagePreviews={imagePreviews}
        currentDate={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        status={status}
        onPublish={() => handleUpdate(true)}
      />
    </>
  );
}

export default NewsEdit;
