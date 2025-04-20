import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import { useAPI } from "../../component/contexts/ApiContext";
import TableComponent from "../../component/tables/TableComponent";
import MembersTable from "../../component/tables/MembersTable";

function MembershipManagement() {
  const { getData, postData, putData, deleteData } = useAPI();
  const [membersData, setMembersData] = useState("");
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getData("members", setMembersData, setLoading, setError);
  }, [getData]);

  useEffect(() => {
    setTotalMembers(membersData.length);
  }, [membersData]);

  const handleDownload = () => {
    const csvRows = [];
    const headers = [
      "First Name",
      "Last Name",
      "Age",
      "Address",
      "Email",
      "Contact Number",
    ];
    csvRows.push(headers.join(","));

    members.forEach((member) => {
      const row = [
        member.first_name,
        member.last_name,
        member.age,
        member.address,
        member.email,
        member.contact_number,
      ];
      csvRows.push(row.join(","));
    });

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "members.csv");
    a.click();
  };

  return (
    <>
      <Breadcrumb />
      <div className="mb-4">
        <h4 className="fw-bold">Youth Profiling Membership</h4>
        <p className="text-muted">
          An overview of the registered youth members under the Sangguniang
          Kabataan program.
        </p>
      </div>
      <div className="card shadow rounded-4 mb-5" style={{ width: "300px" }}>
        <div className="card-body p-4 d-flex flex-column justify-content-center align-items-center">
          <h1 className="display-2 fw-bold text-primary">
            {loading ? (
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              totalMembers
            )}
          </h1>
          <p className="text-muted">Total Registered Members</p>
          <button
            className="btn btn-primary d-flex align-items-center px-4 py-2"
            onClick={handleDownload}
          >
            <i className="bi bi-download me-2"></i> Download List
          </button>
        </div>
      </div>

      <MembersTable hasActions={true}/>
    </>
  );
}

export default MembershipManagement;
