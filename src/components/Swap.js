import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import { Link } from "react-router-dom";
import CurrencyInput from 'react-currency-input-field';



const Swap = () => {

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
  const [usdtRate, setUsdtRate] = useState("");

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  }
  const onChangeDepositAmount = (e) => {
    const depositAmount = e.target.value;
    setDepositAmount(depositAmount);
    const usdtRate = UserService.get_usdt_rate().then((response) => {
        const deposit = parseInt(depositAmount.split(',').join('').split('$').join(''))
        const exchangeAmount = (deposit / response.ask).toFixed(2);
        console.log(response.ask);
        console.log(deposit);
        console.log(exchangeAmount);
        setUsdtRate(exchangeAmount);
        });
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

 

  const handleExchange = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {

        UserService.exchange_ars_to_usdt(accountNumber, parseInt(depositAmount.split(',').join('').split('$').join('')), Number(usdtRate)).then(
        (response) => {
            setMessage(response.data);
            setSuccessful(true);
            console.log(response);
            window.setTimeout(function(){window.location.reload()},1500)
        },
        (error) => {
            const resMessage =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
            setSuccessful(false);
            setMessage(resMessage);
        }
        );
    }
    };


    //   UserService.deposit_funds(accountNumber,parseInt(depositAmount.split(',').join('').split('$').join('')),"description", status).then(
    //     (response) => {
    //       setMessage(response.data);
    //       setSuccessful(true);
    //       console.log(response);
    //       window.setTimeout(function(){window.location.reload()},5000)
    //     },
    //     (error) => {
    //       const resMessage =
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data) ||
    //         error.message ||
    //         error.toString();
    //       setMessage(resMessage);
    //       setSuccessful(false);
    //     }
    //   );
    // }
//   };
  
 const messageRate = () => {
    if (usdtRate && usdtRate > 0) {
        return (
        <div><small>Vas a recibir ${usdtRate} USDT</small></div>
        )
    } else {
        return (
        <div><small>Ingresa un monto</small></div>
        )
    }
    }

  return (
    <div className="container max-w-none mx-auto board-user">
      <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-2 top-dashboard">
        <div className="col-span-12 user-buttons">
        <Link to={"/swap"} className="nav-link btn-add">
          ARS - USDT
        </Link>
        <Link to={"/swap-usdt"} className="nav-link btn-withdraw">
          USDT - ARS
        </Link>
        </div>
      </div>
        <div className="grid grid-cols-12 gap-2 board-secondary-grid">
          <div className="col-span-12 box add-box shadow">
            <h2>Intercambiar ARS por USDT</h2>
            <Form onSubmit={handleExchange} ref={form}>
              {!successful && (
              <div>              
                <div className="form-group">
                <CurrencyInput
                  id="input-example"
                  name="amount"
                  defaultValue={0}
                  decimalsLimit={2}
                  decimalSeparator = "."
                  groupSeparator	= ","
                  prefix = "$"
                  onValueChange={(value) => value={depositAmount}}
                  onChange={onChangeDepositAmount}

                />
               
                <label>
                {messageRate()}
                </label>              
                

                {/* <Input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={depositAmount}
                  placeholder="0"
                  onChange={onChangeDepositAmount}
                /> */}
              </div>
              <button className="btn-stake">
                <span>Cambiar</span>
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
export default Swap;
