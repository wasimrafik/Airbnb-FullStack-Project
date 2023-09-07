import Header from "./component/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/login/Login";
import Footer from "./component/footer/Footer";
import HomePage from "./component/HomePage/HomePage";
import Register from "./component/login/Register";
import axios from "axios";
import { UserContextProvider } from "./component/userContext/UserContext";
import ProfilePage from "./component/HomePage/user/ProfilePage";
import Places from "./component/HomePage/places/Places";
import PlacesFormPage from "./component/HomePage/places/PlacesFormPage";
import PlaceDetailPage from "./component/HomePage/places/PlaceDetailPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <div className="p-4 px-8 flex flex-col min-h-screen">
    
    <Router>
       <UserContextProvider>
          <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/account" element={<ProfilePage />}/>
        <Route path="/account/places" element={<Places  />}/>
        <Route path="/account/places/new" element={<PlacesFormPage />}/>
        <Route path="/account/places/:id" element={<PlacesFormPage />}/>
        <Route path="/place/:id" element={<PlaceDetailPage />}/>
      </Routes>  
      <Footer />
      </UserContextProvider>
    </Router>
    </div>
  )
}