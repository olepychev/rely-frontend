import React, { useState, useEffect, useRef, useMemo } from "react";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import moment from "moment";
import CurrencyInput from "react-currency-input-field";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";

const Stake = () => {
  const form = useRef();
  const checkBtn = useRef();
  const currentUser = AuthService.getCurrentUser();
  const [stake, setStake] = useState("");
  const [weeks, setWeeks] = useState()
  const [stakings, setStakings] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [balanceARS, setBalanceARS] = useState("");
  const [balanceUSDT, setBalanceUSDT] = useState("");
  const [transactions, setTransactions] = useState([]);

  const onChangeStake = (e) => {
    const stake = e.target.value;
    setStake(stake);
  };

  const onChangeWeeks = (e) => {
    const lock_weeks = e.target.value;
    setWeeks(lock_weeks);
  }
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
      setStakings(response.data);
    });
  }, []);

  const handleStake = (e) => {
    e.preventDefault();
    UserService.stake_money(
      currentUser.accountNumber,
      weeks,
      parseInt(stake.split(",").join("").split("$").join(""))
    ).then(
      (response) => {
        setMessage(response.data);
        setSuccessful(true);
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

  const handleUnstake = (id) => {
    UserService.unstake_money(
      currentUser.accountNumber,
      id
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
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  const totalReward = useMemo(() => {
    if (stakings.length > 0) {
      const res = stakings.reduce((res, staking) => {
        res = res + staking.reward;
        return res;
      }, 0);
      return res.toFixed(2);
    }
    else return 0;
  }, [stakings]);

  const listItems = transactions
    .map((transaction) => (
      <tr className="bg-white border-b transaction" key={transaction._id}>
        <td key={transaction.transactionType} className="px-6 py-4">
          {transaction.transactionType === "Deposito" ? (
            <i className="fa-solid fa-circle-up green"></i>
          ) : (
            <i className="fa-solid fa-circle-down red"></i>
          )}
          {transaction.transactionType}
        </td>
        <td key={transaction.transactionTime} className="px-6 py-4">
          {moment(transaction.transactionTime).utc().format("DD/MM/YYYY")}
        </td>
        <td key={transaction.status} className="px-6 py-4">
          {transaction.status === true ? (
            <span className="green">Aprobado</span>
          ) : (
            <span className="red">Pendiente</span>
          )}
        </td>
        <td key={transaction.transactionAmount} className="px-6 py-4">
          {currencyFormat(transaction.transactionAmount)}
        </td>
      </tr>
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
              <i className="fa-solid fa-piggy-bank"></i> Retornos
            </h2>
            <p className="green">
              + <span>{totalReward}</span> <span>USD</span>
            </p>
          </div>
          <div className="col-span-2 box shadow">
            <h2>
              <i className="fa-solid fa-chart-line"></i> APY
            </h2>
            <p>12%</p>
          </div>
        </div>
        <div className="flex gap-2 board-secondary-grid">
          <div className="staking-box shadow box-left">
            <h2 className="mb-4">Stake USDT</h2>
            <Form onSubmit={handleStake} ref={form}>
              {!successful && (
                <div>
                  <div className="form-group">
                    <div className="mb-1">
                      <label className="text-xs">Amount</label>
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
                    </div>
                    {/* <Input
                      type="text"
                      className="form-control"
                      name="stake"
                      value={stake}
                      onChange={onChangeStake}
                      placeholder="0.00"
                    /> */}
                    <div>
                      <label className="text-xs">Weeks</label>
                      <Input
                        type="number"
                        name="lock_weeks"
                        onChange={onChangeWeeks}
                        placeholder={0}
                      />
                    </div>
                  </div>
                  <p>25% unstaking fee until 10 days</p>
                  <button className="btn-stake">
                    <span>Stake</span>
                  </button>
                  {/* <button onClick={handleUnstake} className="btn-unstake">
                    <span>Withdraw</span>
                  </button> */}
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
          <div>
            <div className="box shadow mb-2">
              <h2>
                <i className="fa-solid fa-sack-dollar"></i> Staked
              </h2>
              <table className="mt-3 w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">From</th>
                    <th className="px-6 py-3">To</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Weeks</th>
                    <th className="px-6 py-3">Reward</th>
                    <th className="px-6 py-3">Withdraw</th>
                  </tr>
                </thead>
                <tbody>
                  {stakings.length > 0 && stakings.map((staking, index) => (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-6 py-4">{staking.stakedDate.toString().slice(0, -5)}</td>
                      <td className="px-6 py-4">{staking.endDate.toString().slice(0, -5)}</td>
                      <td className="px-6 py-4">{currencyFormat(staking.amount)}</td>
                      <td className="px-6 py-4">{staking.lockedWeeks}</td>
                      <td className="px-6 py-4">{staking.reward.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center"><button onClick={() => { handleUnstake(staking._id); }}><FontAwesomeIcon icon={faMoneyBillTrendUp} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {stakings.length === 0 &&
                <div className="bg-white border-b px-6 py-4 text-center">
                  No staking yet!
                </div>}
            </div>
            <div className=" box history-box shadow">
              <h2>Actividad reciente</h2>
              <table className="mt-3 w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Actividad</th>
                    <th className="px-6 py-3">Fecha</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {listItems}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Stake;
