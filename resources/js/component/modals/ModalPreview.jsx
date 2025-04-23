import React from "react";

function ModalPreview({
  header = "Preview News Content",
  id,
  title,
  description,
  imagePreviews = [],
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
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-primary" id={`${id}Label`}>
              {header}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            <article>
              <h2 className="fw-bold">{title}</h2>
              <p className="text-muted">{currentDate}</p>
              {console.log(imagePreviews)}

              {imagePreviews.length > 0 && (
                <div className="row g-3 mb-3">
                  {imagePreviews.map((src, index) => {
                    return (
                      <div key={index} className="col-12 col-md-6">
                        <figure className="mb-0">
                          <img
                            src={
                              src.startsWith("http") || src.startsWith("blob:")
                                ? src
                                : `/storage/${src}`
                            }
                            alt={`Preview ${index + 1}`}
                            className="img-fluid rounded border object-fit-contain"
                          />
                        </figure>
                      </div>
                    );
                  })}
                </div>
              )}

              <p className="lead p-3">{description}</p>
            </article>
          </div>

          <div className="modal-footer">
            {onSaveDraft && (
              <button
                className="btn btn-warning fw-bold text-white px-4"
                onClick={onSaveDraft}
              >
                <i className="bi bi-save me-2"></i>Save as Draft
              </button>
            )}
            {onPublish && (
              <button
                className="btn btn-success fw-bold text-white px-4"
                onClick={onPublish}
              >
                <i className="bi bi-send me-2"></i>Publish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPreview;
