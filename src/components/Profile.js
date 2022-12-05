import React from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import moment from "moment";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);
  return (
    <div className="container max-w-none">
      <div className="grid grid-cols-12 gap-2 user-grid">
        <div className="col-span-6 image"></div>
        <div className="col-span-6 user-info">
          <h2>
            Tu Perfil{" "}
            <p className="no-verified">
              <i className="fa-solid fa-ban"></i> No Verificado{" "}
              <a href="/kyc">- Enviar Documentacion</a>
            </p>
          </h2>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Cuenta N:</strong> {currentUser.accountNumber}
          </p>
          <p>
            <strong>Nombre:</strong> {currentUser.firstname}
          </p>
          <p>
            <strong>Apellido:</strong> {currentUser.lastname}
          </p>
          <p>
            <strong>Direccion:</strong> {currentUser.address}
          </p>
          <p>
            <strong>DNI:</strong> {currentUser.dni}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {moment(currentUser.birthdate).utc().format("DD/MM/YYYY")}
          </p>
          {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p> */}
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          {currentUser.ethAddress}
          {currentUser.ethAddress.privateKey}
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
          <div>
            <Link to={"/edit-profile"} className="btn-edit">
              Editar Perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
