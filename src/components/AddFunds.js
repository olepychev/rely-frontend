import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import DropDown from "react-dropdown";
import { Link } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import { showLoading, hideLoading } from "../lib/uiService";

const AddFunds = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [receipt, setReceipt] = useState();
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState("");

  const onChangeDepositAmount = (e) => {
    const depositAmount = e.target.value;
    setDepositAmount(depositAmount);
  };

  const handleChange = (e) => {
    setSelected(e.value);
  };

  const handleChangeInput = (e) => {
    setReceipt(e.target.files[0]);
  }

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setAccountNumber(currentUser.accountNumber);
  }, []);

  const handleDeposit = (e) => {
    setMessage("");
    setSuccessful(false);
    let formData = new FormData();
    formData.append('depositAmount', depositAmount.split(",").join("").split("$").join(""));
    formData.append('receipt', receipt);
    formData.append('acc_number', accountNumber);
    showLoading();
    UserService.deposit_funds(
      formData
    ).then(
      (response) => {
        hideLoading();
        setMessage(response.data);
        setSuccessful(true);
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
            <h2>Agregar Fondos</h2>
            {!successful && (
              <div>
                <div className="form-group mb-2">
                  <CurrencyInput
                    id="input-example"
                    name="amount"
                    placeholder="Por favor ingrese el monto"
                    defaultValue={0}
                    decimalsLimit={2}
                    decimalSeparator="."
                    groupSeparator=","
                    prefix="$"
                    onValueChange={(value) => (value = { depositAmount })}
                    onChange={onChangeDepositAmount}
                  />
                  {/* <Input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={depositAmount}
                  placeholder="0"
                  onChange={onChangeDepositAmount}
                /> */}
                </div>
                <div className="form-group">
                  <DropDown
                    options={['Transferencia', 'Criptomonedas']}
                    onChange={handleChange}
                  />
                  {selected === "Transferencia" && (
                    <div id="bank-transfer-div" className="shadow-lg">
                      <div>
                        <h2>Cuenta bancaria</h2>
                        <p>
                          <b>Banco:</b> Santander
                        </p>
                        <p>
                          <b>Numero de cuenta:</b> 892828-2-0
                        </p>
                        <p>
                          <b>CBU:</b> 171272189218129812
                        </p>
                        <p>
                          <b>
                            Una vez enviada la transferencia adjuntar el
                            comprobante
                          </b>
                        </p>
                        <input type="file" accept="image/*" onChange={handleChangeInput} />
                      </div>
                    </div>
                  )}
                  {selected === "Criptomonedas" && (
                    <div id="bank-transfer-div" className="shadow-lg">
                      <div>
                        <h2>USDT Wallet</h2>
                        <p>
                          <b>Network:</b> TRX
                        </p>
                        <p>
                          <b>Address:</b>{" "}
                          0xc0ffee254729296a45a3885639AC7E10F9d54979
                        </p>
                        <p>
                          <b>Una vez enviada la transferencia pegar la TX</b>
                        </p>
                      </div>
                      <input type="text" />
                    </div>
                  )}
                </div>
                {/* <p>25% unstaking fee until 10 days</p> */}
                <button disabled={!(depositAmount && selected && receipt)} className="w-full mt-2 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400" onClick={handleDeposit}>
                  <span>Agregar</span>
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
export default AddFunds;
