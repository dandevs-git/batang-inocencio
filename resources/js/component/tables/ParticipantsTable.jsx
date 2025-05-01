import React, { useEffect, useState } from "react";
import { useAPI } from "../contexts/ApiContext";
import TableComponent from "./TableComponent";
import ModalPreview from "../modals/ModalPreview";

function ParticipantsTable({
  eventName,
  eventId,
  hasActions,
  registrationType,
}) {
  const { getData } = useAPI();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint =
          registrationType === "individual" ? `participants` : `teams`;
        await getData(endpoint, setData, setLoading, setError);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, [getData, eventId, registrationType]);

  const filteredData = eventId
    ? data.filter((item) => item.event_id === eventId)
    : data;

  const actions = (id) => [
    {
      label: "View",
      onClick: () => {
        const participant = data.find((item) => item.id === id);
        setSelectedParticipant(participant);
        setShowModal(true);
      },
      className: "btn btn-sm text-light btn-info text-nowrap",
      icon: "bi bi-eye",
    },
    // {
    //   label: "Edit",
    //   href: `/admin/participants/edit/${id}`,
    //   className: "btn btn-sm text-light btn-warning text-nowrap",
    //   icon: "bi bi-pencil-square",
    // },
  ];

  const participantColumns = [
    { header: "#", cell: ({ row }) => row.index + 1 },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => `${row.original.first_name} ${row.original.last_name}`,
    },
    { header: "Email", accessorKey: "email" },
    { header: "Contact Number", accessorKey: "contact_number" },
  ];

  const teamColumns = [
    { header: "#", cell: ({ row }) => row.index + 1 },
    { header: "Team Name", accessorKey: "team_name" },
    { header: "Leader Name", accessorKey: "leader.name" },
    { header: "Leader Age", accessorKey: "leader.age" },
    { header: "Leader Contact", accessorKey: "leader.contact" },
    { header: "Leader Email", accessorKey: "leader.email" },
    {
      header: "Members Count",
      cell: ({ row }) =>
        row.original.members ? row.original.members.length : 0,
    },
  ];

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const closeModal = () => {
    setShowModal(false);
    setSelectedParticipant(null);
  };

  return (
    <>
      {showModal && selectedParticipant && (
        <ModalPreview
          header="Preview Participant"
          id="previewModal"
          title={selectedParticipant?.name}
          description={selectedParticipant?.description}
          imagePreview={selectedParticipant?.image}
          currentDate={
            selectedParticipant?.updated_at &&
            formatDate(selectedParticipant.updated_at)
          }
          onClose={closeModal}
        />
      )}
      {registrationType === "individual" ? (
        <TableComponent
          topComponent={
            <>
              <button
                className="btn btn-primary d-flex align-items-center px-4 py-2"
                // onClick={handleDownloadPDF}
              >
                <i className="bi bi-download me-2"></i> Download as PDF
              </button>
            </>
          }
          title={`Participants in ${eventName} Event`}
          columns={participantColumns}
          data={filteredData}
          loading={loading}
          actions={hasActions ? actions : null}
        />
      ) : (
        <TableComponent
          topComponent={
            <>
              <button
                className="btn btn-primary d-flex align-items-center px-4 py-2"
                // onClick={handleDownloadPDF}
              >
                <i className="bi bi-download me-2"></i> Download as PDF
              </button>
            </>
          }
          title={`Teams in ${eventName} Event`}
          columns={teamColumns}
          data={filteredData}
          loading={loading}
          actions={hasActions ? actions : null}
        />
      )}
    </>
  );
}

export default ParticipantsTable;
