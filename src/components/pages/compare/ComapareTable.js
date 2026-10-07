import Image from "next/image";

const ComapareTable = () => {
  return (
    <table className="table table-borderless mb-0">
      <thead className="t-head">
        <tr>
          <th scope="col" />
          <th scope="col">Lodha Bellissimo, Worli</th>
          <th scope="col">Godrej Woodsman, Bengaluru</th>
          <th scope="col">DLF The Camellias, Gurugram</th>
        </tr>
      </thead>
      {/* End thead */}

      <thead className="t-head2">
        <tr>
          <th scope="col" />
          {/* End th */}

          <th scope="col">
            <div className="membership_header">
              <div className="thumb">
                <Image
                  width={331}
                  height={245}
                  className="img-fluid mb-3 w100"
                  src="/images/listings/compare-1.jpg"
                  alt="Lodha Bellissimo"
                />
                <div className="h6 price mt-1">₹4.50 Cr</div>
                <p className="address mb-0">Worli, Mumbai, Maharashtra</p>
              </div>
            </div>
          </th>
          {/* End th */}

          <th scope="col">
            <div className="membership_header">
              <div className="thumb">
                <Image
                  width={331}
                  height={245}
                  className="img-fluid mb-3 w100"
                  src="/images/listings/compare-1.jpg"
                  alt="Godrej Woodsman"
                />
                <div className="h6 price mt-1">₹2.80 Cr</div>
                <p className="address mb-0">Hebbal, Bengaluru, Karnataka</p>
              </div>
            </div>
          </th>
          {/* End th */}

          <th scope="col">
            <div className="membership_header">
              <div className="thumb">
                <Image
                  width={331}
                  height={245}
                  className="img-fluid mb-3 w100"
                  src="/images/listings/compare-1.jpg"
                  alt="DLF The Camellias"
                />
                <div className="h6 price mt-1">₹8.90 Cr</div>
                <p className="address mb-0">Golf Course Rd, Gurugram, Haryana</p>
              </div>
            </div>
          </th>
          {/* End th */}
        </tr>
      </thead>
      {/* End thead2 */}

      <tbody className="t-body">
        <tr>
          <th className="text-end" scope="row">
            Property Type
          </th>
          <td>Luxury Apartment</td>
          <td>Premium Flat</td>
          <td>Ultra Luxury Suite</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Address
          </th>
          <td>Dr E Moses Rd, Worli</td>
          <td>Bellary Rd, Hebbal</td>
          <td>Golf Course Road, Sector 42</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            City
          </th>
          <td>Mumbai</td>
          <td>Bengaluru</td>
          <td>Gurugram</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            State/county
          </th>
          <td>Maharashtra</td>
          <td>Karnataka</td>
          <td>Haryana</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Zip/Postal Code
          </th>
          <td>400018</td>
          <td>560024</td>
          <td>122002</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Country
          </th>
          <td>India</td>
          <td>India</td>
          <td>India</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Property Size
          </th>
          <td>2,450 Sq Ft</td>
          <td>1,980 Sq Ft</td>
          <td>4,200 Sq Ft</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Property ID
          </th>
          <td>HZ-1082</td>
          <td>HZ-1045</td>
          <td>HZ-2090</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Bedrooms
          </th>
          <td>3 BHK</td>
          <td>3 BHK</td>
          <td>4 BHK</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Bathrooms
          </th>
          <td>3</td>
          <td>3</td>
          <td>5</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Garage
          </th>
          <td>2 Covered</td>
          <td>2 Covered</td>
          <td>3 Covered</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Air Conditioning
          </th>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Barbeque
          </th>
          <td>
            <span className="check_circle_close">
              <span className="fas fa-xmark" />
            </span>
          </td>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Gym
          </th>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Swimming Pool
          </th>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Power Backup
          </th>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
          <td>
            <span className="check_circle">
              <span className="fas fa-check" />
            </span>
          </td>
        </tr>
        {/* End tr */}
      </tbody>
    </table>
  );
};

export default ComapareTable;
