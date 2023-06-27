import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../App";
const InputDataComponent = () => {
  const navigate = useNavigate();
  const [
    todos,
    setTodos,
    addTodoHandeller,
    edit,
    setEdit,
    editmode,
    setEditMode,
  ] = useContext(context);
  const [indata, setIndata] = useState(editmode ? edit.headding : "");
  const [desc, setDesc] = useState(editmode ? edit.description : "");
  const indataHandeller = (e) => {
    setIndata(e.target.value);
  };
  const descHandeller = (e) => {
    setDesc(e.target.value);
  };

  const formSubmitHandeller = (e) => {
    e.preventDefault();
    if (!editmode) {
      let indate = new Date();
      let fullDate = `${indate.toLocaleDateString()}  ${indate.toLocaleTimeString()}`;
      let totalData = {
        headding: indata,
        description: desc,
        dt: fullDate,
        stared: false,
        deleted: false,
      };
      if (totalData.headding === "" && totalData.description === "") {
        navigate("/");
      } else {
        addTodoHandeller(totalData);
        navigate("/");
      }
    } else {
      let todoCopy = [...todos];
      const editAvalible = todoCopy.find((val) => val.dt === edit.dt);
      editAvalible.headding = indata;
      editAvalible.description = desc;
      setTodos(todoCopy);
      setEditMode(false);
      setEdit([]);
      navigate("/");
    }
  };

  return (
    <>
      <form
        id="inputDataComp"
        className="text-center container d-flex flex-column"
        onSubmit={formSubmitHandeller}
      >
        <h3 className="ml-7 text-danger">Add Notes</h3>
        <div className="ml-15">
          <label className="text-info">Headding</label>
          <input className="m-3" value={indata} onChange={indataHandeller} />
        </div>
        <div className="d-flex justify-content-center">
          <p className="text-info">Description</p>
          <textarea
            className="m-2"
            rows={10}
            cols={23}
            value={desc}
            onChange={descHandeller}
          />
        </div>
        <div className="d-flex flex-row justify-content-center m-2 ">
          <div className="ml"></div>
          <Link to="/">
            <button className="m-2 btn btn-danger">Cancel</button>
          </Link>
          <button className="m-2 btn btn-success" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default InputDataComponent;
