import React, { useEffect, useState } from "react";
import { useAPI } from "../contexts/ApiContext";
import TableComponent from "./TableComponent";

function PrintingScheduleTable({ title, status, hasActions }) {
  const { getData, postData, putData, deleteData } = useAPI();
  const [printingScheduleData, setprintingScheduleData] = useState("");
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

  const actions = (e) => [
    {
      label: "View Details",
      href: "/member/show",
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

  return (
    <>
      <TableComponent
        title={title}
        columns={printingScheduleColumns}
        data={filteredprintingScheduleData} 
        loading={loading}
        actions={hasActions && actions}
      />
    </>
  );
}

export default PrintingScheduleTable;
