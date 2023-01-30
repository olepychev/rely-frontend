import React, { useState, useEffect, useRef } from "react";
import UserService from "../../services/user.service";
import WithdrawService from "../../services/withdraw.service";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import { showLoading, hideLoading } from "../../lib/uiService";
import { ethers } from "ethers";

const required = (value) => {
  if (!value) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        Este campo es obligatorio.
      </div>
    );
  }
};

const WithdrawUsdt = () => {
  const [description, setDescription] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [accNumber, setAccNumber] = useState(0);
  const [usdtAddress, setUsdtAddress] = useState("");
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onChangeWithdrawAmount = (e) => {
    const withdrawAmount = e.target.value;
    setWithdrawAmount(withdrawAmount);
  };

  const onChangeUsdtAddress = (e) => {
    const usdtAddress = e.target.value;
    setUsdtAddress(usdtAddress);
  };

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setAccNumber(currentUser.accountNumber);
    UserService.get_usdt_user_balance(currentUser.id).then((response) => {
      setUsdtBalance(response.data);
    })
  }, []);
  const withAmount = parseFloat(withdrawAmount.split(",").join("").split("$").join(""));

  const withdrawUsdt = (e) => {
    e.preventDefault();
    setShowModal(false);
    setMessage("");
    setSuccessful(false);
    showLoading();
    WithdrawService.withdraw_usdt(accNumber, withAmount, usdtAddress).then(
      (response) => {
        hideLoading();
        setMessage(response.data);
        setSuccessful(true);
        setContent(response.data.content);
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      },
      (error) => {
        hideLoading();
        const resMessage =
          (error.response &&
            error.response.data) ||
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
          <div className="col-span-12 user-buttons">
            <Link to={"/add"} className="nav-link btn-add">
              Agregar fondos
            </Link>
            <Link to={"/withdraw"} className="nav-link btn-withdraw">
              Retirar fondos
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 board-secondary-grid">
          <div className="col-span-12 box add-box shadow">
            <h2>Retirar Fondos</h2>
            <div>
              {!successful && (
                <div>
                  <div className="">
                    <label className="text-xs text-gray-600 font-bold">Wallet address</label>
                    <input
                      id="usdt-address"
                      type="text"
                      className="mb-1"
                      name="usdtAddress"
                      value={usdtAddress}
                      onChange={onChangeUsdtAddress}
                      validations={[required]}
                    />
                    {!ethers.utils.isAddress(usdtAddress) &&
                      <p className="text-red-600 text-xs">Not a valid address</p>
                    }
                    <label className="text-xs text-gray-600 font-bold mt-3">Withdraw amount in USDT</label>
                    <CurrencyInput
                      id="input-example"
                      name="amount"
                      placeholder="Por favor ingrese el monto a retirar"
                      defaultValue={0}
                      decimalsLimit={16}
                      decimalSeparator="."
                      groupSeparator=","
                      prefix=""
                      onValueChange={(value) => (value = { withdrawAmount })}
                      onChange={onChangeWithdrawAmount}
                      className="mb-1"
                    />
                    <p className="text-gray-600 text-xs">Your balance: {usdtBalance.toFixed(3)}</p>
                    {usdtBalance < withAmount &&
                      <p className="text-red-600 text-xs">Not enough balance</p>
                    }
                  </div>
                  <button disabled={!(withAmount && usdtAddress) || usdtBalance < withAmount || !ethers.utils.isAddress(usdtAddress)} className="btn-unstake disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400" tabIndex={-1} onClick={() => setShowModal(true)}>
                    <span>Retirar</span>
                  </button>
                </div>
              )}
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful
                        ? "bg-yellow-100 border border-yellow-400 yellow-red-700 px-4 py-3 rounded relative"
                        : "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal &&
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto bg-black bg-opacity-30 md:inset-0 h-modal md:h-full">
          <div className="flex justify-center mt-20">
            <div className="shadow-md rounded-md text-center bg-white px-10 py-5 text-gray-600">
              <h1 className="mb-5">Do you really want to withdraw <b>{withdrawAmount}</b> USDT?</h1>
              <div className="flex justify-end items-center">
                <button className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2" onClick={withdrawUsdt}>Yes</button>
                <button className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
export default WithdrawUsdt;
