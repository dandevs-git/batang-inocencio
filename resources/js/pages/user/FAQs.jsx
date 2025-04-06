import React from "react";

const faqItems = [
  {
    question:
      "What is Batang Inocencio, and how is it connected to SK of Brgy. Inocencio?",
    answer:
      "Batang Inocencio is an organization dedicated to empowering the youth of Barangay Inocencio. It is affiliated with the Sangguniang Kabataan (SK) of Brgy. Inocencio and works closely with them to provide programs, activities, and services that benefit young individuals in the community.",
  },
  {
    question: "How can I become a member of Batang Inocencio?",
    answer:
      "To become a member, you must be a resident of Barangay Inocencio and meet the age requirements. Registration is available through our website or by visiting the SK office.",
  },
  {
    question: "What programs does Batang Inocencio offer?",
    answer:
      "Batang Inocencio offers leadership training, educational assistance, sports programs, community outreach, and other youth development initiatives.",
  },
  {
    question: "How can I contact Batang Inocencio for inquiries?",
    answer:
      "You can contact us through our official Facebook page, email, or by visiting the SK office at Barangay Inocencio Hall.",
  },
];

function FAQs() {
  return (
    <>
      <div
        className="container-fluid p-0 position-relative mb-5"
        style={{ height: "500px", overflow: "hidden" }}
      >
        <img
          src={'/storage/images/Announcement1.png'}
          className="img-fluid w-100 h-100 object-fit-fill"
          alt="Announcement"
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
        <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
          <h1 className="display-1 fw-bold text-uppercase text-nowrap">
            Frequently Asked Questions
          </h1>
          <p className="fs-4">
            Got a question? We’re here to answer! If you don’t see your question
            here, drop us a line in our contact information or send us a
            feedback.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="accordion" id="faqAccordion">
          {faqItems.map((item, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button fw-semibold ${
                    index !== 0 ? "collapsed" : ""
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse${index}`}
                >
                  <i className="bi bi-question"></i> {item.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${
                  index === 0 ? "show" : ""
                }`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQs;
