import React, { useEffect, useState } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import ComputerRentCalendar from "../../component/ComputerRentCalendar";
import ComputerRentTable from "../../component/tables/ComputerRentTable";
import { useAPI } from "../../component/contexts/ApiContext";

function ServicesComputerManagement() {
  const { getData } = useAPI();
  const [selectedPC, setSelectedPC] = useState(null);
  const [pcAvailability, setPcAvailability] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const timeOptions = [
    { slot: "08:00 AM - 10:00 AM" },
    { slot: "10:00 AM - 12:00 PM" },
    { slot: "01:00 PM - 03:00 PM" },
    { slot: "03:00 PM - 05:00 PM" },
    { slot: "05:00 PM - 07:00 PM" },
  ];

  useEffect(() => {
    getData(
      "available-resources/computer",
      setPcAvailability,
      setLoading,
      setError
    );
    getData("computer-services", setReservations, setLoading, setError);
  }, [getData]);

  return (
    <>
      <Breadcrumb />
      <ComputerRentCalendar
        pcAvailability={pcAvailability}
        timeOptions={timeOptions}
      />
      <div className="mt-5">
        {selectedPC && (
          <div className="text-center mt-5">
            <ComputerRentTable
              title={"Computer Rentals for " + selectedPC.name}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ServicesComputerManagement;
