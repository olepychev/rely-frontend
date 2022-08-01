import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import Home from "./components/Home";
import AddFunds from "./components/AddFunds";
import WithdrawFunds from "./components/WithdrawFunds";
import { Routes, Route } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import PrivacyPage from "./components/PrivacyPage";
import TermsPage from "./components/Terms";
import Contact from "./components/Contact";


const App = () => {
  
  return (
    <div>
      <Header />
      <div className="container max-w-none mx-auto content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/add" element={<AddFunds />} />
          <Route path="/withdraw" element={<WithdrawFunds />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
export default App;