import React, { useState, useEffect } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import { useAPI } from "../../component/contexts/ApiContext";
import TableComponent from "../../component/tables/TableComponent";

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

  const membersColumns = [
    {
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "First Name",
      accessorKey: "first_name",
    },
    {
      header: "Last Name",
      accessorKey: "last_name",
    },
    {
      header: "Age",
      accessorKey: "age",
    },
    {
      header: "Area",
      accessorKey: "area",
    },
    {
      header: "Email",
      accessorKey: "masked_email",
    },
    {
      header: "Contact Number",
      accessorKey: "contact_number",
    },
  ];

  const actions = [
    {
      label: "View",
      href: "/member/show",
      className: "btn btn-sm text-light btn-info text-nowrap",
      icon: "bi bi-eye",
    },
    {
      label: "Edit",
      href: "/member/edit",
      className: "btn btn-sm text-light btn-warning text-nowrap",
      icon: "bi bi-pencil-square",
    },
    {
      label: "Delete",
      href: "/member/delete",
      className: "btn btn-sm text-light btn-danger text-nowrap",
      icon: "bi bi-trash",
    },
  ];

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

      <TableComponent
        topComponent={
          <>
            <div className="input-group mb-3 d-flex" style={{ width: "300px" }}>
              <label className="input-group-text bg-primary text-light" htmlFor="inputGroupSelect02">
                Area
              </label>
              <select className="form-select" id="inputGroupSelect02">
                <option selected>Choose an area...</option>
                <option value="Inocencio Proper">Inocencio Proper</option>
                <option value="Tradition Homes Phase 1 and 2">
                  Tradition Homes Phase 1 and 2
                </option>
                <option value="Sampaguita Village">Sampaguita Village</option>
                <option value="Regina Ville 2000">Regina Ville 2000</option>
                <option value="BRIA Homes">BRIA Homes</option>
                <option value="South Ville Phase 1A and B">
                  South Ville Phase 1A and B
                </option>
              </select>
            </div>
          </>
        }
        title={"KK Members"}
        columns={membersColumns}
        data={membersData}
        loading={loading}
        actions={actions}
      />
    </>
  );
}

export default MembershipManagement;
