import React, { createContext ,useState } from 'react'
import Home from './components/Home'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import InputDataComponent from './components/InputDataComponent'
export const context=createContext();
const App = () => {
  const [edit,setEdit]=useState([]);
  const [editmode,setEditMode]=useState(false);
  const [todos, setTodos] = useState([]);
  const [mainSearch, setMainSearch] = useState("");
  const [searchEdit,setSearchEdit]=useState([])
  const addTodoHandeller = (totalData) => {
    setTodos([...todos, totalData]);
  };
 
  return (
    <div className='background'>
      <Routes>
        <Route path='/' element={<Home todos={todos} setTodos={setTodos} setEdit={setEdit} setEditMode={setEditMode} mainSearch={mainSearch} setMainSearch={setMainSearch} setSearchEdit={setSearchEdit} />} />
        <Route path='/add' element={<InputDataComponent todos={todos} setTodos={setTodos} addTodoHandeller={addTodoHandeller} edit={edit} setEdit={setEdit} editmode={editmode} setEditMode={setEditMode} mainSearch={mainSearch} setMainSearch={setMainSearch} searchEdit={searchEdit}/>}/>
      </Routes>
    </div>
  )
}

export default App
