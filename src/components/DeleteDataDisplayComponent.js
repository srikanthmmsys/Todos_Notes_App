import React from "react";

const DeleteDataDisplayComponent = (props) => {
  return (
    <div
      key={props.index}
      className="displayContainer bg-info p-3 m-1 d-flex justify-content-between"
    >
      <div>
        <h3>{props.value.headding}</h3>
        <p>{props.value.description}</p>
      </div>
      <div className="d-flex flex-column justify-content-around">
        {
          <i
            className="bi bi-trash text-danger"
            onClick={() => props.finalDeleteHandeller(props.value)}
            style={{ fontSize: "40px", marginLeft: "20px" }}
          ></i>
        }
      </div>
    </div>
  );
};

export default DeleteDataDisplayComponent;
