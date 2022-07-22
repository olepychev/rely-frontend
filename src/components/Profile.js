import React from "react";
import AuthService from "../services/auth.service";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="container max-w-none">
      <div className="grid grid-cols-12 gap-2 user-grid">
        <div className="col-span-6 image"></div>
        <div className="col-span-6 user-info">
          <h2>Tu Perfil</h2>
          <p>
            <strong>Usuario:</strong> {currentUser.username}
          </p>
          {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p> */}
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          {/* <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
      <div>
          <button className="btn-edit">
            <span>Editar Perfil</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
