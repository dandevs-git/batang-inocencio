import React, { useEffect, useState } from "react";
import { useAPI } from "../contexts/ApiContext";
import TableComponent from "./TableComponent";

function PrintingScheduleTable({ title, status, hasActions }) {
  const { getData, postData, putData, deleteData } = useAPI();
  const [announcementsData, setAnnouncementsData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    // getData("announcements", setAnnouncementsData, setLoading, setError);
  }, [getData]);

  const filteredAnnouncementsData = status
    ? announcementsData.filter(
        (announcementsItem) => announcementsItem.status === status
      )
    : announcementsData;

  const actions = [
    {
      label: "View Details",
      href: "/member/show",
      className: "btn btn-sm text-light btn-info text-nowrap",
      icon: "bi bi-eye",
    },
  ];

  const announcementsColumns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Code",
      accessorKey: "code",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        if (status === "published") {
          return <span className="badge bg-success">Published</span>;
        } else if (status === "draft") {
          return <span className="badge bg-warning">Draft</span>;
        }
        return null;
      },
    },
  ];

  return (
    <>
      <TableComponent
        title={title}
        columns={announcementsColumns}
        data={filteredAnnouncementsData} 
        loading={loading}
        actions={hasActions && actions}
      />
    </>
  );
}

export default PrintingScheduleTable;
