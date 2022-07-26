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
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
export default App;