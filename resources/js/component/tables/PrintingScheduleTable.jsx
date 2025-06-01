import React, { useEffect, useState } from "react";
import { useAPI } from "../contexts/ApiContext";
import TableComponent from "./TableComponent";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

function PrintingScheduleTable({ title, status, hasActions }) {
  const { getData, deleteData, putData } = useAPI();
  const [printingScheduleData, setPrintingScheduleData] = useState([]);
  const [selectedPrintingSchedule, setSelectedPrintingSchedule] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalAction, setModalAction] = useState(null);

  const fetchData = () => {
    getData("printing-services", setPrintingScheduleData, setLoading, setError);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = status
    ? printingScheduleData.filter((item) => item.status === status)
    : printingScheduleData;

  const openModal = (id) => {
    const selected = printingScheduleData.find((item) => item.id === id);
    setSelectedPrintingSchedule(selected);
    const modal = new Modal(document.getElementById("previewModal"));
    modal.show();
  };

  const openConfirmationModal = (action) => {
    setModalAction(action);
    const modal = new Modal(document.getElementById("cancelConfirmationModal"));
    modal.show();
  };

  const formatDate = (raw) => {
    if (!raw) return "-";
    const date = new Date(raw);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const actions = (id) => [
    {
      label: "View",
      onClick: () => openModal(id),
      className: "btn btn-sm text-light btn-info text-nowrap",
      icon: "bi bi-eye",
    },
  ];

  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Code", accessorKey: "reservation_code" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        return (
          <span
            className={`badge ${
              status === "completed" ? "bg-success" : "bg-warning"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
  ];

  const handleCancelReservation = async () => {
    if (!selectedPrintingSchedule) return;

    try {
      await deleteData(`printing-services/${selectedPrintingSchedule.id}`);
      Modal.getInstance(
        document.getElementById("previewModal")
      ).hide();
    } catch (error) {
      console.error("Failed to cancel reservation:", error);
    }
  };

  const handleMarkAsDone = async () => {
    if (!selectedPrintingSchedule) return;

    try {
      await putData(
        `printing-services/${selectedPrintingSchedule.id}/mark-as-done`
      );
      Modal.getInstance(
        document.getElementById("previewModal")
      ).hide();
    } catch (error) {
      console.error("Failed to mark reservation as done:", error);
    }
  };

  return (
    <>
      <TableComponent
        title={title}
        columns={columns}
        data={filteredData}
        loading={loading}
        actions={hasActions && actions}
      />

      {/* Preview Modal */}
      <div className="modal fade" id="previewModal" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title">
                <i className="bi bi-printer me-2"></i>
                <strong>
                  {selectedPrintingSchedule?.name || "Printing"}
                </strong>{" "}
                | {formatDate(selectedPrintingSchedule?.reservation_date)}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              {selectedPrintingSchedule ? (
                <div className="d-flex justify-content-between align-items-start">
                  <div className="p-3 col-8">
                    <div className="border shadow rounded-4 p-4">
                      <p>
                        <strong>Name</strong>
                        <br />
                        {selectedPrintingSchedule.name}
                      </p>
                      <p>
                        <strong>Reservation Code</strong>
                        <br />
                        {selectedPrintingSchedule.reservation_code}
                      </p>
                      <p>
                        <strong>Reservation For</strong>
                        <br />
                        {formatDate(selectedPrintingSchedule.reservation_date)}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 col-4">
                    <div className="text-center border shadow rounded-4 p-4">
                      <p className="fw-bold">Status</p>
                      <div
                        className={`p-2 mb-3 text-white rounded ${
                          selectedPrintingSchedule.status === "completed"
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {selectedPrintingSchedule.status === "completed"
                          ? "Completed"
                          : "Pending"}
                      </div>

                      {selectedPrintingSchedule.status !== "completed" && (
                        <>
                          <button
                            className="btn btn-success text-light btn-sm mb-2"
                            onClick={() => openConfirmationModal("done")}
                          >
                            Mark as Done
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => openConfirmationModal("cancel")}
                          >
                            Cancel Reservation
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-muted">No data available.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="cancelConfirmationModal"
        tabIndex="-1"
        aria-labelledby="cancelConfirmationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow">
            <div className="modal-header rounded-top-4">
              <h5 className="modal-title" id="cancelConfirmationModalLabel">
                Confirm Cancellation
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p>Are you sure you want to cancel this reservation?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No, Keep It
              </button>
              <button
                type="button"
                className={`btn ${
                  modalAction === "done"
                    ? "btn-success text-light"
                    : "btn-danger"
                }`}
                onClick={() => {
                  if (modalAction === "cancel") {
                    handleCancelReservation();
                  } else if (modalAction === "done") {
                    handleMarkAsDone();
                  }
                }}
                data-bs-dismiss="modal"
              >
                {modalAction === "done"
                  ? "Yes, Mark as Done"
                  : "Yes, Cancel It"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrintingScheduleTable;
