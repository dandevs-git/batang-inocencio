import React, { useState } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import api from "../../api";
import ModalPreview from "../../component/modals/ModalPreview";

function AnnouncementsCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formValid, setFormValid] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const titleCount = `${title.length}/700 characters`;
  const descriptionCount = `${description.length}/2000 characters`;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSizeMB = 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      alert(`Image must be less than ${maxSizeMB}MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePreview = () => {
    const isValid = title.trim() !== "" && description.trim() !== "" && image;
    setFormValid(true);
    if (isValid) {
      new Modal(document.getElementById("previewModal")).show();
    }
  };

  const handleDiscard = () => {
    new Modal(document.getElementById("discardModal")).show();
  };

  const discard = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
    setFormValid(false);
  };

  const showSuccessAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const buildFormData = (status) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);
    formData.append("status", status);
    return formData;
  };

  const saveAsDraft = async () => {
    if (!image) {
      alert("Please upload an image before publishing.");
      return;
    }
    Modal.getInstance(document.getElementById("previewModal"))?.hide();
    try {
      const formData = buildFormData("draft");
      const res = await api.post("announcements", formData);
      showSuccessAlert("Announcements saved as draft!");
    } catch (err) {
      console.error(err);
      alert("Failed to save draft.");
    } finally {
      discard();
    }
  };

  const confirmPublish = () => {
    if (!image) {
      alert("Please upload an image before publishing.");
      return;
    }
    new Modal(document.getElementById("confirmPublishModal")).show();
  };

  const publishAnnouncements = async () => {
    Modal.getInstance(document.getElementById("previewModal"))?.hide();
    try {
      const formData = buildFormData("published");
      const res = await api.post("announcements", formData);
      showSuccessAlert("Announcements published successfully!");
      discard();
    } catch (err) {
      console.error(err);
      alert("Failed to publish Announcements.");
    } finally {
      discard();
    }
  };

  return (
    <>
      <Breadcrumb />

      <div className="mb-4 border-bottom pb-3">
        <h4 className="fw-bold">Announcements Management</h4>
        <p className="text-muted m-0">
          Write and publish a new article effortlessly.
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
            <div className="invalid-feedback">
              Title is required (max 700 characters).
            </div>
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
            <div className="invalid-feedback">
              Description is required (max 2000 characters).
            </div>
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
                formValid && !imagePreview ? "is-invalid" : ""
              }`}
              accept="image/*"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <div className="mt-3 border rounded-3 shadow">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-fluid rounded-3"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
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
          onClick={handleDiscard}
        >
          <i className="bi bi-x-circle"></i> Discard
        </button>
        <button
          className="btn btn-primary fw-bold text-white px-5 py-2 mx-2"
          onClick={handlePreview}
        >
          <i className="bi bi-eye"></i> Preview
        </button>
        {/* <button
          className="btn btn-warning fw-bold text-white px-5 py-2 mx-2"
          onClick={saveAsDraft}
        >
          <i className="bi bi-save"></i> Save as Draft
        </button>
        <button
          className="btn btn-success fw-bold text-white px-5 py-2 mx-2"
          onClick={confirmPublish}
        >
          <i className="bi bi-send"></i> Publish
        </button> */}
      </div>

      {/* Preview Modal */}
      <ModalPreview
        header="Preview Modal"
        id="previewModal"
        title={title}
        description={description}
        imagePreview={imagePreview}
        currentDate={currentDate}
        onSaveDraft={saveAsDraft}
        onPublish={confirmPublish}
      />

      {/* Discard Modal */}
      <ModalDiscard id="discardModal" onConfirm={discard} />

      {/* Confirm Publish Modal */}
      <ModalConfirmPublish id="confirmPublishModal" onConfirm={publishAnnouncements} />
    </>
  );
}

// function ModalPreview({
//   id,
//   title,
//   description,
//   imagePreview,
//   currentDate,
//   onSaveDraft,
//   onPublish,
// }) {
//   return (
//     <div
//       className="modal fade"
//       id={id}
//       tabIndex="-1"
//       aria-labelledby={`${id}Label`}
//     >
//       <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id={`${id}Label`}>
//               Preview Content
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             />
//           </div>
//           <div className="modal-body">
//             <h1 className="mt-3">{title}</h1>
//             <p className="text-muted ps-2">{currentDate}</p>
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="img-fluid rounded-3 mb-3"
//               />
//             )}
//             <p
//               className="p-3 lead"
//               style={{ textIndent: "50px", textAlign: "justify" }}
//             >
//               {description}
//             </p>
//           </div>
//           <div className="modal-footer">
//             <button
//               className="btn btn-warning fw-bold text-white px-5 py-2"
//               onClick={onSaveDraft}
//             >
//               <i className="bi bi-save"></i> Save as Draft
//             </button>
//             <button
//               className="btn btn-success fw-bold text-white px-5 py-2"
//               onClick={onPublish}
//             >
//               <i className="bi bi-send"></i> Publish
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function ModalDiscard({ id, onConfirm }) {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      // inert
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              Discard Changes?
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to discard all changes? This action cannot
              be undone.
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onConfirm}
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalConfirmPublish({ id, onConfirm }) {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              Confirm Publish
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>Are you sure you want to publish this Announcements article now?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              className="btn text-light btn-success"
              onClick={onConfirm}
              data-bs-dismiss="modal"
            >
              Yes, Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementsCreate;
