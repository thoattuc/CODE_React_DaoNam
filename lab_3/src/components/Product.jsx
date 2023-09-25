import React from "react";

function Product(props) {
  return (
    <div>
      <div className="card" style={{"width": "100%"}}>
        <img src="" className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.price}</p>
          <a src="#" className="btn btn-success">
            Detail
          </a>
          <a src="#" className="btn btn-primary">
            Add to card
          </a>
        </div>
      </div>
    </div>
  );
}

export default Product;
