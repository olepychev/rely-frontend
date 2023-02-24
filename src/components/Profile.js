import React, { useRef, useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { showLoading, hideLoading } from "../lib/uiService";

const Profile = () => {
  const imgRef = useRef();
  const [user, setUser] = useState({});
  const [img, setImg] = useState("");
  const [file, setFile] = useState();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      UserService.get_profile_img(currentUser.id).then(
        (response) => {
          setImg(response.data);
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }, []);

  const handleImgClick = () => {
    imgRef.current.click();
  }

  const handleInputChange = (e) => {
    const targetImg = e.target.files[0];
    setFile(targetImg);
    const imgUrl = URL.createObjectURL(targetImg);
    setImg(imgUrl);
  }

  const handleUpload = () => {
    showLoading();
    setSuccess(false);
    const data = new FormData();
    data.append('avatar', file);
    UserService.upload_profile_img(user.id, data).then(
      (response) => {
        hideLoading();
        setSuccess(true);
        setMessage(response.data);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      (error) => {
        hideLoading();
        setSuccess(false);
        const errMessage = error.response && error.response.data ||
          error.message ||
          error.toString();
        setMessage(errMessage);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    )
  }

  return (
    <div className="container max-w-none">
      <div className="grid grid-cols-12 gap-2 user-grid">
        <div className="col-span-6 image"></div>
        <div className="col-span-6 user-info">
          <h2>
            Tu Perfil{" "}
            <p className="no-verified">
              <i className="fa-solid fa-ban"></i> No Verificado{" "}
              <a href="/kyc/dni">- Enviar Documentacion</a>
            </p>
          </h2>
          <div className="mb-5 flex flex-col items-center justify-center">
            <div className="h-28 w-28 rounded-full relative cursor-pointer transition-transform mb-5 shadow-md shadow-black hover:scale-105" onClick={handleImgClick}>
              <img className="w-full h-full object-cover rounded-full" src={img} />
              {!img && <FontAwesomeIcon className="absolute top-0 left-0 w-full h-full bg-[#34495e] text-white rounded-full" icon={faCircleUser} />}
              <FontAwesomeIcon className="absolute top-0 left-0 w-full h-full text-[#34495e] opacity-0 transition-opacity hover:opacity-60" icon={faArrowCircleUp} />
            </div>
            <input className="hidden" type="file" accept="image/*" ref={imgRef} onChange={handleInputChange} />
            <button disabled={!file} className='text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500  font-medium rounded-lg text-sm px-3 py-2 text-center disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400' onClick={handleUpload}>Upload</button>
          </div>
          {message &&
            <p className={success ? "text-green-700" : "text-rose-800"}>{message}</p>
          }
          <p>
            <strong>Id:</strong> {user.id}
          </p>
          <p>
            <strong>Cuenta N:</strong> {user.accountNumber}
          </p>
          <p>
            <strong>Nombre:</strong> {user.firstname}
          </p>
          <p>
            <strong>Apellido:</strong> {user.lastname}
          </p>
          <p>
            <strong>Direccion:</strong> {user.address}
          </p>
          <p>
            <strong>DNI:</strong> {user.dni}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {moment(user.birthdate).utc().format("DD/MM/YYYY")}
          </p>
          {/* <p>
        <strong>Token:</strong> {user.accessToken.substring(0, 20)} ...{" "}
        {user.accessToken.substr(user.accessToken.length - 20)}
      </p> */}
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {user.roles &&
              user.roles.map((role, index) => (
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
