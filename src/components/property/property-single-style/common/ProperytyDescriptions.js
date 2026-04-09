import React from "react";

const ProperytyDescriptions = ({ data }) => {
  const description = data?.description || "No description available.";

  // Split description into preview and full content
  // Show first 200 characters as preview, rest in accordion
  const previewLength = 200;
  const hasMoreContent = description.length > previewLength;
  const previewText = hasMoreContent
    ? description.substring(0, previewLength) + "..."
    : description;
  const remainingText = hasMoreContent
    ? description.substring(previewLength)
    : "";

  return (
    <>
      <p className="text mb10">{hasMoreContent ? previewText : description}</p>

      {hasMoreContent && (
        <div className="agent-single-accordion">
          <div
            className="accordion accordion-flush"
            id="accordionFlushExample"
          >
            <div className="accordion-item">
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
                style={{}}
              >
                <div className="accordion-body p-0">
                  <p className="text">{remainingText}</p>
                </div>
              </div>
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button p-0 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Show more
                </button>
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProperytyDescriptions;