import React, { useState } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import ComputerRentCalendar from "../../component/ComputerRentCalendar";
import ComputerRentTable from "../../component/tables/ComputerRentTable";

function ServicesComputerManagement() {
  const [selectedPC, setSelectedPC] = useState(null);

  const pcAvailability = [
    { name: "PC-1", status: "full" },
    { name: "PC-2", status: "available" },
    { name: "PC-3", status: "available" },
    { name: "PC-4", status: "full" },
    { name: "PC-5", status: "full" },
    { name: "PC-6", status: "available" },
    { name: "PC-7", status: "available" },
    { name: "PC-8", status: "full" },
  ];

  return (
    <>
      <Breadcrumb />
      <ComputerRentCalendar />
      <div className="mt-5">
        <div className="row g-4 justify-content-center">
          {pcAvailability.map((pc, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              onClick={() => setSelectedPC(pc)}
              style={{ cursor: "pointer" }}
            >
              <div className="card text-center shadow-lg border-0 rounded-4 h-100 hover-shadow">
                <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                  <i
                    className={`bi bi-pc-display display-3 mb-3`}
                  ></i>
                  <h5 className="card-title fw-semibold mb-2">{pc.name}</h5>
                  <span
                    className={`badge rounded-pill fs-6 px-3 py-2 ${
                      pc.status === "full"
                        ? "bg-danger text-light"
                        : "bg-success text-light"
                    }`}
                  >
                    {pc.status === "full" ? "Full Slot" : "Available"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPC && (
          <div className="text-center mt-5">
            <ComputerRentTable title={'Computer Rentals for ' + selectedPC.name} />
          </div>
        )}
      </div>
    </>
  );
}

export default ServicesComputerManagement;
