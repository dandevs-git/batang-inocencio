import React, { useEffect, useState } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import { useAPI } from "../../component/contexts/ApiContext";
import TableComponent from "../../component/tables/TableComponent";

const TransparencyManagement = () => {
  const { getData, postData, putData, deleteData } = useAPI();
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await getData("transparency", setCategories, setLoading, setError);
    };
    loadData();
  }, [getData]);

  const handleUploadPDF = (categoryId) => {
    const fileInput = document.getElementById(`file-input-${categoryId}`);
    if (!fileInput) return alert("File input not found.");
    fileInput.click();
  };

  const handleFileChange = async (event, categoryId) => {
    const file = event.target.files[0];
    if (!file) return alert("Please select a PDF file to upload.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await postData(
        `/transparency/${categoryId}/upload`,
        formData,
        null,
        setLoading,
        setError
      );
      if (response) {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === categoryId
              ? { ...category, files: [...category.files, response] }
              : category
          )
        );
        alert("File uploaded successfully.");
      }
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Error uploading file.");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    try {
      const newCategory = await postData(
        "/transparency",
        { name: newCategoryName },
        setCategories,
        setLoading,
        setError
      );

      if (newCategory) {
        const allCategories = await getData(
          "transparency",
          setCategories,
          setLoading,
          setError
        );
        setCategories(allCategories);

        setShowModal(false);
        setNewCategoryName(""); // Clear the input field after adding
      }
    } catch (error) {
      console.error("Error adding category", error);
      alert("Error adding category.");
    }
  };

  const actions = [
    {
      label: "Delete",
      href: "/member/show",
      className: "btn btn-sm text-light btn-danger text-nowrap",
      icon: "bi bi-eye",
    },
    {
      label: "Change",
      href: "/member/edit",
      className: "btn btn-sm text-light btn-warning text-nowrap",
      icon: "bi bi-pencil-square",
    },
  ];

  const columns = [
    {
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "File Name",
      accessorKey: "file_name",
      cell: ({ getValue }) => {
        const value = getValue();
        return <div className="text-center d-flex ms-3">{value}</div>;
      },
    },
    {
      header: "Last Modified",
      accessorKey: "updated_at",
      cell: ({ getValue }) => {
        const rawDate = getValue();
        const date = new Date(rawDate);
        return date.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      },
    },
    {
      header: "Link",
      accessorKey: "file_url",
      cell: ({ getValue }) => {
        const url = getValue();
        return (
          <a
            href={`/storage/${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            Open File
          </a>
        );
      },
    },
  ];

  return (
    <>
      <Breadcrumb />
      <div className="mb-4">
        <h4 className="fw-bold text-primary">Transparency Management</h4>
      </div>

      <div className="d-flex gap-3 mb-4">
        <button
          className="btn btn-primary text-light btn-lg d-flex align-items-center fw-bold shadow"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-circle me-2"></i> ADD NEW CATEGORY
        </button>
      </div>

      {loading ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <div className="spinner-border text-primary mb-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted fw-semibold">
            Fetching data, please wait...
          </p>
        </div>
      ) : (
        categories.map((category) => (
          <div key={category.id} className="mb-4">
            <TableComponent
              topComponent={
                <>
                  <button
                    className="btn btn-outline-primary px-4 btn mb-2"
                    onClick={() => handleUploadPDF(category.id)}
                  >
                    Upload PDF
                  </button>
                  <input
                    type="file"
                    id={`file-input-${category.id}`}
                    className="d-none"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, category.id)}
                  />
                </>
              }
              title={category.name}
              data={category?.files}
              columns={columns}
              actions={actions}
            />
          </div>
        ))
      )}

      {/* Modal for adding new category */}
      <AddCategoryModal
        showModal={showModal}
        setShowModal={setShowModal}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        handleAddCategory={handleAddCategory}
      />
    </>
  );
};

const AddCategoryModal = ({
  showModal,
  setShowModal,
  newCategoryName,
  setNewCategoryName,
  handleAddCategory,
}) => (
  <div
    className={`modal fade ${showModal ? "show" : ""}`}
    style={{ display: showModal ? "block" : "none" }}
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-primary" id="exampleModalLabel">
            Add New Category
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="categoryName" className="text-primary">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              className="form-control"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default TransparencyManagement;
