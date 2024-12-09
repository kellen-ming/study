import { Outlet, NavLink   } from "react-router";  
import './App.css'

function App() {

  return (
    <>
      <h1>React v19</h1>
      <NavLink  to="/action">action</NavLink>
      <Outlet />
      
    </>
  )
}

export default App
