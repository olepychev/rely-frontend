import React from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import QRCode from "react-qr-code";

const DepositBTC = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="container max-w-none mx-auto board-user deposit-crypto">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-2 board-secondary-grid">
          <div className="col-span-12 box add-box shadow">
            <h2>Depositar BTC</h2>
            <p className="qr-address">
              <QRCode value={currentUser.btcAddress} />
            </p>
            <h3>Dirección</h3>
            <b className="address">{currentUser.btcAddress}</b>
            <p>
              Envía solo <b>BTC</b> a esta dirección de depósito.
            </p>
            <p>
              Asegúrate de que la red es <b>Bitcoin.</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositBTC;
