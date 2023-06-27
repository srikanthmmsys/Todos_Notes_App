import React from "react";

const AllDataDisplayComponent = (props) => {
  return (
    <div
      key={props.index}
      onClick={() => props.divtimeDisplayHandeller(props.value)}
      className="displayContainer bg-info p-3 m-1 d-flex justify-content-between"
    >
      <div>
        <h3>{props.value.headding}</h3>
        <p>{props.value.description}</p>
      </div>
      <div className="d-flex flex-column justify-content-between">
        {props.value.stared ? (
          <i
            className="bi bi-star-fill ml-3"
            onClick={() => props.onStaredHandeller(props.value)}
            style={{ fontSize: "30px", marginLeft: "20px", color: "yellow" }}
          ></i>
        ) : (
          <i
            className="bi bi-star"
            onClick={() => props.onStaredHandeller(props.value)}
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
