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
import IdUpload from "./components/KYC/IdUpload";
import DocUpload from "./components/KYC/DocUpload";
import Successful from "./components/Successful";
import SingleUser from "./components/SingleUser";
import Stake from "./components/Stake";
import Wallet from "./components/Wallet";
import DepositETH from "./components/DepositCrypto/DepositETH";
import DepositUSDT from "./components/DepositCrypto/DepositUSDT";
import DepositBTC from "./components/DepositCrypto/DepositBTC";
import WithdrawEth from "./components/WithdrawCrypto/WithdrawETH";
import WithdrawUsdt from "./components/WithdrawCrypto/WithdrawUSDT";
import WithdrawBTC from "./components/WithdrawCrypto/WithdrawBTC";
import Swap from "./components/Swap/Swap";
import VerifyUser from "./components/VerifyUser";
import Loading from "./components/Loading";

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
          <Route path="/confirm/:confirmationCode" element={<VerifyUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/kyc/dni" element={<IdUpload />} />
          <Route path="/kyc/docs" element={<DocUpload />} />
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
          <Route path="/stake" element={<Stake />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/deposit-eth" element={<DepositETH />} />
          <Route path="/deposit-usdt" element={<DepositUSDT />} />
          <Route path="/deposit-btc" element={<DepositBTC />} />
          <Route path="/withdraw-eth" element={<WithdrawEth />} />
          <Route path="/withdraw-usdt" element={<WithdrawUsdt />} />
          <Route path="/withdraw-btc" element={<WithdrawBTC />} />
          <Route path="/swap" element={<Swap />} />
        </Routes>
      </div>
      <Footer />
      <Loading />
    </div>
  );
};
export default App;