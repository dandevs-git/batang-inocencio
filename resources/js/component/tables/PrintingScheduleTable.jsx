import React, { useEffect, useState } from "react";
import { useAPI } from "../contexts/ApiContext";
import TableComponent from "./TableComponent";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

function PrintingScheduleTable({ title, status, hasActions }) {
  const { getData, postData, putData, deleteData } = useAPI();
  const [printingScheduleData, setprintingScheduleData] = useState("");
  const [selectedPrintingSchedule, setSelectedPrintingSchedule] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getData("printing-services", setprintingScheduleData, setLoading, setError);
  }, [getData]);

  const filteredprintingScheduleData = status
    ? printingScheduleData.filter(
        (printingScheduleItem) => printingScheduleItem.status === status
      )
    : printingScheduleData;

  const actions = (id) => [
    {
      label: "View",
      onClick: () => {
        const printingScheduleItem = printingScheduleData.find(
          (item) => item.id === id
        );
        setSelectedPrintingSchedule(printingScheduleItem);
        const modal = new Modal(document.getElementById("previewModal"));
        modal.show();
      },
      className: "btn btn-sm text-light btn-info text-nowrap",
      icon: "bi bi-eye",
    },
  ];

  const printingScheduleColumns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Code",
      accessorKey: "reservation_code",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        if (status === "pending") {
          return <span className="badge bg-warning">Pending</span>;
        } else if (status === "completed") {
          return <span className="badge bg-success">Completed</span>;
        }
        return null;
      },
    },
  ];

  const formatDate = (raw) => {
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

  return (
    <>
      <TableComponent
        title={title}
        columns={printingScheduleColumns}
        data={filteredprintingScheduleData}
        loading={loading}
        actions={hasActions && actions}
      />

      <div
        className="modal fade"
        id="previewModal"
        tabIndex="-1"
        aria-labelledby="previewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md ">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="previewModalLabel">
                <i className="bi bi-printer me-2"></i> Printing Schedule Details
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedPrintingSchedule ? (
                <dl className="row">
                  <dt className="col-sm-4 text-muted">Name</dt>
                  <dd className="col-sm-8">{selectedPrintingSchedule.name}</dd>

                  <dt className="col-sm-4 text-muted">Reservation Code</dt>
                  <dd className="col-sm-8">
                    {selectedPrintingSchedule.reservation_code}
                  </dd>

                  <dt className="col-sm-4 text-muted">Status</dt>
                  <dd className="col-sm-8">
                    {selectedPrintingSchedule.status === "pending" && (
                      <span className="badge bg-warning text-light">
                        Pending
                      </span>
                    )}
                    {selectedPrintingSchedule.status === "completed" && (
                      <span className="badge bg-success">Completed</span>
                    )}
                  </dd>

                  <dt className="col-sm-4 text-muted">Reservation for</dt>
                  <dd className="col-sm-8">
                    {formatDate(selectedPrintingSchedule.reservation_date)}
                  </dd>
                </dl>
              ) : (
                <div className="text-muted">No data available.</div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light border"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrintingScheduleTable;
