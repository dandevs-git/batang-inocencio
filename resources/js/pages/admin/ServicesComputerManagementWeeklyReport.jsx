import React, { useEffect, useState } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import { useAPI } from "../../component/contexts/ApiContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ServicesComputerManagementWeeklyReport() {
  const { postData, getData } = useAPI();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getData(
      "available-resources/computer-reservations-weekly",
      setData,
      setLoading,
      setError
    );
  }, []);

  const total = data.reduce((sum, item) => sum + item.reservationCount, 0);

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();

    // Check if data is available
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }

    // Add the header image
    const headerImageUrl = `${window.location.origin}/images/MembersPdfHeader.png`;
    const img = new Image();
    img.src = headerImageUrl;

    img.onload = () => {
      doc.addImage(img, "PNG", 10, 0, 190, 40); // Add the header image to the PDF

      doc.setFontSize(14);
      doc.text(
        "Computer Reservations Weekly Report (" + new Date().toISOString().split("T")[0] + ")",
        14,
        50
      );

      doc.setFontSize(12);
      doc.text(`Total Reservations: ${total}`, 14, 60);

      // Create the table with autoTable
      autoTable(doc, {
        head: [
          ["Week", "Number of Reservations"], // Table header
        ],
        body: data.map((entry) => [
          `${new Date(entry.start).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })} - ${new Date(entry.end).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`,
          entry.reservationCount,
        ]),
        startY: 70, // Start the table below the title and other text
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] },
      });

      doc.save("weekly_report.pdf");
    };

    img.onerror = () => {
      console.error("Failed to load header image.");
      alert("Failed to load header image. Cannot generate PDF.");
    };
  };

  return (
    <>
      <Breadcrumb />
      <div className="text-start mb-3">
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline-primary py-1"
        >
          <i className="bi bi-arrow-left-short"></i> Go back
        </button>
      </div>
      <div className="container mt-5">
        <div className="card shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body">
            <h1 className="text-center fs-4 fw-bold mb-2">WEEKLY REPORT</h1>
            <p className="text-center mb-4">
              Weekly Report - Monday, June 24, 2024 to Friday, July 5, 2024
            </p>

            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <>
                <div className="d-flex justify-content-center mb-4">
                  <button
                    className="btn btn-success text-light rounded-pill px-4"
                    onClick={handleDownloadPDF} // Link the download button to the PDF function
                  >
                    Download PDF
                  </button>
                </div>

                <table className="table table-bordered text-center">
                  <thead className="table-primary">
                    <tr>
                      <th>Week</th>
                      <th>Number of Reservations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((entry, index) => (
                      <tr key={index}>
                        <td>
                          {`${new Date(entry.start).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })} - ${new Date(entry.end).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}`}
                        </td>
                        <td>{entry.reservationCount}</td>
                      </tr>
                    ))}
                    <tr className="fw-bold bg-light">
                      <td>Total for the Week</td>
                      <td>{total}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesComputerManagementWeeklyReport;
