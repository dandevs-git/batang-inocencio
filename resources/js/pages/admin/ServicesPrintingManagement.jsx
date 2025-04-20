import React from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import PrinterScheduleTable from "../../component/tables/PrintingScheduleTable";
import PrintingScheduleCalendar from "../../component/PrintingScheduleCalendar";

function ServicesPrintingManagement() {
  return (
    <>
      <Breadcrumb />
      <PrintingScheduleCalendar />

      <div className="py-5">
        <h2 className="text-center fw-bold mb-4">TOTAL COLLECTED BOTTLES</h2>

        <div className="row justify-content-center mb-4 g-4">
          <div className="col-8 col-md-6">
            <div className="card text-center bg-primary bg-gradient text-white rounded-4">
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-cup fs-1"></i>
                </div>
                <h1 className="fw-bold display-1">38</h1>
                <p className="mb-0 fw-semibold">Plastic</p>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-6">
            <div className="card text-center bg-primary bg-gradient text-white rounded-4">
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-box fs-1"></i>
                </div>
                <h1 className="fw-bold display-1">44</h1>
                <p className="mb-0 fw-semibold">Glass</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a href="/admin/services/resource-reservation/collected-bottles/update" className="btn btn-outline-primary px-4 rounded-pill col-3 btn-lg">Update</a>
        </div>
      </div>
      <PrinterScheduleTable title={'Pending Printing Schedule'} hasActions={true} />
    </>
  );
}

export default ServicesPrintingManagement;
