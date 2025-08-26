import { useState } from "react";
import { FaFilter } from "react-icons/fa";

const Filter = ({ data, setFilteredData }) => {
  const [city, setCity] = useState("");
  const [stars, setStars] = useState("");

  const handleApplyFilter = () => {
    const filtered = data.filter((item) => {
      return (
        (city ? item.city.toLowerCase().includes(city.toLowerCase()) : true) &&
        (stars ? item.stars >= parseFloat(stars) : true)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="my-3" id="filter">
      <button
        className="btn btn-warning mb-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasFilter"
      >
        <FaFilter className="me-2" />Filter
      </button>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasFilter"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Filter Options</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Minimum Stars</label>
            <input
              type="number"
              min="0"
              max="5"
              className="form-control"
              placeholder="Min stars..."
              value={stars}
              onChange={(e) => setStars(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleApplyFilter}
            data-bs-dismiss="offcanvas"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;