import React from "react";
import '../../App.css'
const AllDataDisplayComponent = (props) => {
  return (
    <div
      key={props.index}
      onClick={(e) => {props.divtimeDisplayHandeller(props.value);e.stopPropagation()}}
      className="displayContainer bg-info p-3 m-1 d-flex justify-content-between"
    >
      <div className="ovScroll d-flex flex-column">
        <h3 className="ovScroll headding">{props.value.headding}</h3>
        <p className="ovScroll description">{props.value.description}</p>
      </div>
      <div className="d-flex flex-column justify-content-between">
        {props.value.stared ? (
          <i
            className="bi bi-star-fill ml-3"
            onClick={(e) => {props.onStaredHandeller(props.value);e.stopPropagation()}}
            style={{ fontSize: "30px", marginLeft: "20px", color: "yellow" }}
          ></i>
        ) : (
          <i
            className="bi bi-star"
            onClick={(e) => {props.onStaredHandeller(props.value);e.stopPropagation()}}
            style={{ fontSize: "30px", marginLeft: "20px" }}
          ></i>
        )}
        {
          <i
            className="bi bi-pencil-square text-secondary"
            onClick={() => props.editHandeller(props.value)}
            style={{ fontSize: "30px", marginLeft: "20px" }}
          ></i>
        }
        {
          <i
            className="bi bi-trash text-danger"
            onClick={() => props.deleteHandeller(props.value)}
            style={{ fontSize: "30px", marginLeft: "20px" }}
          ></i>
        }
      </div>
    </div>
  );
};

export default AllDataDisplayComponent;
