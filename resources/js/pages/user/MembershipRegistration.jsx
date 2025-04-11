import React, { useState } from "react";
import api from "../../api";

const formFields = {
  last_name: "",
  first_name: "",
  middle_name: "",
  suffix: "",
  address: "",
  area: "",
  sex: "",
  age: "",
  email: "",
  contact_number: "",
  civil_status: "",
  age_group: "",
  education: "",
  employment: "",
  sk_voter: "",
  election_vote: "",
  national_voter: "",
  kk_assembly: "",
  kk_ttendances: "",
  kk_reason: [],
  youth_concerns: "",
  recommendations: "",
  project_recommendations: "",
};

const areaOptions = [
  "Inocencio Proper",
  "Tradition Homes Phase 1 and 2",
  "Sampaguita Village",
  "Regina Ville 2000",
  "BRIA Homes",
  "South Ville Phase 1A and B",
];

const genderOptions = ["Male", "Female"];

const civilStatusOptions = [
  "Single",
  "Married",
  "Widowed",
  "Divorced",
  "Separated",
];

const ageGroupOptions = [
  "Child Youth (15-17)",
  "Core Youth (18-24)",
  "Young Adult (25-30)",
];

const educationOptions = [
  "Elementary Level",
  "Elementary Graduate",
  "High School Level",
  "High School Graduate",
  "College Level",
  "College Graduate",
  "Master's Graduate",
  "Doctorate Level",
  "Doctorate Graduate",
  "Out of School",
];

const employmentOptions = ["Unemployed", "Employed"];

const yesNoOptions = ["Yes", "No"];

const kkAttendanceOptions = ["1-2 Times", "3-4 Times", "5 and Above"];

const kkReasonOptions = [
  "No KK Assembly",
  "Not aware about KK Assembly",
  "Not Interested",
];

