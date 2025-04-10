import React from "react";

function ModalPreview({
  id,
  title,
  description,
  imagePreview,
  currentDate,
  onSaveDraft,
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
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <h1 className="mt-3">{title}</h1>
            <p className="text-muted ps-2">{currentDate}</p>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="img-fluid rounded-3 mb-3"
              />
            )}
            <p
              className="p-3 lead"
              style={{ textIndent: "50px", textAlign: "justify" }}
            >
              {description}
            </p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-warning fw-bold text-white px-5 py-2"
              onClick={onSaveDraft}
            >
              <i className="bi bi-save"></i> Save as Draft
            </button>
            <button
              className="btn btn-success fw-bold text-white px-5 py-2"
              onClick={onPublish}
            >
              <i className="bi bi-send"></i> Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPreview;
