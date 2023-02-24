import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import moment from "moment";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BoardUser = () => {
  const currentUser = AuthService.getCurrentUser();
  const [balance, setBalance] = useState("");
  const [balanceARS, setBalanceARS] = useState("");
  const [balanceUSDT, setBalanceUSDT] = useState("");
  const [balanceETH, setBalanceETH] = useState("");
  const [balanceBNB, setBalanceBNB] = useState("");
  const [balanceBTC, setBalanceBTC] = useState("");
  const [transactions, setTransactions] = useState([]);

  function currencyFormat(num) {
    if (num) {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return Number(0).toFixed(2);
    }
  }
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    UserService.get_user_balance(currentUser.id).then((response) => {
      setBalance(currencyFormat(response.data));
    });

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

    UserService.get_transaction_history(currentUser.accountNumber).then(
      (response) => {
        setTransactions(response.data);
      }
    );

    // UserService.get_user_staked_balance(currentUser.id).then((response) => {
    //   setStakedBalance(currencyFormat(response.data));
    // });
  }, []);

  const listItems = transactions
    .map((transaction) => (
      <div className="grid grid-cols-10 transaction" key={transaction._id}>
        <div className="col-span-2">
          {(transaction.transactionType === "Deposito" || transaction.transactionType === "Stake") ? (
            <i className="fa-solid fa-circle-up green"></i>
          ) :
            transaction.transactionType === "Swap" ? (
              <i className="fa-solid fa-exchange green"></i>
            ) :
              transaction.transactionType === "Transferencia" ? (
                <i className="fa-solid fa-circle-right red"></i>
              ) :
                (
                  <i className="fa-solid fa-circle-down red"></i>
                )}
          {transaction.transactionType}
        </div>
        <div className="col-span-2">
          {moment(transaction.transactionTime).utc().format("DD/MM/YYYY")}
        </div>
        <div className="col-span-2">
          {transaction.status === true ? (
            <span className="green">Aprobado</span>
          ) : (
            <span className="red">Pendiente</span>
          )}
        </div>
        <div className="col-span-2">
          {transaction.token}
          {transaction.toToken &&
            <span><FontAwesomeIcon className="mx-1" icon={faArrowRight} />
              {transaction.toToken}</span>
          }
        </div>
        <div className="col-span-2">
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
          {/* <div className="col-span-6 user-buttons">
            <Link to={"/add"} className="nav-link btn-add">
              Agregar fondos
            </Link>
            <Link to={"/withdraw"} className="nav-link btn-withdraw">
              Retirar fondos
            </Link>
          </div> */}
        </div>
        <div className="grid grid-cols-12 gap-2 board-grid">
          <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-wallet"></i> Total
            </h2>
            <p>
              {balance} <span>ARS</span>
            </p>
          </div>
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
              <i className="fa-solid fa-wallet"></i> Balance USDT
            </h2>
            <p>
              {balanceUSDT} <span>USDT</span>
            </p>
          </div>
          <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-wallet"></i> Balance ETHER
            </h2>
            <p>
              {balanceETH} <span>ETHER</span>
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
        </div>
        <div className="grid grid-cols-12 gap-2 board-secondary-grid">
          <div className="col-span-12 box history-box shadow">
            <h2>Actividad reciente</h2>
            <div className="grid grid-cols-10 top-border transaction">
              <div className="col-span-2">Actividad</div>
              <div className="col-span-2">Fecha</div>
              <div className="col-span-2">Estado</div>
              <div className="col-span-2">Token</div>
              <div className="col-span-2">
                <span>Monto</span>
              </div>
            </div>
            {listItems}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardUser;
