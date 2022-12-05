import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import moment from "moment";
import CurrencyInput from "react-currency-input-field";
import ethLogo from "../img/eth-logo.png";
import usdtLogo from "../img/tether-usdt-logo.png";
// import { ethers } from "ethers";
// import { Contract } from "ethers";
// import abi from "./abi/ERC20abi.json"

const Wallet = () => {
  const currentUser = AuthService.getCurrentUser();
  const [balanceARS, setBalanceARS] = useState("");
  const [balanceUSDT, setBalanceUSDT] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balanceETH, setBalanceETH] = useState("");

  // const network = "goerli";
  // const provider = ethers.getDefaultProvider(network);
  // const address = currentUser.ethAddress;
  // const usdtAddress = '0x5AB6F31B29Fc2021436B3Be57dE83Ead3286fdc7';

  // const get_usdt_balance = async () => {
  //   const contract = new ethers.Contract(usdtAddress, abi, provider);
  //   const balance = await contract.balanceOf(address);
  //   const decimals = await contract.decimals();
  //   const balanceFormatted = ethers.utils.formatUnits(balance, decimals);
  //   setBalanceUSDT(balanceFormatted);

  // }

  // // Get USDT Balance
  // get_usdt_balance();

  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    UserService.get_user_balance(currentUser.id).then((response) => {
      setBalanceARS(currencyFormat(response.data));
    });

    UserService.get_usdt_user_balance(currentUser.id).then((response) => {
      setBalanceUSDT(currencyFormat(response.data));
    });

    UserService.get_ether_user_balance(currentUser.id).then((response) => {
      setBalanceETH(response.data);
    });

    UserService.get_transaction_history(currentUser.accountNumber).then(
      (response) => {
        setTransactions(response.data);
      }
    );

    // provider.getBalance(address).then((balance) => {
    //   const balanceInEth = ethers.utils.formatEther(balance)
    //   // console.log(`balance: ${balanceInEth} ETH`)
    //   setBalanceETH(balanceInEth);
    // });
  }, []);

  const listItems = transactions
    .map((transaction) => (
      <div className="grid grid-cols-12 transaction" key={transaction._id}>
        <div key={transaction.transactionType} className="col-span-3">
          {transaction.transactionType === "Deposito" ? (
            <i className="fa-solid fa-circle-up green"></i>
          ) : (
            <i className="fa-solid fa-circle-down red"></i>
          )}
          {transaction.transactionType}
        </div>
        <div key={transaction.transactionTime} className="col-span-3">
          {moment(transaction.transactionTime).utc().format("DD/MM/YYYY")}
        </div>
        <div key={transaction.status} className="col-span-3">
          {transaction.status === true ? (
            <span className="green">Aprobado</span>
          ) : (
            <span className="red">Pendiente</span>
          )}
        </div>
        <div key={transaction.transactionAmount} className="col-span-3">
          {currencyFormat(transaction.transactionAmount)}
        </div>
      </div>
    ))
    .reverse();

  return (
    <div className="container max-w-none mx-auto board-user">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-2 top-dashboard">
          <div className="col-span-6 account">
            <h2>Cuenta N: {currentUser.accountNumber}</h2>
          </div>
          <div className="col-span-6 user-buttons">
            {/* <Link to={"/add"} className="nav-link btn-add">
              Depositar fondos
            </Link>
            <Link to={"/withdraw"} className="nav-link btn-withdraw">
              Retirar fondos
            </Link> */}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 board-grid">
          <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-wallet"></i> Total
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
        </div>
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
                <img src={ethLogo} /> <b>ETH</b>
              </div>
              <div className="col-span-3">{balanceETH}</div>
              <div className="col-span-3">
                <a href="/deposit-eth">Depositar</a>{" "}
                <a href="/withdraw-eth">Retirar</a>
              </div>
            </div>
            <div className="grid grid-cols-12 transaction">
              <div className="col-span-3">
                <img src={usdtLogo} /> <b>USDT</b>
              </div>
              <div className="col-span-3">{balanceUSDT}</div>
              <div className="col-span-3">
                <a href="/deposit-usdt">Depositar</a> <a href="#">Retirar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Wallet;
