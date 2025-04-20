import React, { useEffect, useState } from "react";
import { useAPI } from "../contexts/ApiContext";
import TableComponent from "./TableComponent";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import ModalPreview from "../modals/ModalPreview";

function AnnouncementsTable({ status, hasActions }) {
  const { getData, postData, putData, deleteData } = useAPI();
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    getData("announcements", setAnnouncementsData, setLoading, setError);
  }, [getData]);

  const filteredAnnouncementsData = status
    ? announcementsData.filter(
        (announcementsItem) => announcementsItem.status === status
      )
    : announcementsData;

  const actions = (id) => [
    {
      label: "View",
      onClick: () => {
        const announcementsItem = announcementsData.find((item) => item.id === id);
        setSelectedAnnouncement(announcementsItem);
        setTimeout(() => {
          const modalElement = document.getElementById("previewModal");
          if (modalElement) {
            const modal = new Modal(modalElement);
            modal.show();
          }
        }, 0);
      },
      
      className: "btn btn-sm text-light btn-info text-nowrap",
      icon: "bi bi-eye",
    },
    {
      label: "Edit",
      href: `/member/edit/${id}`,
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

  const formattedDate =
    selectedAnnouncement?.updated_at &&
    new Date(selectedAnnouncement.updated_at).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <>
      {/* Conditionally render the preview modal only if there is a selectedAnnouncement */}
      {selectedAnnouncement && (
        <ModalPreview
          header="Preview Announcement"
          id="previewModal"
          title={selectedAnnouncement?.title}
          description={selectedAnnouncement?.description}
          imagePreview={selectedAnnouncement?.image}
          currentDate={formattedDate}
        />
      )}

      <TableComponent
        title={"Announcements & Updates"}
        columns={announcementsColumns}
        data={filteredAnnouncementsData}
        loading={loading}
        actions={hasActions ? actions : null} // Only pass actions if `hasActions` is true
      />
    </>
  );
}

export default AnnouncementsTable;
