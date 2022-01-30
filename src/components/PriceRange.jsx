import React from "react";
import "../asset/components.css";

function PriceRange({ handlePrice }) {
  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={handlePrice}>
        <div className="price-range-input-box flex">
          <div className="price-range-input flex">
            <input
              placeholder="0.00"
              type="number"
              id="search_min_price"
              step="0.01"
              min="0.000"
            />
            <label>ETH</label>
          </div>
          <div className="price-range-input flex">
            <input
              placeholder="0.00"
              type="number"
              id="search_max_price"
              step="0.01"
              required
            />
            <label>ETH</label>
          </div>
        </div>
        <div className="price-range-button-box">
          <button type="submit" className="price-range-button">Set price</button>
        </div>
      </form>
    </div>
  );
}

export default PriceRange;
