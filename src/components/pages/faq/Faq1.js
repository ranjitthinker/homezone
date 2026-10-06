const Faq1 = () => {
  const faqItems = [
    {
      id: "headingOne",
      question: "Can a residential property depreciate in value?",
      answer:
        "While the physical building structure experiences natural age-related depreciation over decades, the underlying land value and prime location benefits typically appreciate significantly over time. Investing in reputable developments with high-quality maintenance and strong infrastructure connectivity ensures sustained long-term capital appreciation.",
    },
    {
      id: "headingTwo",
      question: "What is the difference between carpet area and super built-up area?",
      answer:
        "Carpet area is the net usable floor area bounded by the inner walls of your home. Built-up area includes the carpet area plus the thickness of exterior and internal walls and balconies. Super built-up area adds proportional shares of common building amenities, such as lift lobbies, corridors, and clubhouses.",
    },
    {
      id: "headingThree",
      question: "What role does Home Zone play during the buying process?",
      answer:
        "Home Zone acts as your dedicated real estate advisory partner. We screen and verify developer track records and RERA compliances, schedule curated property walkthroughs, assist in transparent price negotiations with zero hidden fees, and support you all the way through legal documentation and property registration.",
    },
    {
      id: "headingFour",
      question: "What essential legal documents should I verify before purchasing?",
      answer:
        "Crucial documents include the RERA Registration Certificate, Clear Title Deed, Encumbrance Certificate (EC) verifying freedom from legal liabilities, Master Building Sanction Plan approved by local development authorities, and Commencement or Occupancy Certificates (OC).",
    },
  ];

  return (
    <div className="accordion" id="accordionExample">
      {faqItems.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={item.id}>
            <button
              className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index + 1}`}
              aria-expanded={index === 0 ? "true" : "false"}
              aria-controls={`collapse${index + 1}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`collapse${index + 1}`}
            className={`accordion-collapse collapse ${
              index === 0 ? "show" : ""
            }`}
            aria-labelledby={item.id}
            data-parent="#accordionExample"
          >
            <div className="accordion-body">
              <p className="mb-0">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq1;
