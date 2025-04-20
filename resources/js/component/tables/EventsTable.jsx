import React, { useEffect, useState } from "react";
import { useAPI } from "../contexts/ApiContext";
import TableComponent from "./TableComponent";
import ModalPreview from "../modals/ModalPreview";

function EventsTable({ status, hasActions }) {
  const { getData, postData, putData, deleteData } = useAPI();
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getData("events", setEventsData, setLoading, setError);
  }, [getData]);

  // const filteredEventsData = status
  // ? eventsData.filter((eventssItem) => eventssItem.status === status)
  // : eventsData;

  const actions = (eventId) => [
    {
      label: "View",
      href: `/event/show/${eventId}`,
      className: "btn btn-sm text-light btn-info text-nowrap",
      icon: "bi bi-eye",
      "data-bs-target": "viewDetailsModal"
    },
    {
      label: "Edit",
      href: `/event/edit/${eventId}`,
      className: "btn btn-sm text-light btn-warning text-nowrap",
      icon: "bi bi-pencil-square",
    },
  ];

  const eventsColumns = [
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
      <ModalPreview
        id="viewDetailsModal"
        // title={title}
        // description={description}
        // imagePreview={imagePreview}
        // currentDate={currentDate}
      />
      <TableComponent
        title={"Events"}
        columns={eventsColumns}
        data={eventsData}
        loading={loading}
        actions={hasActions ? actions : null}
      />
    </>
  );
}

export default EventsTable;
