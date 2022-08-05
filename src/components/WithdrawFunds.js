import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import { Link } from "react-router-dom";
const WithdrawFunds = () => {
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState("");
  const handleChange = (event) => {
    const newSelectedOptions = [...event.target.options]
      .filter((o) => o.selected)
      .map((o) => o.value);
    setSelected(newSelectedOptions);
  };
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <div className="container max-w-none mx-auto board-user">
      <div className="container mx-auto">    
      <div className="grid grid-cols-12 gap-2 top-dashboard">
        <div className="col-span-4">
          
        </div>
        <div className="col-span-4">
          
        </div>
        <div className="col-span-4">
        <Link to={"/add"} className="nav-link btn-add">
          Agregar fondos
        </Link>
        <Link to={"/withdraw"} className="nav-link btn-withdraw">
          Retirar fondos
        </Link>
        </div>
      </div>
        <div className="grid grid-cols-12 gap-2 board-secondary-grid">
          <div className="col-span-3">
          </div>
          <div className="col-span-6 box add-box shadow">
            <h2>Retirar Fondos</h2>
            <Form>
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  name="amount"
                  value="0.00"
                  placeholder="0.00"
                />
              </div>
              <div className="form-group">
              <Select
                  value={selected}
                  onChange={handleChange}
                  name="WithdrawMethod"
                >
                  <option value="">Select Method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cryptocurrency">Cryptocurrencies</option>
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
            </Form>
          </div>
          <div className="col-span-3">
          </div>
        </div>
      </div>
    </div>
  );
};
export default WithdrawFunds;
