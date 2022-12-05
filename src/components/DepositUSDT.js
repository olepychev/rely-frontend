import React from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import QRCode from "react-qr-code";

const DepositUSDT = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="container max-w-none mx-auto board-user deposit-crypto">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-2 board-secondary-grid">
          <div className="col-span-12 box add-box shadow">
            <h2>Depositar USDT</h2>
            <p class="qr-address">
              <QRCode value={currentUser.ethAddress} />
            </p>
            <h3>Dirección</h3>
            <b class="address">{currentUser.ethAddress}</b>
            <p>
              Envía solo <b>USDT</b> a esta dirección de depósito.
            </p>
            <p>
              Asegúrate de que la red es <b>Ethereum (ERC20).</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositUSDT;
