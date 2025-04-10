import React from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import { Link } from "react-router-dom";

function ServicesManagement() {
  return (
    <>
      <Breadcrumb />
      <div className="d-flex justify-content-center align-items-center gap-3" style={{ height: "200px" }}>
        <Link to={'/admin/services/computer'} className="btn btn-primary btn-lg fs-1 px-4 py-4 fw-semibold">Computer Service</Link>
        <Link to={'/admin/services/printing'} className="btn btn-primary btn-lg fs-1 px-4 py-4 fw-semibold">Printing Service</Link>
      </div>
    </>
  );
}

export default ServicesManagement;
