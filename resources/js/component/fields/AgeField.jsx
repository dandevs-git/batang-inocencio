import { useState } from "react";

function AgeField({ formData, handleChange, onValidate }) {
  const [ageValid, setAgeValid] = useState(true); 
  const [ageMessage, setAgeMessage] = useState("");

  const validateAge = (age) => {
    if (age < 18) {
      setAgeValid(false);
      setAgeMessage("⚠️ You must be at least 18 years old.");
      onValidate(false);
    } else {
      setAgeValid(true);
      setAgeMessage("");
      onValidate(true);
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Age</label>
      <input
        type="number"
        name="age"
        className={`form-control ${!ageValid ? "is-invalid" : ""}`}
        value={formData.age}
        onChange={(e) => {
          handleChange(e);
          validateAge(e.target.value);
        }}
        required
      />
      {!ageValid && (
        <div className="invalid-feedback">
          {ageMessage}
        </div>
      )}
    </div>
  );
}

export default AgeField;
