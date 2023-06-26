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
  const addTodoHandeller = (totalData) => {
    setTodos([...todos, totalData]);
  };
 
  return (
    <div className='background'>
      <context.Provider value={[todos,setTodos,addTodoHandeller,edit,setEdit,editmode,setEditMode]}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<InputDataComponent />}/>
      </Routes>
      </context.Provider>
    </div>
  )
}

export default App
