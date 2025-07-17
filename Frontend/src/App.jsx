import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Area from "./Components/Area";
import DriverForm from "./Forms/DriverForm";
// import GarbageForm from "./Forms/GarbageForm";
import Garbage from "./Components/Garbage";
import Driver from "./Components/Driver";

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/area" element={<Area/>}></Route>
          <Route path="/garbage" element={<Garbage/>}></Route>
          <Route path="/driver" element={<Driver/>}></Route>
  
        </Routes>
      </Router>
    </>
  )
}

export default App
