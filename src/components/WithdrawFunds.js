import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import DropDown from 'react-dropdown';
import { showLoading, hideLoading } from "../lib/uiService";



const WithdrawFunds = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [description, setDescription] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState("");

  const onChangeWithdrawAmount = (e) => {
    const withdrawAmount = e.target.value;
    setWithdrawAmount(withdrawAmount);
  };

  const handleChange = (e) => {
    setSelected(e.value);
  };

  const handleChangeInput = (e) => {
    setDescription(e.target.value);
  }

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setAccountNumber(currentUser.accountNumber);
  }, []);

  const handleWithdraw = (e) => {
    setMessage("");
    setSuccessful(false);
    showLoading();
    UserService.withdraw_money(
      accountNumber,
      parseInt(withdrawAmount.split(",").join("").split("$").join("")),
      description
    ).then(
      (response) => {
        hideLoading();
        setMessage(response.data);
        setSuccessful(true);
        console.log(response);
        window.setTimeout(function () {
          window.location.reload();
        }, 5000);
      },
      (error) => {
        hideLoading();
        const resMessage =
          (error.response && error.response.data) ||
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
            {!successful && (
              <div>
                <div className="form-group mb-2">
                  <CurrencyInput
                    id="input-example"
                    name="amount"
                    placeholder="Por favor ingrese el monto a retirar"
                    defaultValue={0}
                    decimalsLimit={2}
                    decimalSeparator="."
                    groupSeparator=","
                    prefix="$"
                    onValueChange={(value) => (value = { withdrawAmount })}
                    onChange={onChangeWithdrawAmount}
                  />
                  {/* <Input
                  type="text"
                  className="form-control"
                  name="amount"
                  value={withdrawAmount}
                  placeholder="0"
                  onChange={onChangeWithdrawAmount}
                  validations={[required]}
                /> */}
                </div>
                <div className="form-group">
                  <DropDown
                    options={['Transferencia Bancaria', 'Criptomonedas']}
                    onChange={handleChange}
                  />
                  {selected === 'Transferencia Bancaria' && (
                    <div id="bank-transfer-div" className="shadow-lg">
                      <div>
                        <h2>CBU/CVU</h2>
                        <p>La cuenta debe estar a tu nombre</p>
                        <input onChange={handleChangeInput} />
                      </div>
                    </div>
                  )}
                  {selected === 'Criptomonedas' && (
                    <div id="bank-transfer-div" className="shadow-lg">
                      <div>
                        <h2>
                          <b>Network:</b> TRX
                        </h2>
                        <p>USDT Wallet</p>
                        <input />
                      </div>
                    </div>
                  )}
                </div>
                {/* <p>25% unstaking fee until 10 days</p> */}
                <button disabled={!(withdrawAmount && selected && description)} className="btn-unstake disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400" onClick={handleWithdraw}>
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
  );
};
export default WithdrawFunds;
