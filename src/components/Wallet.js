import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import moment from "moment";
import CurrencyInput from "react-currency-input-field";
// import { ethers } from "ethers";
// import { Contract } from "ethers";
// import abi from "./abi/ERC20abi.json"

const Wallet = () => {
  const currentUser = AuthService.getCurrentUser();
  const [balanceARS, setBalanceARS] = useState("");
  const [balanceUSDT, setBalanceUSDT] = useState("");
  const [balanceETH, setBalanceETH] = useState("");
  const [balanceBNB, setBalanceBNB] = useState("");
  const [balanceBTC, setBalanceBTC] = useState("");

  function currencyFormat(num) {
    if (num) {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return Number(0).toFixed(2);
    }
  }

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    UserService.get_ars_user_balance(currentUser.id).then((response) => {
      setBalanceARS(currencyFormat(response.data));
    });

    UserService.get_usdt_user_balance(currentUser.id).then((response) => {
      setBalanceUSDT(currencyFormat(response.data));
    });

    UserService.get_ether_user_balance(currentUser.id).then((response) => {
      setBalanceETH(currencyFormat(response.data));
    });

    UserService.get_bnb_user_balance(currentUser.id).then((response) => {
      setBalanceBNB(currencyFormat(response.data));
    });

    UserService.get_btc_user_balance(currentUser.id).then((response) => {
      setBalanceBTC(currencyFormat(response.data));
    });
  }, []);

  return (
    <div className="container max-w-none mx-auto board-user">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-2 top-dashboard mb-10">
          <div className="col-span-6 account">
            <h2>Cuenta N: {currentUser.accountNumber}</h2>
          </div>
          <div className="col-span-6 user-buttons">
            <Link to={"/add"} className="nav-link btn-add">
              Agregar fondos
            </Link>
            <Link to={"/withdraw"} className="nav-link btn-withdraw">
              Retirar fondos
            </Link>
          </div>
        </div>
        {/* <div className="grid grid-cols-12 gap-2 board-grid">
          <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-wallet"></i> Balance ARS
            </h2>
            <p>
              {balanceARS} <span>ARS</span>
            </p>
          </div>
          <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-wallet"></i> Balance ETH
            </h2>
            <p>
              {balanceETH} <span>ETH</span>
            </p>
          </div>
          <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-wallet"></i> Balance USDT
            </h2>
            <p>
              {balanceUSDT} <span>USDT</span>
            </p>
          </div>
          <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-wallet"></i> Balance BTC
            </h2>
            <p>
              {balanceBTC} <span>BTC</span>
            </p>
          </div>
          <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-wallet"></i> Balance BNB
            </h2>
            <p>
              {balanceBNB} <span>BNB</span>
            </p>
          </div>
        </div> */}
        <div className="grid grid-cols-12 gap-2 board-secondary-grid">
          <div className="col-span-12 box history-box shadow">
            <h2>Wallet</h2>
            <div className="grid grid-cols-12 top-border transaction">
              <div className="col-span-3">Moneda</div>
              <div className="col-span-3">Total</div>
              <div className="col-span-3">
                <span>Acciones</span>
              </div>
            </div>
            <div className="grid grid-cols-12 transaction">
              <div className="col-span-3">
                <img src='img/logos/eth.png' /> <b>ETH</b>
              </div>
              <div className="col-span-3">{balanceETH}</div>
              <div className="col-span-3">
                <a href="/deposit-eth">Depositar</a>{" "}
                <a href="/withdraw-eth">Retirar</a>
              </div>
            </div>
            <div className="grid grid-cols-12 transaction">
              <div className="col-span-3">
                <img src='img/logos/usdt.png' /> <b>USDT</b>
              </div>
              <div className="col-span-3">{balanceUSDT}</div>
              <div className="col-span-3">
                <a href="/deposit-usdt">Depositar</a> <a href="/withdraw-usdt">Retirar</a>
              </div>
            </div>
            <div className="grid grid-cols-12 transaction">
              <div className="col-span-3">
                <img src='img/logos/btc.png' /> <b>BTC</b>
              </div>
              <div className="col-span-3">{balanceBTC}</div>
              <div className="col-span-3">
                <a href="/deposit-btc">Depositar</a> <a href="/withdraw-btc">Retirar</a>
              </div>
            </div>
            <div className="grid grid-cols-12 transaction">
              <div className="col-span-3">
                <img src='img/logos/bnb.png' /> <b>BNB</b>
              </div>
              <div className="col-span-3">{balanceBNB}</div>
              <div className="col-span-3">
                <a href="/deposit-bnb">Depositar</a> <a href="/withdraw-bnb">Retirar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Wallet;
