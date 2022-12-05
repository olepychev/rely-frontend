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
import PrivacyPage from "./components/pages/PrivacyPage";
import TermsPage from "./components/pages/Terms";
import Contact from "./components/pages/Contact";
import KYCForm from "./components/KYCForm";
import Successful from "./components/Successful";
import SingleUser from "./components/SingleUser";
import Swap from "./components/Swap";
import SwapToARS from "./components/SwapToARS";
import Stake from "./components/Stake";
import Wallet from "./components/Wallet";
import DepositETH from "./components/DepositETH";
import DepositUSDT from "./components/DepositUSDT";
import WithdrawEth from "./components/WithdrawETH";

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
          <Route path="/kyc" element={<KYCForm />} />
          <Route path="/dashboard" element={<BoardUser />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/add" element={<AddFunds />} />
          <Route path="/withdraw" element={<WithdrawFunds />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success" element={<Successful />} />
          <Route path="/user/:id" element={<SingleUser />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/swap-usdt" element={<SwapToARS />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/deposit-eth" element={<DepositETH />} />
          <Route path="/deposit-usdt" element={<DepositUSDT />} />
          <Route path="/withdraw-eth" element={<WithdrawEth />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
export default App;