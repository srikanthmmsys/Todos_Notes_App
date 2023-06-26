import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../App";
import "../App.css";
import AllDataDisplayComponent from "./AllDataDisplayComponent";
import StaredDataDisplayComponent from "./StaredDataDisplayComponent";
import DeleteDataDisplayComponent from "./DeleteDataDisplayComponent";
const Home = () => {
  const navigate = useNavigate();
  const [todos, setTodos, , , setEdit, , setEditMode] = useContext(context);
  const [stared, setStared] = useState(false);
  const [all, setAll] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [timeDisplay, setTimeDisplay] = useState([]);

  const deleteHandeller = (value) => {
    let deletCopy = [...todos];
    const deleteItem = deletCopy.find((val) => val.dt === value.dt);
    deleteItem.deleted = true;
    deleteItem.stared=false;
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
  const allHandeller = (e) => {
    setAll(true);
    setDeleted(false);
    setStared(false);
  };
  const starHandeller = (e) => {
    setDeleted(false);
    setStared(true);
    setAll(false);
    setTimeDisplay([]);
  };
  const deletedHandeller = (e) => {
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

  return (
    <>
      
        <div>
          <div className=" d-flex flex-row w-50">
            <h2 className="text-dark">Notes</h2>
            <input className="widthAuto m-2 inputsearch" />
            <Link to="/add">
              <button className="btn btn-primary m-2 homeButton ">Add</button>
            </Link>
          </div>
          <div className="w-50"></div>
        </div>

        <div className="d-flex  p-1">
          <div>
            <ul>
              <li
                className={all ? "textDecoration" : ""}
                onClick={(e) => allHandeller(e)}
              >
                All ({countAll})
              </li>
              <li
                className={stared ? "textDecoration" : ""}
                onClick={(e) => starHandeller(e)}
              >
                Stared ({countStarred})
              </li>
              <li
                className={deleted ? "textDecoration" : ""}
                onClick={(e) => deletedHandeller(e)}
              >
                Deleted ({countDeleted})
              </li>
            </ul>
          </div>

          <div>
            <div className="p-3">
              {all &&
                todos.map((value, index) => {
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
            <div className=" p-3">
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
            <div className=" p-3">
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
          {countAll !== 0 ? (
            <div className="d-flex flex-column justify-content-start">
              <h1>{timeDisplay[1]}</h1>
              <p>{timeDisplay[0]}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      
    </>
  );
};

export default Home;
