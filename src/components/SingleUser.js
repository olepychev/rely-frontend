import React, { useState, useEffect } from "react";
import AdminService from "../services/admin.service";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const SingleUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [stakedBalance, setStakedBalance] = useState("");
  const [showReceiptModal, setShowReceiptModal] = useState({});
  const [showDocModal, setShowDocModal] = useState(false);
  const [docs, setDocs] = useState("");
  const [idFront, setIdFront] = useState("");
  const [idBack, setIdBack] = useState("");

  function currencyFormat(num) {
    if (num) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    else return "$" + 0;
  }

  useEffect(() => {
    if (id) {
      AdminService.get_user_by_id(id).then((response) => {
        setUser(response.data);
        if (response.data.kyc.docs) {
          setDocs(response.data.kyc.docs);
        }
        if (response.data.kyc.idFront) {
          setIdFront(response.data.kyc.idFront);
        }
        if (response.data.kyc.idBack) {
          setIdBack(response.data.kyc.idBack);
        }
      });
    }
  }, []);

  useEffect(() => {
    AdminService.get_user_balance(id).then((response) => {
      setBalance(currencyFormat(response.data));
    });
    AdminService.get_user_staked_balance(id).then((response) => {
      setStakedBalance(currencyFormat(response.data));
    });
  }, []);

  useEffect(() => {
    if (user.accountNumber) {
      AdminService.get_transaction_history(user.accountNumber).then(
        (response) => {
          setTransactions(response.data);
          setAccountNumber(user.accountNumber);
        }
      );
    }
  }, [user]);

  const approve_deposit = (accountNumber, transactionId) => {
    AdminService.approve_deposit(accountNumber, transactionId).then(
      (response) => {
        setMessage(response.data);
        setSuccessful(true);
        window.location.reload(true);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  const approve_withdraw = (accountNumber, transactionId) => {
    AdminService.approve_withdraw(accountNumber, transactionId).then(
      (response) => {
        setMessage(response.data);
        setSuccessful(true);
        window.location.reload(true);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  const listItems = transactions
    .map((transaction) => (
      <div className="grid grid-cols-12 transaction" key={transaction._id}>
        <div className="col-span-2 flex items-center">
          {transaction.transactionType === "Deposito" ? (
            <i className="fa-solid fa-circle-up green"></i>
          ) : (
            <i className="fa-solid fa-circle-down red"></i>
          )}
          {transaction.transactionType}
          <div className="ml-2">
            <button className="bg-gray-500 rounded p-1" onClick={() => { setShowReceiptModal({ ...showReceiptModal, [transaction._id]: true }); }}>
              open
            </button>
            {showReceiptModal[transaction._id] &&
              <div className="fixed top-0 left-0 right-0 z-50 w-full p-14 overflow-x-hidden overflow-y-auto bg-black bg-opacity-30 md:inset-0 h-modal md:h-full">
                <div className="text-white text-4xl fixed right-5 top-5 cursor-pointer" onClick={() => { setShowReceiptModal({ ...showReceiptModal, [transaction._id]: false }); }}>&times;</div>
                {transaction.transactionType === "Deposito" ?
                  <img className="!w-full h-auto" src={transaction.description} />
                  :
                  <div className="flex justify-center mt-40">
                    <div className="bg-white rounded shadow-md p-3">CBU/CVU: {transaction.description}</div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
        <div className="col-span-2 flex items-center">
          {moment(transaction.transactionTime).utc().format("DD/MM/YYYY")}
        </div>
        <div className="col-span-2 flex items-center">
          <span>Banco</span>
        </div>
        <div className="col-span-2 flex items-center">
          {transaction.status === true ? (
            <span className="green">Aprobado</span>
          ) : (
            <span className="red">Pendiente</span>
          )}
        </div>

        <div className="col-span-2 flex items-center">
          <span> {currencyFormat(transaction.transactionAmount)}</span>
        </div>
        {transaction.status === false ? (
          <div className="col-span-2 flex items-center">
            <span>
              {transaction.transactionType === "Deposito" ? (
                <a
                  href="#"
                  className="btn-add btn-adm"
                  onClick={() =>
                    approve_deposit(accountNumber, transaction._id)
                  }
                >
                  Aprobar
                </a>
              ) : (
                <a
                  href="#"
                  className="btn-add btn-adm"
                  onClick={() =>
                    approve_withdraw(accountNumber, transaction._id)
                  }
                >
                  Aprobar
                </a>
              )}
            </span>
          </div>
        ) : (
          <div className="col-span-2 flex items-center">
            <span>No hay acciones</span>
          </div>
        )}

      </div>
    ))
    .reverse();

  return (
    <div className="container max-w-none mx-auto board-user">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-2 top-dashboard">
          <div className="col-span-4 user-info">
            <h2>
              {user.firstname} {user.lastname} - {user.email}{" "}
              <i className="fa-solid fa-circle-check"></i>
            </h2>

            <a href={docs} target="_blank">Ver documentacion</a>
            <button className="float-left underline text-sm" onClick={() => { setShowDocModal(true); }}>Ver dni</button>
            {showDocModal &&
              <div className="fixed top-0 left-0 right-0 z-50 w-full p-14 overflow-x-hidden overflow-y-auto bg-black bg-opacity-30 md:inset-0 h-modal md:h-full">
                <div className="text-white text-4xl fixed right-5 top-5 cursor-pointer" onClick={() => { setShowDocModal(false); }}>&times;</div>
                <img className="!w-full h-auto" src={idFront} />
                <img className="!w-full h-auto" src={idBack} />
              </div>
            }
          </div>
          <div className="col-span-4"></div>
          <div className="col-span-4">
            <Link to={""} className="nav-link btn-add">
              Activar
            </Link>
            <Link to={""} className="nav-link btn-withdraw">
              Desactivar
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 board-grid">
          <div className="col-span-3 box shadow">
            <h2>
              <i className="fa-solid fa-wallet"></i> Net Worth
            </h2>
            <p>
              {balance} <span>ARS</span>
            </p>
          </div>
          <div className="col-span-3 box shadow">
            <h2>
              <i className="fa-solid fa-sack-dollar"></i> Staked
            </h2>
            <p>
              {stakedBalance} <span>USD</span>
            </p>
          </div>
          <div className="col-span-3 box shadow">
            <h2>
              <i className="fa-solid fa-piggy-bank"></i> Yield
            </h2>
            <p className="green">
              + 45,65 <span>USD</span>
            </p>
          </div>
          <div className="col-span-3 box shadow">
            <h2>
              <i className="fa-solid fa-chart-line"></i> APY
            </h2>
            <p>12%</p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 board-secondary-grid">
          <div className="col-span-12 box history-box shadow">
            <h2>Actividad reciente</h2>
            <div className="grid grid-cols-12 top-border transaction">
              <div className="col-span-2">Actividad</div>
              <div className="col-span-2">Fecha</div>
              <div className="col-span-2">
                <span>Desde</span>
              </div>
              <div className="col-span-2">Estado</div>

              <div className="col-span-2">
                <span>Monto</span>
              </div>

              <div className="col-span-2">
                <span>Acciones</span>
              </div>
            </div>
            { }
            {listItems}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleUser;
