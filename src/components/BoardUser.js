import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import moment from "moment";

const BoardUser = () => {
  const form = useRef();
  const checkBtn = useRef();
  const currentUser = AuthService.getCurrentUser();
  const [stake, setStake] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeStake = (e) => {
    const stake = e.target.value;
    setStake(stake);
    console.log(stake);
  };

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    UserService.get_user_balance(currentUser.id).then((response) => {
      setBalance(response.data);
    });

    UserService.get_transaction_history(currentUser.accountNumber).then(
      (response) => {
        setTransactions(response.data);
      }
    );
  }, []);
  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleStake = (e) => {
    e.preventDefault();
    UserService.stake_money(currentUser.accountNumber, Number(stake)).then(
      (response) => {
        setMessage(response.data);
        setSuccessful(true);
        console.log(response);
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
    UserService.unstake_money(currentUser.accountNumber).then(
      (response) => {
        setMessage(response.data);
        setSuccessful(true);
        console.log(response);
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


  return (
    <div className="container max-w-none mx-auto board-user">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-2 top-dashboard">
          <div className="col-span-4 account">
            <h2>Cuenta N: {currentUser.accountNumber}</h2>
          </div>
          <div className="col-span-4"></div>
          <div className="col-span-4">
            <Link to={"/add"} className="nav-link btn-add">
              Agregar fondos
            </Link>
            <Link to={"/withdraw"} className="nav-link btn-withdraw">
              Retirar fondos
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 board-grid">
          <div className="col-span-3 box shadow">
            <h2>
              <i className="fa-solid fa-wallet"></i> Net Worth
            </h2>
            <p>
              {balance} <span>USD</span>
            </p>
          </div>
          <div className="col-span-3 box shadow">
            <h2>
              <i className="fa-solid fa-sack-dollar"></i> Staked
            </h2>
            <p>
              1845,16.05 <span>USD</span>
            </p>
          </div>
          <div className="col-span-3 box shadow">
            <h2>
              <i className="fa-solid fa-piggy-bank"></i> Yield
            </h2>
            <p className="green">
              + 45,65 <span>USD</span>
            </p>
          </div>
          <div className="col-span-3 box shadow">
            <h2>
              <i className="fa-solid fa-chart-line"></i> APY
            </h2>
            <p>12%</p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 board-secondary-grid">
          <div className="col-span-4 box staking-box shadow">
            <h2>Stake USDT</h2>
            <Form onSubmit={handleStake} ref={form}>
              {!successful && (
                <div>
                  <div className="form-group">
                    <Input
                      type="text"
                      className="form-control"
                      name="stake"
                      value={stake}
                      onChange={onChangeStake}
                      placeholder="0.00"
                    />
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
            {transactions.reverse().map((transaction) => (
              <div className="grid grid-cols-12 transaction">
                <div className="col-span-3">
                  <i className="fa-solid fa-circle-up"></i>{" "}
                  {transaction.transactionType}
                </div>
                <div className="col-span-3">
                  {moment(transaction.transactionTime)
                    .utc()
                    .format("DD/MM/YYYY")}
                </div>
                <div className="col-span-3">{transaction.description}</div>
                <div className="col-span-3">
                  ${transaction.transactionAmount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardUser;
