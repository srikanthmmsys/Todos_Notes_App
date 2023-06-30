import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import AllDataDisplayComponent from "./displayComponents/AllDataDisplayComponent";
import StaredDataDisplayComponent from "./displayComponents/StaredDataDisplayComponent";
import DeleteDataDisplayComponent from "./displayComponents/DeleteDataDisplayComponent";

const Home = ({todos,setTodos,setEdit,setEditMode,mainSearch,setMainSearch,setSearchEdit}) => {
  const navigate = useNavigate();
  const [stared, setStared] = useState(false);
  const [all, setAll] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [timeDisplay, setTimeDisplay] = useState([]);
  const [addBtnDisabled, setAddBtnDisabled] = useState(false);
  const deleteHandeller = (value) => {
    let deletCopy = [...todos];
    const deleteItem = deletCopy.find((val) => val.dt === value.dt);
    deleteItem.deleted = true;
    deleteItem.stared = false;
    setTodos(deletCopy);
  };
  const finalDeleteHandeller = (value) => {
    let a = todos.filter((val) => {
      return val.dt !== value.dt;
    });
    setTodos(a);
  };
  const editHandeller = (value) => {
    setEdit(value);
    setEditMode(true);
    navigate("/add");
  };
  const allHandeller = () => {
    setAll(true);
    setDeleted(false);
    setStared(false);
  };
  const starHandeller = () => {
    setDeleted(false);
    setStared(true);
    setAll(false);
    setTimeDisplay([]);
  };
  const deletedHandeller = () => {
    setDeleted(true);
    setAll(false);
    setStared(false);
    setTimeDisplay([]);
  };
  const onStaredHandeller = (value) => {
    let todoscopy = [...todos];
    const temintodoCopy = todoscopy.find((item) => item.dt === value.dt);
    temintodoCopy.stared = !temintodoCopy.stared;
    setTodos(todoscopy);
  };
  const divtimeDisplayHandeller = (value) => {
    setTimeDisplay([value.dt, value.headding]);
  };

  let countStarred = todos.reduce((acc, b) => {
    if (b.stared) {
      acc += 1;
    }
    return acc;
  }, 0);
  let countDeleted = todos.reduce((acc, b) => {
    if (b.deleted) {
      acc += 1;
    }
    return acc;
  }, 0);
  let countAll = todos.reduce((acc, b) => {
    if (!b.deleted) {
      acc += 1;
    }
    return acc;
  }, 0);

  let search = todos.filter((value) =>
    value.headding.toLowerCase().includes(mainSearch.toLowerCase())
  );
  let fil = !search ? todos : search;
  const addDataHandeller = () => {
    if (!mainSearch) {
      navigate("/add");
    } else if (search.length > 0) {
      let searchTodo = todos.find((value) => value.headding === mainSearch);
      if (!searchTodo) {
        //     setErrorMessage('data allready exist want to edit then edit the data')
        //     setEdit(searchTodo);
        // setEditMode(true);
        // navigate("/add");
        // setAddBtnDisabled(true)
        setSearchEdit(mainSearch);
        navigate("/add");
      } 
      // else {
        
      // }
    } else {
      setSearchEdit(mainSearch);
      navigate("/add");
    }
  };
  const mainSearchHandeller = (e) => {
    setMainSearch(e.target.value);
    let todocop = [...todos];
    let headds = todocop.map((val) => val.headding);
    setAddBtnDisabled(headds.includes(e.target.value));
  };
  return (
    <>
      <div>
        <div className=" d-flex flex-row w-50">
          <h2 className="text-dark">Notes</h2>
          <input
            className="widthAuto m-2 inputsearch"
            value={mainSearch}
            onChange={(e) => mainSearchHandeller(e)}
          />
          <button
            className="btn btn-primary m-2 homeButton "
            disabled={addBtnDisabled}
            onClick={addDataHandeller}
          >
            Add
          </button>
        </div>
        <div className="w-50"></div>
      </div>
      <div className="d-flex  p-1">
        <div>
          <ul>
            <li className={all ? "textDecoration" : ""}onClick={(e) => allHandeller(e)}> All ({countAll})</li>
            <li className={stared ? "textDecoration" : ""}onClick={(e) => starHandeller(e)}>Stared ({countStarred})</li>
            <li className={deleted ? "textDecoration" : ""}onClick={(e) => deletedHandeller(e)}>Deleted ({countDeleted})</li>
          </ul>
        </div>
        <div>
          <div className="pl-3">
            {all &&
              fil.map((value, index) => {
                if (!value.deleted) {
                  return (
                    <AllDataDisplayComponent
                      key={index}
                      value={value}
                      index={index}
                      divtimeDisplayHandeller={divtimeDisplayHandeller}
                      editHandeller={editHandeller}
                      deleteHandeller={deleteHandeller}
                      onStaredHandeller={onStaredHandeller}
                    />
                  );
                } else {
                  return null;
                }
              })}
          </div>
          <div className=" pl-3">
            {stared &&
              todos.map((value, index) => {
                if (value.stared) {
                  return (
                    <StaredDataDisplayComponent
                      key={index}
                      value={value}
                      index={index}
                      deleteHandeller={deleteHandeller}
                      onStaredHandeller={onStaredHandeller}
                    />
                  );
                }
                return null;
              })}
          </div>
          <div className=" pl-3">
            {deleted &&
              todos.map((value, index) => {
                if (value.deleted) {
                  return (
                    <DeleteDataDisplayComponent
                      key={index}
                      value={value}
                      index={index}
                      finalDeleteHandeller={finalDeleteHandeller}
                    />
                  );
                }
                return null;
              })}
          </div>
        </div>
        {countAll !== 0 ? (<div className="d-flex flex-column justify-content-start ml-7 ovScroll"
          style={{ position: "fixed", right: "20%", top: "10%" }}>
            <h1 style={{overflow:"hidden",width:'300px',height:'41px'}}>{timeDisplay[1]}</h1>
            <p>{timeDisplay[0]}</p>
          </div>) : ("")}
      </div>
    </>
  );
};

export default Home;
