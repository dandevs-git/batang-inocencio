import React, { useEffect, useState } from "react";
import { useAPI } from "../contexts/ApiContext";
import TableComponent from "./TableComponent";
import ModalPreview from "../modals/ModalPreview";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

function ParticipantsTable({ eventId, status, hasActions }) {
  const { getData } = useAPI();
  const [participantsData, setParticipantsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showModal, setShowModal] = useState(false); // To control modal visibility

  useEffect(() => {
    // Fetch participants for the selected event
    getData(
      `participants${eventId}`,
      setParticipantsData,
      setLoading,
      setError
    );
  }, [getData, eventId]);

  // Filter participants data if status is provided
  const filteredParticipantsData = status
    ? participantsData.filter((participant) => participant.status === status)
    : participantsData;

  // Actions array for buttons (view, edit)
  const actions = (id) => [
    {
      label: "View",
      onClick: () => {
        const participant = participantsData.find((item) => item.id === id);
        setSelectedParticipant(participant);
        setShowModal(true); // Open the modal
      },
      className: "btn btn-sm text-light btn-info text-nowrap",
      icon: "bi bi-eye",
    },
    {
      label: "Edit",
      href: `/admin/participants/edit/${id}`,
      className: "btn btn-sm text-light btn-warning text-nowrap",
      icon: "bi bi-pencil-square",
    },
  ];

  // Participant columns configuration
  const participantsColumns = [
    {
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        if (status === "active") {
          return <span className="badge bg-success">Active</span>;
        } else if (status === "inactive") {
          return <span className="badge bg-warning">Inactive</span>;
        }
        return null;
      },
    },
  ];

  const formattedDate =
    selectedParticipant?.updated_at &&
    new Date(selectedParticipant.updated_at).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedParticipant(null); // Reset selected participant when closing the modal
  };

  return (
    <>
      {/* Preview Modal */}
      {showModal && selectedParticipant && (
        <ModalPreview
          header="Preview Participant"
          id="previewModal"
          title={selectedParticipant?.name}
          description={selectedParticipant?.description}
          imagePreview={selectedParticipant?.image}
          currentDate={formattedDate}
          onClose={closeModal} // Close the modal on close button click
        />
      )}

      {/* Participants Table */}
      <TableComponent
        title="Participants"
        columns={participantsColumns}
        data={filteredParticipantsData}
        loading={loading}
        actions={hasActions ? actions : null} // Show actions only if hasActions is true
      />
    </>
  );
}

export default ParticipantsTable;
