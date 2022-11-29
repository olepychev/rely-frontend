import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import { Link } from "react-router-dom";
import CurrencyInput from 'react-currency-input-field';


const required = (value) => {
  if (!value) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        Este campo es obligatorio.
      </div>
    );
  }
};

const WithdrawFunds = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [accountNumber, setAccountNumber] = useState("");
  const [description, setDescription] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState("");

  const onChangeWithdrawAmount = (e) => {
    const withdrawAmount = e.target.value;
    setWithdrawAmount(withdrawAmount);
  }

  const handleChange = (event) => {
    const newSelectedOptions = [...event.target.options]
      .filter((o) => o.selected)
      .map((o) => o.value);
    setSelected(newSelectedOptions);
    setDescription(selected[0]);
    console.log(description);
  };
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setAccountNumber(currentUser.accountNumber);
    
  }, []);

  const handleWithdraw = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      UserService.withdraw_money(accountNumber,parseInt(withdrawAmount.split(',').join('').split('$').join('')),"description").then(
        (response) => {
          setMessage(response.data);
          setSuccessful(true);
          console.log(response);
          window.setTimeout(function(){window.location.reload()},5000)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
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
            <Form onSubmit={handleWithdraw} ref={form}>
            {!successful && (
              <div>             
              <div className="form-group">
              <CurrencyInput
                  id="input-example"
                  name="amount"
                  placeholder="Por favor ingrese el monto a retirar"
                  defaultValue={0}
                  decimalsLimit={2}
                  decimalSeparator = "."
                  groupSeparator	= ","
                  prefix = "$"
                  onValueChange={(value) => value={withdrawAmount}}
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
              <Select
                  value={selected}
                  onChange={handleChange}
                  name="WithdrawMethod"
                  validations={[required]}
                >
                  <option value="">Seccionar opcion</option>
                  <option value="Bank Transfer">Transferencia Bancaria</option>
                  <option value="Cryptocurrency">Criptomonedas</option>
                </Select>
                {selected.includes("Bank Transfer") && (
                  <div id="bank-transfer-div" className="shadow-lg">
                    <div>
                      <h2>CBU/CVU</h2>
                      <p>La cuenta debe estar a tu nombre</p>
                      <input />
                    </div>
                  </div>
                )}
                {selected.includes("Cryptocurrency") && (
                  <div id="bank-transfer-div" className="shadow-lg">
                    <div>
                      <h2><b>Network:</b> TRX</h2>
                      <p>USDT Wallet</p>
                      <input />
                    </div>
                  </div>
                )}
              </div>
              {/* <p>25% unstaking fee until 10 days</p> */}
              <button className="btn-unstake">
                <span>Retirar</span>
              </button>
              </div>
              )}
              {message && (
                <div className="form-group">
                  <div
                    className={ successful ? "bg-yellow-100 border border-yellow-400 yellow-red-700 px-4 py-3 rounded relative" : "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WithdrawFunds;
