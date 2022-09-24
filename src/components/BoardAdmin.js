import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Link } from "react-router-dom";
import AdminService from "../services/admin.service";


const BoardAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    AdminService.get_users().then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="container max-w-none mx-auto board-user">
      <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-2 top-dashboard">
        <div className="col-span-4">
          
        </div>
        <div className="col-span-4">
          
        </div>
        {/* <div className="col-span-4">
        <Link to={"/add"} className="nav-link btn-add">
          Agregar fondos
        </Link>
        <Link to={"/withdraw"} className="nav-link btn-withdraw">
          Retirar fondos
        </Link>
        </div> */}
      </div>
        <div className="grid grid-cols-12 gap-2 board-grid">
          <div className="col-span-3 box shadow">
            <h2>
              <i className="fa-solid fa-sack-dollar"></i> TVL
            </h2>
            <p>
              25845,56.25 <span>USD</span>
            </p>
          </div>
          <div className="col-span-3 box shadow">
            <h2>
              <i className="fa-solid fa-users"></i> Stakers
            </h2>
            <p>
              6.329
            </p>
          </div>
          <div className="col-span-3 box shadow">
            <h2>
              <i className="fa-solid fa-piggy-bank"></i> Stakers Yield
            </h2>
            <p className="green">
              + 4345,65 <span>USD</span>
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
          <div className="col-span-12 box user-box shadow">
            <h2>Stakers</h2>
            <div className="grid grid-cols-12 top-border user-list">
              <div className="col-span-2">Nombre</div>
              <div className="col-span-2">Balance</div>
              <div className="col-span-2">Staked</div>
              <div className="col-span-2">Yield</div>
              <div className="col-span-2">Estado</div>
              <div className="col-span-2"><span>Acciones</span></div>
            </div>
            {users.reverse().map((user) => (
            <div className="grid grid-cols-12 user-list">
               <div className="col-span-2">{user.firstname} {user.lastname}</div>
               <div className="col-span-2">{user.accountBalance} <span className="bolder">USDT</span></div>
               <div className="col-span-2">{user.stakedBalance} <span className="bolder">USDT</span></div>
               <div className="col-span-2"><span className="green">+450.89</span></div>
               <div className="col-span-2"><span className="bolder">Activo</span></div>
               <div className="col-span-2"><a className="btn-view" href={'/user/' + user._id}><i className="fa-solid fa-eye"></i></a></div>
             </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardAdmin;
