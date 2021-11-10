import React from "react";
import "../asset/components.css";

function PriceRange() {
  return (
    <div style={{ width: "100%" }}>
      <div className="price-range-input-box flex">
        <div className="price-range-input flex">
          <input placeholder="0.00" type="number" step="0.01"/>
          <label>ETH</label>
        </div>
        <div className="price-range-input flex">
          <input placeholder="0.00"  type="number" step="0.01" />
          <label>ETH</label>
        </div>
      </div>
      <div className="price-range-button-box">
          <button className="price-range-button">Set price</button>
      </div>
    </div>
  );
}

export default PriceRange;
