import './App.css';
import BackToTop from './components/BacktoTop';
import Navbar from './components/Navbar';
import Table from './components/Table';
import Forecast from './components/Forecast';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import MyFavoraites from './components/MyFavoraites';


function App() {
  return (
  <><Navbar />
  <Router>
  <Routes>
  <Route path="/" element={<Table/>} />
  <Route path="/forecast/:cityName" element={<Forecast />} />
  <Route path="/signup" element={<Signup/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/my-favoraites" element={<MyFavoraites/>}/>

  </Routes>
  </Router>
  <BackToTop/></>
  );
}

export default App;
