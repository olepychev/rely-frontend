import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import { Link } from "react-router-dom";
const AddFunds = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [accountNumber, setAccountNumber] = useState("");
  const [description, setDescription] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [status, setStatus] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState("");

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  }
  const onChangeDepositAmount = (e) => {
    const depositAmount = e.target.value;
    setDepositAmount(depositAmount);
  }

  const handleChange = (event) => {
    const newSelectedOptions = [...event.target.options]
      .filter((o) => o.selected)
      .map((o) => o.value);
    setSelected(newSelectedOptions);
  };
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setAccountNumber(currentUser.accountNumber);
  }, []);

  const handleDeposit = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      UserService.deposit_funds(accountNumber,Number(depositAmount),"description", status).then(
        (response) => {
          setMessage(response.data);
          setSuccessful(true);
          console.log(response);
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
  console.log(depositAmount);
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
            <Form onSubmit={handleDeposit} ref={form}>
              {!successful && (
              <div>              
                <div className="form-group">
                <Input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={depositAmount}
                  placeholder="0"
                  onChange={onChangeDepositAmount}
                />
              </div>
              <div className="form-group">
                <Select
                  value={selected}
                  onChange={handleChange}
                  name="FundingMethod"
                >
                  <option value="">Seleccionar opcion</option>
                  <option value="Bank Transfer">Transferencia</option>
                  <option value="Cryptocurrency">Criptomonedas</option>
                </Select>
                {selected.includes("Bank Transfer") && (
                  <div id="bank-transfer-div" className="shadow-lg">
                    <div>
                      <h2>Cuenta bancaria</h2>
                      <p><b>Banco:</b> Santander</p>
                      <p><b>Numero de cuenta:</b> 892828-2-0</p>
                      <p><b>CBU:</b> 171272189218129812</p>
                      <p><b>Una vez enviada la transferencia adjuntar el comprobante</b></p>
                      <input type="file" accept="image/png, image/jpeg" />
                    </div>
                  </div>
                )}
                {selected.includes("Cryptocurrency") && (
                  <div id="bank-transfer-div" className="shadow-lg">
                    <div>
                      <h2>USDT Wallet</h2>
                      <p><b>Network:</b> TRX</p>
                      <p><b>Address:</b> 0xc0ffee254729296a45a3885639AC7E10F9d54979</p>
                      <p><b>Una vez enviada la transferencia pegar la TX</b></p>
                    </div>
                    <input type="text"/>
                  </div>
                )}
              </div>
              {/* <p>25% unstaking fee until 10 days</p> */}
              <button className="btn-stake">
                <span>Agregar</span>
              </button>
              </div>
              )}
              {message && (
                <div className="form-group">
                  <div
                    className={ successful ? "bg-green-100 border border-green-400 green-red-700 px-4 py-3 rounded relative" : "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" }
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
export default AddFunds;
