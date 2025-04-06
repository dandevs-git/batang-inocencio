import React from "react";

function About() {
  const orgMembers = [
    {
      name: "Hon. Krisha Shane Atas",
      position: "SK Chairperson",
      image: "/orgchart1.png",
      isPrimary: true,
    },
    {
      name: "Ronavie Larong",
      position: "SK Secretary",
      image: "/orgchart2.png",
    },
    {
      name: "Zachary James Jamora",
      position: "SK Treasurer",
      image: "/orgchart3.png",
    },
    {
      name: "Hon. John Paulo Ulep",
      position: "Committee in Youth Employment and Livelihood",
      image: "/orgchart4.png",
    },
  ];

  return (
    <>
      <div
        className="container-fluid p-0 position-relative mb-5"
        style={{ height: "500px", overflow: "hidden" }}
      >
        <img
          src="/Announcement1.png"
          className="img-fluid w-100 h-100 object-fit-fill"
          alt="Announcement"
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
        <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
          <h1 className="display-1 fw-bold text-uppercase text-nowrap">
            About us
          </h1>
          <p className="fs-4">
            Got a question? We’re here to answer! If you don’t see your question
            here, drop us a line in our contact information or send us feedback.
          </p>
        </div>
      </div>

      <div className="container pb-5">
        <div className="container text-center my-5">
          <h5 className="section-title text-primary">Our Purpose</h5>
          <h2 className="main-heading mt-3 text-dark">Mission & Vision</h2>
          <p className="sub-text mt-3">
            Discover the guiding principles behind the Batang Inocencio Youth
            Organization's work in the community. Our mission and vision focus
            on empowering youth and creating a positive impact.
          </p>
        </div>

        <div className="row m-0 text-center d-flex align-items-stretch">
          <div className="col-lg-6 col-md-12">
            <div className="border-top shadow rounded-4 d-flex flex-column p-4 bg-gradient h-100">
              <div className="fs-2 fw-bold text-primary mb-3">Mission</div>
              <p className="fs-5 my-auto fst-italic text-muted">
                The Mission of Batang Inocencio Youth Organization is to provide
                a safe and supportive environment for young people to learn and
                grow. These organizations often focus on developing leadership
                skills, promoting community service, and fostering positive
                social connections among youth. By providing these
                opportunities, youth organizations aim to empower young people
                to become engaged and responsible members of their communities.
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="border-top shadow rounded-4 d-flex flex-column p-4 bg-gradient h-100">
              <div className="fs-2 fw-bold text-primary mb-3">Vision</div>
              <p className="fs-5 my-auto fst-italic text-muted">
                The Vision of Batang Inocencio Youth Organization is to create a
                world where all young people feel empowered to reach their full
                potential and make positive contributions to society.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="fs-1 fw-bold text-center mb-5">
          Organizational Chart
        </div>

        {/* Primary Member Row */}
        <div className="row justify-content-center mb-5">
          {orgMembers
            .filter((member) => member.isPrimary)
            .map((member, index) => (
              <div
                key={`primary-${index}`}
                className="col-lg-4 col-md-6 text-center mb-4"
              >
                <div
                  className="card shadow rounded-4 p-3 border h-100 text-light"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(var(--bs-info-rgb)), rgba(0,0,0,0))",
                  }}
                >
                  <div className="card-body">
                    <img
                      src={`/storage/images/${member.image}`}
                      className="img-fluid rounded-circle mb-3 border-5 border border-light"
                      style={{
                        width: "150px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      alt={member.name}
                    />
                    <h4 className="fw-semibold">{member.name}</h4>
                    <p className="text-muted mb-0">{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="row justify-content-center g-5">
          {orgMembers
            .filter((member) => !member.isPrimary)
            .map((member, index) => (
              <div
                key={`other-${index}`}
                className="col-lg-4 col-md-6 text-center mb-4"
              >
                <div
                  className="card shadow rounded-4 p-3 border h-100 text-light"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(var(--bs-success-rgb)), rgba(0,0,0,0))",
                  }}
                >
                  <div className="card-body">
                    <img
                      src={`/storage/images/${member.image}`}
                      className="img-fluid rounded-circle mb-3 border-5 border border-light"
                      style={{
                        width: "130px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                      alt={member.name}
                    />
                    <h4 className="fw-semibold">{member.name}</h4>
                    <p className="text-muted mb-0">{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default About;
