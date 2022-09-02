import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Link } from "react-router-dom";
const UserAdminView = () => {
  const [content, setContent] = useState("");
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
        <div className="col-span-4 user-info">
        <h2>John Doe - email@email.com <i className="fa-solid fa-circle-check"></i></h2>    
        <a href="#">Ver documentacion</a>
        </div>
        <div className="col-span-4">
        </div>
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
              5845,56.25 <span>USD</span>
            </p>
          </div>
          <div className="col-span-3 box shadow">
            <h2>
              <i className="fa-solid fa-sack-dollar"></i> Staked
            </h2>
            <p>
              1845,16.05 <span>USD</span>
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
              <div className="col-span-3">Actividad</div>
              <div className="col-span-3">Fecha</div>
              <div className="col-span-3">Estado</div>
              <div className="col-span-3"><span>Monto</span></div>
            </div>
            <div className="grid grid-cols-12 transaction">
              <div className="col-span-3"><i className="fa-solid fa-circle-up"></i> Ingreso de dinero</div>
              <div className="col-span-3">19/04/2022</div>
              <div className="col-span-3"><span className="red">Rechazado</span></div>
              <div className="col-span-3">+ $2.000</div>
            </div>
            <div className="grid grid-cols-12 transaction">
              <div className="col-span-3"><i className="fa-solid fa-circle-down"></i> Retiro de dinero</div>
              <div className="col-span-3">11/04/2022</div>
              <div className="col-span-3"><span className="orange">Pendiente</span></div>
              <div className="col-span-3"><span className="red">- $2.000</span></div>
            </div> 
            <div className="grid grid-cols-12 transaction">
            <div className="col-span-3"><i className="fa-solid fa-circle-up"></i> Ingreso de dinero</div>
            <div className="col-span-3">04/04/2022</div>
              <div className="col-span-3"><span className="green">Aprobado</span></div>
              <div className="col-span-3">+ $12.000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserAdminView;
