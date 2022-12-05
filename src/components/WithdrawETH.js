import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import WithdrawService from "../services/withdraw.service";
import AuthService from "../services/auth.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import { Link } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";

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

const WithdrawEth = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [description, setDescription] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState("");
  const [user_id, setUserId] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [content, setContent] = useState("");

  const onChangeWithdrawAmount = (e) => {
    const withdrawAmount = e.target.value;
    setWithdrawAmount(withdrawAmount);
  };

  const onChangeEthAddress = (e) => {
    const ethAddress = e.target.value;
    setEthAddress(ethAddress);
  };

  const handleChange = (event) => {};
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUserId(currentUser.id);
    console.log(currentUser.id);
    console.log(ethAddress);
  }, []);

  const withdrawEth = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      WithdrawService.withdraw_eth(user_id, withdrawAmount, ethAddress).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setContent(response.data.content);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
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
            <Form onSubmit={withdrawEth} ref={form}>
              {!successful && (
                <div>
                  <div className="form-group">
                    <input
                      id="eth-address"
                      type="text"
                      className="form-control"
                      name="ethAddress"
                      value={ethAddress}
                      onChange={onChangeEthAddress}
                      validations={[required]}
                    />
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
                    />
                  </div>
                  <div className="form-group"></div>
                  {/* <p>25% unstaking fee until 10 days</p> */}
                  <button className="btn-unstake">
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
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WithdrawEth;
