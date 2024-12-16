import { Outlet, NavLink   } from "react-router";  
import './App.css'

function App() {

  return (
    <>
      <h1>React v19</h1>
      <div className="nav-link">
        <NavLink to="/action">action</NavLink>
        <NavLink to="/hooks">hooks</NavLink>
      </div>
      <Outlet />
    </>
  )
}

export default App
