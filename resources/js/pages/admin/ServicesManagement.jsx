import React, { useEffect, useState } from "react";
import Breadcrumb from "../../component/ui/Breadcrumb";
import { Link } from "react-router-dom";
import { useAPI } from "../../component/contexts/ApiContext";

function ServicesManagement() {
  const { getData } = useAPI();
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const servicesType = [
    {
      name: "Resource Reservation System",
      path: "/services/resource-reservation",
    },
    {
      name: "Facility Reservation System",
      path: "/services/facility-reservation",
    },
    {
      name: "Event Registration System",
      path: "/services/event-registration",
    },
    {
      name: "Resource Lending Management System",
      path: "/services/resource-lending",
    },
    {
      name: "Volunteer Management System",
      path: "/services/volunteer-management",
    },
  ];

  useEffect(() => {
    getData(
      "rrs",
      (newData) => {
        const updatedRrsServices = newData.map((service) => ({
          ...service,
          path: `/resource-reservation/${service.id}`,
        }));
    
        setServices((prevServices) => {
          const allServices = [...prevServices, ...updatedRrsServices];
          const serviceMap = new Map();
          allServices.forEach((service) => {
            serviceMap.set(service.service_name, service); // remove duplicates
          });
          return Array.from(serviceMap.values());
        });
      },
      setLoading,
      setError
    );

    getData(
      "frs",
      (newData) => {
        const updatedRrsServices = newData.map((service) => ({
          ...service,
          path: `/facilities-reservation/${service.id}`,
        }));
    
        setServices((prevServices) => {
          const allServices = [...prevServices, ...updatedRrsServices];
          const serviceMap = new Map();
          allServices.forEach((service) => {
            serviceMap.set(service.service_name, service); // remove duplicates
          });
          return Array.from(serviceMap.values());
        });
      },
      setLoading,
      setError
    );

    getData(
      "ers",
      (newData) => {
        const updatedRrsServices = newData.map((service) => ({
          ...service,
          path: `/event-registration/${service.id}`,
        }));
    
        setServices((prevServices) => {
          const allServices = [...prevServices, ...updatedRrsServices];
          const serviceMap = new Map();
          allServices.forEach((service) => {
            serviceMap.set(service.service_name, service); // remove duplicates
          });
          return Array.from(serviceMap.values());
        });
      },
      setLoading,
      setError
    );

    getData(
      "rls",
      (newData) => {
        const updatedRrsServices = newData.map((service) => ({
          ...service,
          path: `/resource-lending/${service.id}`,
        }));
    
        setServices((prevServices) => {
          const allServices = [...prevServices, ...updatedRrsServices];
          const serviceMap = new Map();
          allServices.forEach((service) => {
            serviceMap.set(service.service_name, service); // remove duplicates
          });
          return Array.from(serviceMap.values());
        });
      },
      setLoading,
      setError
    );

    getData(
      "vs",
      (newData) => {
        const updatedRrsServices = newData.map((service) => ({
          ...service,
          path: `/volunteer/${service.id}`,
        }));
    
        setServices((prevServices) => {
          const allServices = [...prevServices, ...updatedRrsServices];
          const serviceMap = new Map();
          allServices.forEach((service) => {
            serviceMap.set(service.service_name, service);
          });
          return Array.from(serviceMap.values());
        });
      },
      setLoading,
      setError
    );
    
  }, [getData]);



  return (
    <>
      <Breadcrumb />

      <div className="container mt-5 text-center">
        {loading && <p>Loading services...</p>}
        {error && <p className="text-danger">Failed to load services.</p>}
        {/* <Link to={`/admin/services/computer`}>
          <button className="btn btn-primary btn-lg mb-4 px-5 py-1 mx-2">
            Computer Service
          </button>
        </Link>
        
        <Link to={`/admin/services/printing`}>
          <button className="btn btn-primary btn-lg mb-4 px-5 py-1 mx-2">
            Printing Service
          </button>
        </Link> */}

        {console.log(services)}
        {!showServices &&
          services.length > 0 &&
          services.map((service, index) => (
            <Link key={index} to={`/admin/services${service.path}`}>
              <button className="btn btn-primary btn-lg mb-4 px-5 py-1 mx-2">
                {service.service_name}
              </button>
            </Link>
          ))}

        <button
          className="btn btn-outline-primary btn-lg mb-4 px-5 py-1 mx-2"
          onClick={() => setShowServices(!showServices)}
        >
          {showServices ? "Back" : "Add Service"}
        </button>

        {showServices && (
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {servicesType.map((serviceType, index) => (
              <Link key={index} to={serviceType.path}>
                <button className="btn btn-secondary text-nowrap shadow-sm fs-4">
                  {serviceType.name}
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ServicesManagement;
