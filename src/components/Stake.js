import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import moment from "moment";
import CurrencyInput from "react-currency-input-field";

const Stake = () => {
  const form = useRef();
  const checkBtn = useRef();
  const currentUser = AuthService.getCurrentUser();
  const [stake, setStake] = useState("");
  const [stakedBalance, setStakedBalance] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [balanceARS, setBalanceARS] = useState("");
  const [balanceUSDT, setBalanceUSDT] = useState("");
  const [transactions, setTransactions] = useState([]);

  const onChangeStake = (e) => {
    const stake = e.target.value;
    setStake(stake);
    console.log(stake);
  };

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

    UserService.get_transaction_history(currentUser.accountNumber).then(
      (response) => {
        setTransactions(response.data);
      }
    );

    UserService.get_user_staked_balance(currentUser.id).then((response) => {
      setStakedBalance(currencyFormat(response.data));
    });
  }, []);

  const handleStake = (e) => {
    e.preventDefault();
    UserService.stake_money(
      currentUser.accountNumber,
      parseInt(stake.split(",").join("").split("$").join(""))
    ).then(
      (response) => {
        setMessage(response.data);
        setSuccessful(true);
        console.log(response);
        window.setTimeout(function () {
          window.location.reload();
        }, 1500);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  const handleUnstake = (e) => {
    e.preventDefault();
    UserService.unstake_money(
      currentUser.accountNumber,
      parseInt(stake.split(",").join("").split("$").join(""))
    ).then(
      (response) => {
        setMessage(response.data);
        setSuccessful(true);
        console.log(response);
        window.setTimeout(function () {
          window.location.reload();
        }, 1500);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

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
            <Link to={"/add"} className="nav-link btn-add">
              Agregar fondos
            </Link>
            <Link to={"/withdraw"} className="nav-link btn-withdraw">
              Retirar fondos
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 board-grid">
          {/* <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-wallet"></i> Total
            </h2>
            <p>
              {balanceARS} <span>ARS</span>
            </p>

          </div> */}
          {/* <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-wallet"></i> Balance ARS
            </h2>
            <p>
              {balanceARS} <span>ARS</span>
            </p>

          </div> */}
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
              <i className="fa-solid fa-sack-dollar"></i> Staked
            </h2>
            <p>
              {stakedBalance} <span>USDT</span>
            </p>
          </div>
          <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-piggy-bank"></i> Retornos
            </h2>
            <p className="green">
              + 45,65 <span>USD</span>
            </p>
          </div>
          <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-chart-line"></i> APY
            </h2>
            <p>12%</p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 board-secondary-grid">
          <div className="col-span-4 box-left staking-box shadow">
            <h2>Stake USDT</h2>
            <Form onSubmit={handleStake} ref={form}>
              {!successful && (
                <div>
                  <div className="form-group">
                    <CurrencyInput
                      id="input-example"
                      name="amount"
                      placeholder="Por favor ingrese el monto"
                      defaultValue={0}
                      decimalsLimit={2}
                      decimalSeparator="."
                      groupSeparator=","
                      prefix="$"
                      onValueChange={(value) => (value = { stake })}
                      onChange={onChangeStake}
                    />
                    {/* <Input
                      type="text"
                      className="form-control"
                      name="stake"
                      value={stake}
                      onChange={onChangeStake}
                      placeholder="0.00"
                    /> */}
                  </div>
                  <p>25% unstaking fee until 10 days</p>
                  <button className="btn-stake">
                    <span>Stake</span>
                  </button>
                  <button onClick={handleUnstake} className="btn-unstake">
                    <span>Withdraw</span>
                  </button>
                </div>
              )}
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful
                        ? "bg-green-100 border border-green-400 green-red-700 px-4 py-3 rounded relative"
                        : "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
          <div className="col-span-8 box history-box shadow">
            <h2>Actividad reciente</h2>
            <div className="grid grid-cols-12 top-border transaction">
              <div className="col-span-3">Actividad</div>
              <div className="col-span-3">Fecha</div>
              <div className="col-span-3">Estado</div>
              <div className="col-span-3">
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
export default Stake;
