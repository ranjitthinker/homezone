import React from "react";

const PropertyNearby = ({ nearbyPlaces = [] }) => {
  // Group nearby places by type
  const groupedPlaces = nearbyPlaces.reduce((acc, place) => {
    const type = place.type || "Other";
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(place);
    return acc;
  }, {});

  // Define category mapping and icons
  const categoryConfig = {
    Education: {
      title: "Education",
      icon: "fa-graduation-cap",
      fields: ["grades"],
    },
    Health: {
      title: "Health & Medical",
      icon: "fa-hospital",
      fields: [],
    },
    Transportation: {
      title: "Transportation",
      icon: "fa-bus",
      fields: [],
    },
    Shopping: {
      title: "Shopping",
      icon: "fa-shopping-cart",
      fields: [],
    },
    Other: {
      title: "Other",
      icon: "fa-map-marker",
      fields: [],
    },
  };

  // Create tabs data from grouped places
  const tabsData = Object.keys(groupedPlaces)
    .sort((a, b) => {
      // Sort by category order
      const order = ["Education", "Health", "Transportation", "Shopping", "Other"];
      return order.indexOf(a) - order.indexOf(b);
    })
    .map((type) => ({
      title: categoryConfig[type]?.title || type,
      type: type,
      icon: categoryConfig[type]?.icon || "fa-map-marker",
      details: groupedPlaces[type].sort((a, b) => a.sort_order - b.sort_order),
    }));

  // Calculate rating based on distance (optional - you can modify this logic)
  const calculateRating = (distance) => {
    const distanceValue = parseFloat(distance);
    const unit = distance.replace(/[0-9.]/g, "").trim();
    
    let meters = distanceValue;
    if (unit === "km") meters = distanceValue * 1000;
    
    if (meters <= 500) return "9";
    if (meters <= 1000) return "8";
    if (meters <= 2000) return "7";
    if (meters <= 3000) return "6";
    return "5";
  };

  // Calculate star rating based on distance
  const getStarCount = (distance) => {
    const rating = parseInt(calculateRating(distance));
    return Math.ceil(rating / 2); // Convert 10-point scale to 5-star
  };

  if (!nearbyPlaces || nearbyPlaces.length === 0) {
    return (
      <div className="col-md-12">
        <div className="text-center p-5 bg-light bdrs12">
          <p className="text-muted mb-0">No nearby places information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-12">
      <div className="navtab-style1">
        {/* <nav>
          <div className="nav nav-tabs mb20" id="nav-tab2" role="tablist">
            {tabsData.map((tab, index) => (
              <button
                key={index}
                className={`nav-link fw600 ${index === 0 ? "active" : ""}`}
                id={`nav-item${index + 1}-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#nav-item${index + 1}`}
                type="button"
                role="tab"
                aria-controls={`nav-item${index + 1}`}
                aria-selected={index === 0 ? "true" : "false"}
              >
                <i className={`fas ${tab.icon} me-2`}></i>
                {tab.title}
              </button>
            ))}
          </div>
        </nav> */}
        {/* End nav tabs */}

        <div className="tab-content" id="nav-tabContent">
          {tabsData.map((tab, index) => (
            <div
              key={index}
              className={`tab-pane fade fz15 ${
                index === 0 ? "active show" : ""
              }`}
              id={`nav-item${index + 1}`}
              role="tabpanel"
              aria-labelledby={`nav-item${index + 1}-tab`}
            >
              <div className="row">
                {tab.details.map((place, detailIndex) => {
                  const rating = calculateRating(place.distance);
                  // const starCount = getStarCount(place.distance);

                  return (
                    <div key={place.id} className="col-md-4 col-sm-6 mb20">
                      <div className="nearby d-sm-flex align-items-center h-100">
                        <div className="rating dark-color mr15 ms-1 mt10-xs mb10-xs">
                          <span className="fw600 fz14">{rating}</span>
                          <span className="text fz14">/10</span>
                        </div>
                        <div className="details flex-grow-1">
                          <p className="dark-color fw600 mb-0">{place.name}</p>
                          <p className="text mb-0">
                            Distance: {place.distance}
                            {place.grades && ` | Grades: ${place.grades}`}
                            {place.description && ` | ${place.description}`}
                          </p>
                          {/* <div className="blog-single-review">
                            <ul className="mb0 ps-0">
                              {[1, 2, 3, 4, 5].map((starIndex) => (
                                <li key={starIndex} className="list-inline-item me-0">
                                  <a href="#">
                                    <i
                                      className={`fas fa-star fz10 ${
                                        starIndex <= starCount
                                          ? "review-color2"
                                          : "text-muted"
                                      }`}
                                    />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {tab.details.length === 0 && (
                <div className="text-center p-4 bg-light bdrs12">
                  <p className="text-muted mb-0">
                    No {tab.title.toLowerCase()} facilities found nearby
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyNearby;