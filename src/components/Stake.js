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
import Dropdown from 'react-dropdown';
import { showLoading, hideLoading } from "../lib/uiService";

const Stake = () => {
  const form = useRef();
  const checkBtn = useRef();
  const currentUser = AuthService.getCurrentUser();
  const [stake, setStake] = useState("");
  const [days, setDays] = useState("")
  const [stakings, setStakings] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [balanceARS, setBalanceARS] = useState("");
  const [balanceUSDT, setBalanceUSDT] = useState(0);
  // const [transactions, setTransactions] = useState([]);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const onChangeStake = (e) => {
    const stake = e.target.value;
    setStake(stake);
  };

  const onChangeDays = (e) => {
    switch (e.value) {
      case '15 days': setDays(15); break;
      case '1 month': setDays(30); break;
      case '3 months': setDays(90); break;
      case '6 months': setDays(180); break;
      default: setDays(360);
    }
  }
  function currencyFormat(num) {
    if (num) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  }
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    UserService.get_user_balance(currentUser.id).then((response) => {
      setBalanceARS(currencyFormat(response.data));
    });

    UserService.get_usdt_user_balance(currentUser.id).then((response) => {
      setBalanceUSDT(response.data);
    });

    // UserService.get_staking_history(currentUser.accountNumber).then(
    //   (response) => {
    //     setTransactions(response.data);
    //   }
    // );

    UserService.get_user_staked_balance(currentUser.id).then((response) => {
      setStakings(response.data);
    });
  }, []);

  const handleStake = (e) => {
    e.preventDefault();
    const stakeAmount = parseFloat(stake.split(",").join("").split("$").join(""));
    setShowStakeModal(false);
    showLoading();
    UserService.stake_money(
      currentUser.accountNumber,
      days,
      stakeAmount
    ).then(
      (response) => {
        hideLoading();
        setMessage(response.data);
        setSuccessful(true);
        window.setTimeout(function () {
          window.location.reload();
        }, 1500);
      },
      (error) => {
        hideLoading();
        const resMessage =
          (error.response && error.response.data && error.response.data) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
        setTimeout(() => {
          setMessage("")
        }, 2000);
      }
    );
  };

  const handleUnstake = (id) => {
    setShowUnstakeModal(false);
    showLoading();
    UserService.unstake_money(
      currentUser.accountNumber,
      id
    ).then(
      (response) => {
        hideLoading();
        setMessage(response.data);
        setSuccessful(true);
        window.setTimeout(function () {
          window.location.reload();
        }, 1500);
      },
      (error) => {
        hideLoading();
        const resMessage =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
        setTimeout(() => {
          setMessage("")
        }, 2000);
      }
    );
  };
  const onClickStake = () => {
    setMessage("");
    setShowStakeModal(true);
  }
  const onClickUnstake = () => {
    setMessage("");
    setShowUnstakeModal(true);
  }
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

  // const listItems = transactions
  //   .map((transaction) => (
  //     <tr className="bg-white border-b transaction" key={transaction._id}>
  //       <td key={transaction.transactionType} className="px-6 py-4">
  //         {transaction.transactionType === "Deposito" ? (
  //           <i className="fa-solid fa-circle-up green"></i>
  //         ) : (
  //           <i className="fa-solid fa-circle-down red"></i>
  //         )}
  //         {transaction.transactionType}
  //       </td>
  //       <td key={transaction.transactionTime} className="px-6 py-4">
  //         {moment(transaction.transactionTime).utc().format("DD/MM/YYYY")}
  //       </td>
  //       <td key={transaction.status} className="px-6 py-4">
  //         {transaction.status === true ? (
  //           <span className="green">Aprobado</span>
  //         ) : (
  //           <span className="red">Pendiente</span>
  //         )}
  //       </td>
  //       <td key={transaction.transactionAmount} className="px-6 py-4">
  //         {currencyFormat(transaction.transactionAmount)}
  //       </td>
  //     </tr>
  //   ))
  //   .reverse();

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
              {balanceUSDT ? currencyFormat(balanceUSDT) : 0} <span>USDT</span>
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
            <div>
              <div className="form-group mb-1">
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
                {parseFloat(stake.split(",").join("").split("$").join("")) > balanceUSDT &&
                  <p className="text-xs text-red-600">Not enough balance.</p>
                }
                {/* <Input
                      type="text"
                      className="form-control"
                      name="stake"
                      value={stake}
                      onChange={onChangeStake}
                      placeholder="0.00"
                    /> */}
                <div>
                  <label className="text-xs">LockTime</label>
                  <Dropdown options={['15 days', '1 month', '3 months', '6 months', '12 months']} onChange={onChangeDays} />
                </div>
              </div>
              <p className="text-xs text-gray-500">25% unstaking fee until 10 days</p>
              <button disabled={!(parseFloat(stake.split(",").join("").split("$").join("")) && days) || parseFloat(stake.split(",").join("").split("$").join("")) > balanceUSDT} className='w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500  font-medium rounded-lg text-sm py-2.5 text-center my-3 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400' onClick={onClickStake}>Stake</button>
              {showStakeModal &&
                <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto bg-black bg-opacity-30 md:inset-0 h-modal md:h-full">
                  <div className="flex justify-center mt-20">
                    <div className="shadow-md rounded-md text-center bg-white px-10 py-5 text-gray-600">
                      <h1 className="mb-5">Do you really want to stake <b>{stake}</b> for <b>{days}</b> days?</h1>
                      <div className="flex justify-end items-center">
                        <button className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2" onClick={handleStake}>Yes</button>
                        <button className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={() => setShowStakeModal(false)}>No</button>
                      </div>
                    </div>
                  </div>
                </div>
              }

              {/* <button onClick={handleUnstake} className="btn-unstake">
                    <span>Withdraw</span>
                  </button> */}
            </div>

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
                    <th className="px-6 py-3">LockTime(day)</th>
                    <th className="px-6 py-3">Reward</th>
                    <th className="px-6 py-3">Withdraw</th>
                  </tr>
                </thead>
                <tbody>
                  {stakings.length > 0 && stakings.map((staking) => (
                    <tr key={staking._id} className="bg-white border-b">
                      <td className="px-6 py-4">{moment(staking.stakedDate).utc().format("DD/MM/YYYY")}</td>
                      <td className="px-6 py-4">{moment(staking.endDate).utc().format('DD/MM/YYYY')}</td>
                      <td className="px-6 py-4">{currencyFormat(staking.amount)}</td>
                      <td className="px-6 py-4">{staking.lockedDays}</td>
                      <td className="px-6 py-4">{staking.reward.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={onClickUnstake}><FontAwesomeIcon icon={faMoneyBillTrendUp} /></button>
                        {showUnstakeModal &&
                          <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto bg-black bg-opacity-30 md:inset-0 h-modal md:h-full">
                            <div className="flex justify-center mt-20">
                              <div className="shadow-md rounded-md text-center bg-white px-10 py-5 text-gray-600">
                                <h1 className="mb-5">Do you really want to unstake?</h1>
                                <div className="flex justify-end items-center">
                                  <button className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2" onClick={() => { handleUnstake(staking._id); }}>Yes</button>
                                  <button className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={() => setShowUnstakeModal(false)}>No</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {stakings.length === 0 &&
                <div className="bg-white border-b px-6 py-4 text-center">
                  No staking yet!
                </div>}
            </div>
            {/* <div className=" box history-box shadow">
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
            </div> */}
          </div>
        </div>
      </div>
      {message && (
        <div className="form-group fixed top-20 left-1/2 -translate-x-1/2">
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
    </div>
  );
};
export default Stake;
