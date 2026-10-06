const Faq2 = () => {
  const faqItems = [
    {
      id: "headingOne2",
      question: "How do home loan interest rates and EMI calculations work?",
      answer:
        "Home loans are available in fixed and floating rate options. Floating rates are benchmarked to the central bank repo rate, typically offering lower interest burdens. Leading financial institutions generally finance between 75% and 80% of the property agreement value based on your eligibility and credit score.",
    },
    {
      id: "headingTwo2",
      question: "What additional costs should buyers factor into their budget?",
      answer:
        "In addition to the base property cost, buyers should budget for Government Stamp Duty and Registration charges (varying between 5% and 7% depending on the state), GST applicable on under-construction units, advance maintenance deposits, and clubhouse development fees.",
    },
    {
      id: "headingThree2",
      question: "Can NRI investors purchase residential and commercial property?",
      answer:
        "Yes. Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) can freely acquire residential and commercial properties under general RBI permission. Transactions are seamlessly processed through standard NRE/NRO banking channels with complete repatriation compliance.",
    },
    {
      id: "headingFour2",
      question: "How does Home Zone verify that listed properties are authentic?",
      answer:
        "Our legal and market research specialists vet developer track records, confirm approved floor layouts with municipal development authorities, and verify RERA certificates directly before featuring any property on Home Zone.",
    },
  ];

  return (
    <div className="accordion" id="accordionExample2">
      {faqItems.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={item.id}>
            <button
              className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapseTwo${index + 1}`}
              aria-expanded={index === 0 ? "true" : "false"}
              aria-controls={`collapseTwo${index + 1}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`collapseTwo${index + 1}`}
            className={`accordion-collapse collapse ${
              index === 0 ? "show" : ""
            }`}
            aria-labelledby={item.id}
            data-parent="#accordionExample2"
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

export default Faq2;
