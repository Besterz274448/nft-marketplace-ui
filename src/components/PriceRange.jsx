import React from 'react'
import "../asset/components.css";

function PriceRange() {
    return (
        <div style={{width:"100%"}}>
            <div className="price-range-input-box flex">
                <input className="price-range-input" style={{width:"43%"}}/>
                <input className="price-range-input" style={{width:"43%"}}/>
            </div>
            <div className="price-range-button-box"></div>
        </div>
    )
}

export default PriceRange
