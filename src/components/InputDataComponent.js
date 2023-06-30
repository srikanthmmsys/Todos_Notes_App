import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
const InputDataComponent = ({todos,setTodos,addTodoHandeller,edit,setEdit,editmode,setEditMode,mainSearch,setMainSearch}) => {
  const navigate = useNavigate();
  const [indata, setIndata] = useState(editmode ? edit.headding : mainSearch);
  const [desc, setDesc] = useState(editmode ? edit.description : '');
  const [inputExist,setInputExist]=useState(false)
  const [errorMessage,setErrorMessage]=useState('')
  const indataHandeller = (e) => {
    setIndata(e.target.value);
    let copyTodo=[...todos]
    let mapItem=copyTodo.map((val)=>val.headding)
    setInputExist(mapItem.includes(e.target.value))
    if(mapItem.includes(e.target.value)){
      setErrorMessage('*Data allready exist')
    }
    else{
      setErrorMessage("")
    }
  };

  const descHandeller = (e) => {
    setDesc(e.target.value);
  };

  const formSubmitHandeller = (e) => {
    e.preventDefault();
    if (!editmode) {
      let indate = new Date();
      let fullDate = `${indate.toLocaleDateString()}  ${indate.toLocaleTimeString()}`;
      let totalData = {headding: indata.replace(/\s+/g,' '),description: desc.replace(/\s+/g,' '),dt: fullDate,stared: false,deleted: false};
  
      if(totalData.headding === ""||totalData.description==="") {
        navigate("/");
      }
      else if(totalData.headding === " "||totalData.description===' ') {
        navigate("/");
      }
      else {
        addTodoHandeller(totalData);
        setMainSearch('');
        setEdit([]);
        setErrorMessage('')
        navigate("/");
      }
    } 
    else {
      let todoCopy = [...todos];
      const editAvalible = todoCopy.find((val) => val.dt === edit.dt);
      editAvalible.headding = indata.replace(/\s+/g,' ');
      editAvalible.description = desc.replace(/\s+/g,' ');
      setTodos(todoCopy);
      setEditMode(false);
      setEdit([]);
      setErrorMessage('')
      setMainSearch('');
      navigate("/");
    }
  };
const cancelHandeller=()=>{
  setEditMode(false);
      setEdit([]);
      setMainSearch('');
      setErrorMessage('')
      navigate("/");
}

  return (
    <>
      <form
        id="inputDataComp"
        className="text-center container-fluid card d-flex flex-column"
        onSubmit={formSubmitHandeller}>
          
            <h3 className="d-flex flex-row justify-content-center text-danger">Add Notes</h3>
          
        <div className="ml-15">
          {/* <div className="d-flex justify-content-center"> */}
            <div className="text-danger">{errorMessage}</div>
            {/* <button  className={editButtonHide ? "btn btn-warning":"btn btn-warning d-none"} onClick={splEditButtonHandeller}>Edit</button> */}
          </div>
          <label className="text-info d-flex align-left">Headding</label>
          <input className="" value={indata} onChange={indataHandeller} />
        {/* </div> */}
        {/* <div className="d-flex justify-content-center"> */}
          <label className="text-info  d-flex align-left">Description</label>
          <textarea
            className=""
            rows={5}
            // cols={22}
            value={desc}
            onChange={descHandeller}
          />
        {/* </div> */}
        <div className="d-flex flex-row justify-content-center m-2 ">
          <button className="m-2 btn btn-success" type="submit" disabled={inputExist}>
            {editmode?"Save":"Add"}
          </button>
            <button className="m-2 btn btn-danger" onClick={cancelHandeller}>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default InputDataComponent;
