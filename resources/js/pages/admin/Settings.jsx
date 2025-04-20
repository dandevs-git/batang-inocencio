import React, { useEffect, useState } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import { useAPI } from "../../component/contexts/ApiContext";

function Settings() {
  const { getData, postData, putData } = useAPI();

  const [formData, setFormData] = useState({
    website_name: "",
    logo: null,
    address: "",
    phone_number: "",
    email: "",
    mission: "",
    vision: "",
    committeeMembers: [{ name: "", position: "", image: null }],
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const data = await getData("settings");
        if (data) {
          const settings = data;

          setFormData({
            website_name: settings.website_name || "",
            logo: null,
            address: settings.address || "",
            phone_number: settings.phone_number || "",
            email: settings.email || "",
            mission: settings.mission || "",
            vision: settings.vision || "",
            committeeMembers: settings.committee_members || [
              { name: "", position: "", image: null },
            ],
          });
        }
      } catch (error) {
        console.error("Error loading settings:", error);
        showErrorAlert("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [getData]);

  const showSuccessAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  const showErrorAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...formData.committeeMembers];
    updated[index][field] = value;
    setFormData({ ...formData, committeeMembers: updated });
  };

  const handleAddMember = () => {
    setFormData({
      ...formData,
      committeeMembers: [
        ...formData.committeeMembers,
        { name: "", position: "", image: null },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const form = new FormData();
    form.append("website_name", formData.website_name);
    form.append("address", formData.address);
    form.append("phone_number", formData.phone_number);
    form.append("email", formData.email);
    form.append("mission", formData.mission);
    form.append("vision", formData.vision);
  
    if (formData.logo) {
      form.append("logo", formData.logo);
    }
  
    formData.committeeMembers.forEach((member, index) => {
      form.append(`committeeMembers[${index}][name]`, member.name);
      form.append(`committeeMembers[${index}][position]`, member.position);
      if (member.image) {
        form.append(`committeeMembers[${index}][image]`, member.image);
      }
    });
  
    try {
      const response = await postData("/settings/save", form);
      showSuccessAlert("Website Information Updated Successfully");
    } catch (error) {
      console.error("Error saving website info:", error);
      showErrorAlert("Error updating settings.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Breadcrumb />
      <div className="container py-4">
        <h2 className="fw-bold mb-4 text-primary">Website Settings</h2>

        {showAlert && (
          <div
            className={`alert alert-dismissible fade show ${
              alertMessage.includes("Error") ? "alert-danger" : "alert-success"
            }`}
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

        <form onSubmit={handleSubmit}>
          {/* Website Info */}
          <div className="mb-4 p-4 bg-white rounded-3 shadow-lg border">
            <h5 className="mb-3 text-secondary">Website Information</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Logo</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.files[0] })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Website Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="website_name"
                  value={formData.website_name}
                  onChange={(e) =>
                    setFormData({ ...formData, website_name: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-4 p-4 bg-white rounded-3 shadow-lg border">
            <h5 className="mb-3 text-secondary">Contact Information</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mb-4 p-4 bg-white rounded-3 shadow-lg border">
            <h5 className="mb-3 text-secondary">Mission & Vision</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Mission</label>
                <textarea
                  rows="3"
                  className="form-control"
                  value={formData.mission}
                  onChange={(e) =>
                    setFormData({ ...formData, mission: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Vision</label>
                <textarea
                  rows="3"
                  className="form-control"
                  value={formData.vision}
                  onChange={(e) =>
                    setFormData({ ...formData, vision: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Org Chart */}
          <div className="mb-4 p-4 bg-white rounded-3 shadow-lg border">
            <h5 className="mb-3 text-secondary">Organizational Chart</h5>
            <h6 className="text-muted">Committee Members</h6>

            {formData.committeeMembers.map((member, index) => (
              <div className="row g-3 mb-3" key={index}>
                <div className="col-md-4">
                  <label className="form-label">Member Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Member Position</label>
                  <input
                    type="text"
                    className="form-control"
                    value={member.position}
                    onChange={(e) =>
                      handleMemberChange(index, "position", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Member Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) =>
                      handleMemberChange(index, "image", e.target.files[0])
                    }
                  />
                </div>
              </div>
            ))}

            <div className="mt-3">
              <button
                type="button"
                className="btn btn-sm btn-success text-light me-2"
                onClick={handleAddMember}
              >
                Add Member
              </button>
            </div>
          </div>
          <div className="col-12">
            <button
              className="btn btn-lg btn-primary ms-auto d-flex"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Website Info"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Settings;
