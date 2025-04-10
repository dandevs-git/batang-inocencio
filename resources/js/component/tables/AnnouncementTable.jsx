import React, { useEffect, useState } from "react";
import { useAPI } from "../contexts/ApiContext";
import TableComponent from "./TableComponent";

function AnnouncementsTable({ status, hasActions }) {
  const { getData, postData, putData, deleteData } = useAPI();
  const [announcementsData, setAnnouncementsData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getData("announcements", setAnnouncementsData, setLoading, setError);
  }, [getData]);

  const filteredAnnouncementsData = status
    ? announcementsData.filter(
        (announcementsItem) => announcementsItem.status === status
      )
    : announcementsData;

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
  ];

  const announcementsColumns = [
    {
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Title",
      accessorKey: "title",
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
        title={"Announcements & Updates"}
        columns={announcementsColumns}
        data={filteredAnnouncementsData} 
        loading={loading}
        actions={hasActions && actions}
      />
    </>
  );
}

export default AnnouncementsTable;
