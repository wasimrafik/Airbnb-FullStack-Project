import Header from "./component/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/login/Login";
import Footer from "./component/footer/Footer";
import HomePage from "./component/HomePage/HomePage";
import Register from "./component/login/Register";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

export default function App() {
  return (
    <div className="p-4 flex flex-col min-h-screen">
    <Router>
          <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>  
      <Footer />
    </Router>
    </div>
  )
}