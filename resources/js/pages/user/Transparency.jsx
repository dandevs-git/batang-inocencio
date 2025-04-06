import React from "react";

const reportsData = [
  {
    title: "APPROVED RESOLUTIONS",
    content: (
      <ul>
        <li>Resolution No.1 s2023 - SK Secretary</li>
        <li>Resolution No.2 s2023 - SK Treasurer</li>
        <li>Resolution No.3 s2023 - SK Official Logo</li>
        <li>Resolution No.4 s2023 - SK Committees</li>
        <li>Resolution No.5 s2023 - Annual Budget</li>
        <li>Resolution No.6 s2023 - ABYIP</li>
        <li>Resolution No.7 s2023 - CBYDP</li>
        <li>Resolution No.8 s2023 - SK Duties</li>
        <li>Resolution No.1 s2024 - Internal Rules of Procedure</li>
        <li>Resolution No.2 s2024</li>
      </ul>
    ),
  },
  {
    title: "QUARTERLY REPORTS",
    content: (
      <p>
        Quarterly Reports content goes here. You can provide downloadable links
        or summaries.
      </p>
    ),
  },
  {
    title: "ANNUAL REPORTS",
    content: (
      <p>
        Annual Reports content goes here. Include stats, achievements, and
        financial breakdowns.
      </p>
    ),
  },
  {
    title: "FINANCIAL REPORTS",
    content: (
      <p>
        Financial Reports content goes here. Summarize budgets, expenses, and
        balances.
      </p>
    ),
  },
  {
    title: "RESOURCE REPORTS",
    content: (
      <p>
        Resource Reports content goes here. List resources acquired, donated, or
        distributed.
      </p>
    ),
  },
  {
    title: "PROJECT REPORTS",
    content: (
      <p>
        Project Reports content goes here. Highlight completed and ongoing
        projects with outcomes.
      </p>
    ),
  },
];


function Transparency() {
  return (
    <>
      <div
        className="container-fluid p-0 position-relative"
        style={{ height: "500px", overflow: "hidden" }}
      >
        <img
          src="/storage/images/transparency-header.png"
          className="img-fluid w-100 h-100 object-fit-fill"
          alt="Membership Image"
        />
      </div>

      <div className="text-bg-primary text-center py-3 fs-4 fw-semibold mb-5">
        2nd Floor, City Hall Bldg., Governor’s Drive, Brgy. Inocencio, Trece
        Martires City, Cavite
      </div>

      <div className="container">
        <div className="accordion" id="faqAccordion">
          {reportsData.map((report, index) => {
            const collapseId = `collapse${index}`;
            const headingId = `heading${index}`;
            const isFirst = index === 0;

            return (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={headingId}>
                  <button
                    className={`accordion-button fw-semibold ${
                      !isFirst ? "collapsed" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded={isFirst ? "true" : "false"}
                    aria-controls={collapseId}
                  >
                    {report.title}
                  </button>
                </h2>
                <div
                  id={collapseId}
                  className={`accordion-collapse collapse ${
                    isFirst ? "show" : ""
                  }`}
                  aria-labelledby={headingId}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">{report.content}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Transparency;