const YouthProfilingForm = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState(formFields);
  const [loading, setLoading] = useState(false);
  const [massageErr, setMessageErr] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) =>
      type === "checkbox"
        ? {
            ...prev,
            [name]: checked
              ? [...prev[name], value]
              : prev[name].filter((v) => v !== value),
          }
        : { ...prev, [name]: type === "radio" ? value : checked || value }
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("members", formData);
      setMessageErr("");
      setShowModal(true);
    } catch (error) {
      setMessageErr(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
    console.log(formData);
  };

  const renderRadioButtons = (name, options) =>
    options.map((option) => (
      <div key={option} className="form-check">
        <input
          type="radio"
          name={name}
          value={option}
          checked={formData[name] === option}
          onChange={handleChange}
          required
          className="form-check-input"
        />
        <label className="form-check-label">{option}</label>
      </div>
    ));

  const renderCheckboxes = (name, options) =>
    options.map((option) => (
      <div key={option} className="form-check">
        <input
          type="checkbox"
          name={name}
          value={option}
          checked={formData[name].includes(option)}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">{option}</label>
      </div>
    ));

  const onPrev = () => setPage(page - 1);
  const onNext = () => setPage(page + 1);

  const onFinish = () => {
    handleSubmit();
  };

  return (
    <div className="container p-5">
      <div
        className="progress mb-3 w-75 mx-auto"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progress-bar"
          style={{ width: `${(page / 5) * 100}%` }}
        ></div>
      </div>
      {page === 1 && (
        <div className="page active">
          <div className="card border-top border-0 shadow-lg mb-5 rounded-4 w-75 mx-auto">
            <div className="card-body p-5">
              <div className="p-4">
                <h2 className="text-center fw-bold mb-4 text-primary">
                  YOUTH PROFILING OF KATIPUNAN NG KABATAAN (KK)
                </h2>
                <p className="text-muted text-justify">
                  The Sangguniang Kabataan (SK) of Barangay Inocencio is
                  gathering important demographic information...
                </p>
                <div className="form-check my-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="agreeToTerms"
                    required
                  />
                  <label className="form-check-label text-muted">
                    I agree to provide my details for registration.
                  </label>
                </div>
                <button
                  className="btn btn-primary w-100 fw-bold py-2 mt-4"
                  onClick={onNext}
                >
                  <i className="bi bi-pencil-square"></i> Fill Out Registration
                  Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {page === 2 && (
        <div className="page">
          <div className="card border-top border-0 shadow-lg mb-5 rounded-4 w-75 mx-auto">
            <div className="card-body p-5">
              <div className="p-4">
                <h2 className="text-center fw-bold mb-4 text-primary">
                  YOUTH PROFILING OF KATIPUNAN NG KABATAAN (KK)
                </h2>
                <h4 className="text-center mb-4 text-muted">A. Profile</h4>
                {[
                  "last_name",
                  "first_name",
                  "middle_name",
                  "suffix",
                  "address",
                ].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">
                      {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                    <input
                      type="text"
                      name={field}
                      className="form-control"
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <fieldset className="mb-3">
                  <legend className="form-label">Inocencio Area</legend>
                  {areaOptions.map((area) => (
                    <div key={area} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="area"
                        value={area}
                        checked={formData.area === area}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label">{area}</label>
                    </div>
                  ))}
                </fieldset>

                <div className="mb-3">
                  <legend className="form-label">Gender</legend>
                  {renderRadioButtons("sex", genderOptions)}
                </div>

                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="form-control"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact Number</label>
                  <input
                    type="tel"
                    name="contact_number"
                    className="form-control"
                    value={formData.contact_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-secondary" onClick={onPrev}>
                    Back
                  </button>
                  <button className="btn btn-primary" onClick={onNext}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {page === 3 && (
        <div className="page">
          <div className="card border-top border-0 shadow-lg  mb-5 rounded-4 w-75 mx-auto">
            <div className="card-body p-5">
              <div className="p-4">
                <h2 className="text-center fw-bold mb-4 text-primary">
                  YOUTH PROFILING OF KATIPUNAN NG KABATAAN (KK)
                </h2>
                <h4 className="text-center mb-4 text-muted">
                  B. Demographic Characteristics
                </h4>

                <div className="mb-3">
                  <legend className="form-label">Civil Status</legend>
                  {renderRadioButtons("civil_status", civilStatusOptions)}
                </div>

                <div className="mb-3">
                  <legend className="form-label">Age Group</legend>
                  {renderRadioButtons("age_group", ageGroupOptions)}
                </div>

                <div className="mb-3">
                  <legend className="form-label">Education</legend>
                  {renderRadioButtons("education", educationOptions)}
                </div>

                <div className="mb-3">
                  <legend className="form-label">Employment</legend>
                  {renderRadioButtons("employment", employmentOptions)}
                </div>

                <div className="mb-3">
                  <legend className="form-label">SK Voter</legend>
                  {renderRadioButtons("sk_voter", ["Yes", "No"])}
                </div>

                <div className="mb-3">
                  <legend className="form-label">Election Vote</legend>
                  {renderRadioButtons("election_vote", ["Yes", "No"])}
                </div>

                <div className="mb-3">
                  <legend className="form-label">National Voter</legend>
                  {renderRadioButtons("national_voter", ["Yes", "No"])}
                </div>

                <div className="mb-3">
                  <legend className="form-label">KK Assembly</legend>
                  {renderRadioButtons("kk_assembly", ["Yes", "No"])}
                </div>

                <div className="mb-3 ps-3">
                  {formData.kk_assembly === "Yes" &&
                    renderRadioButtons("kk_ttendances", kkAttendanceOptions)}
                </div>

                <div className="mb-3 ps-3">
                  {formData.kk_assembly === "No" &&
                    renderRadioButtons("kk_reason", kkReasonOptions)}
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-secondary" onClick={onPrev}>
                    Back
                  </button>
                  <button className="btn btn-primary" onClick={onNext}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {page === 4 && (
        <div className="page">
          <div className="card border-top border-0 shadow-lg  mb-5 rounded-4 w-75 mx-auto">
            <div className="card-body p-5">
              <div className="p-4">
                <h2 className="text-center fw-bold mb-4 text-primary">
                  YOUTH PROFILING OF KATIPUNAN NG KABATAAN (KK)
                </h2>
                <h4 className="text-center mb-4 text-muted">C. Others</h4>

                <div className="mb-3">
                  <label className="form-label">
                    Specific concerns/issues as a youth (provide at least 2
                    issues)
                  </label>
                  <textarea
                    className="form-control"
                    name="youth_concerns"
                    rows="4"
                    placeholder="Enter at least 2 issues or concerns you have as a youth."
                    value={formData.youth_concerns}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Recommendations to address the issues identified
                  </label>
                  <textarea
                    className="form-control"
                    name="recommendations"
                    rows="4"
                    placeholder="Provide recommendations to address the issues you mentioned."
                    value={formData.recommendations}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Recommendation Project/s for SK Inocencio
                  </label>
                  <textarea
                    className="form-control"
                    name="project_recommendations"
                    rows="4"
                    placeholder="Provide recommendation projects that could benefit SK Inocencio."
                    value={formData.project_recommendations}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-secondary" onClick={onPrev}>
                    Back
                  </button>
                  <button className="btn btn-primary" onClick={onNext}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {page === 5 && (
        <div className="page">
          <div className="card border-top border-0 shadow-lg  mb-5 rounded-4 w-75 mx-auto">
            <div className="card-body p-5">
              <div className="p-4">
                <h2 className="text-center fw-bold mb-4 text-primary">
                  YOUTH PROFILING OF KATIPUNAN NG KABATAAN (KK)
                </h2>
                <h4 className="text-center mb-4 text-muted">
                  Final Confirmation
                </h4>
                <p className="text-muted text-justify">
                  <strong>
                    Thank you for completing the Youth Profiling Registration!
                  </strong>{" "}
                  Your responses will help improve SK's programs and services
                  for the youth of Inocencio. A confirmation email will be sent
                  to your provided email.
                </p>

                {massageErr && (
                  <div className="alert alert-danger py-2 text-center">
                    {massageErr}
                  </div>
                )}
                <div className="text-center mt-4">
                  <button
                    className="btn text-light btn-success w-100 fw-bold py-2"
                    type="submit"
                    onClick={onFinish}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Submit & Finish
                  </button>
                </div>
                <div className="text-center mt-3">
                  <p className="text-muted">
                    You can always update your registration later if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`modal fade ${showModal ?? "show"}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Success!</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Your Youth Profiling Registration has been successfully
                submitted. A confirmation email will be sent to you.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthProfilingForm;
