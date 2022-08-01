import React from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="container max-w-none">
      <div className="grid grid-cols-12 gap-2 user-grid">
        <div className="col-span-6 image"></div>
        <div className="col-span-6 user-info">
          <h2>Tu Perfil <p class="no-verified"><i className="fa-solid fa-ban"></i> No Verificado <a href="#">- Enviar Documentacion</a></p>
</h2>
          <p>
            <strong>Id:</strong> {currentUser.id}
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
            <strong>Fecha de Nacimiento:</strong> {currentUser.birthdate}
          </p>
          {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p> */}
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          {/* <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
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