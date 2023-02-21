import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import QRCode from "react-qr-code";

const DepositUSDT = () => {
  const [chain, setChain] = useState('ETH');
  const currentUser = AuthService.getCurrentUser();
  return (
    <div>
      <div className="chainSelectBtnGroup inline-flex float-right bg-gray-600 mr-20 mt-10 p-1 rounded-md text-white">
        <button className={chain === "ETH" ? "p-1 bg-white text-gray-600 rounded-md" : "p-1 rounded-md"} onClick={() => setChain("ETH")}>ETH</button>
        <button className={chain === "TRON" ? "p-1 bg-white text-gray-600 rounded-md" : "p-1 rounded-md"} onClick={() => setChain("TRON")}>TRON</button>
      </div>
      <div className="container max-w-none mx-auto board-user deposit-crypto">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-2 board-secondary-grid">
            <div className="col-span-12 box add-box shadow">
              <h2>Depositar USDT</h2>
              {
                chain === "ETH" &&
                <>
                  <p className="qr-address">
                    <QRCode value={currentUser.ethAddress} />
                  </p>
                  <h3>Dirección</h3>
                  <b className="address">{currentUser.ethAddress}</b>
                  <p>
                    Envía solo <b>USDT</b> a esta dirección de depósito.
                  </p>
                  <p>
                    Asegúrate de que la red es <b>Ethereum (ERC20)</b>.
                  </p>
                </>
              }
              {
                chain === "TRON" &&
                <>
                  <p className="qr-address">
                    <QRCode value={currentUser.tronAddress} />
                  </p>
                  <h3>Dirección</h3>
                  <b className="address">{currentUser.tronAddress}</b>
                  <p>
                    Envía solo <b>USDT</b> a esta dirección de depósito.
                  </p>
                  <p>
                    Asegúrate de que la red es <b>TRON (TRC20).</b>
                  </p>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositUSDT;
