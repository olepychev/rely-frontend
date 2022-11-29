import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        Este campo es obligatorio.
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        El email no tiene un formato válido.
      </div>
    );
  }
};
// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//         El usuario debe tener entre 3 y 20 caracteres.
//       </div>
//     );
//   }
// };
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        La contraseña debe tener entre 6 y 40 caracteres.
      </div>
    );
  }
};
const EditProfile = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [currentUser] = useState(AuthService.getCurrentUser());
  const [firstname, setFirstName] = useState(currentUser.firstname);
  const [lastname, setLastName] = useState(currentUser.lastname);
  const [address, setAddress] = useState(currentUser.address);
  const [dni, setDNI] = useState(currentUser.dni);
  const [phone, setPhone] = useState(currentUser.phone);
//   const [birthdate, setBirthdate] = useState(currentUser.birthdate);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(function effectFunction() {
    async function fetchUser() {
        const response = await fetch('http://localhost:8080/api/user/' + currentUser.id,);
        // const response = await fetch('https://seashell-app-jatrt.ondigitalocean.app/api/user/' + currentUser.id,);
        const json = await response.json();
        setFirstName(json.firstname);
        setLastName(json.lastname);
        setDNI(json.dni);
        setPhone(json.phone);
        setAddress(json.address);
        // setBirthdate(moment(json.birthdate).format("YYYY-MM-DD"));
        
    }
    fetchUser();
}, []);
  


  const onChangeFirstName = (e) => {
    const firstname = e.target.value;
    setFirstName(firstname);
  };
  
  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastName(lastname);
  };

  const onChangeDNI = (e) => {
    const dni = e.target.value;
    setDNI(dni);
  };
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };
//   const onChangeBirthdate = (e) => {
//     const birthdate = e.target.value;
//     setBirthdate(birthdate);
//   };
  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };


  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
    UserService.updateUserById(
        currentUser.id,
        firstname,
        lastname,
        phone,
        dni,
        // birthdate,
        address
        ).then((response) => {
            const { data } = response;
            setMessage(data.message);
            setSuccessful(data.successful);
            }
        );
    }
  };

  

    
  return (
    <div className="container max-w-none">
    <div className="grid grid-cols-12 gap-2 update-profile-grid">
      <div className="col-span-6 image"></div>
      <div className="col-span-6 form">
      <div>
            <h1>Actualizar Perfil</h1>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group" id="left">
                <Input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={firstname}
                  placeholder="Nombre"
                  onChange={onChangeFirstName}
                  validations={[required]}
                />
              </div>
              <div className="form-group" id="right">
                <Input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={lastname}
                  placeholder="Apellido"
                  onChange={onChangeLastName}
                  validations={[required]}
                />
              </div>
              <div className="form-group" id="left">
                <Input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={onChangePhone}
                />
              </div>
              <div className="form-group" id="right">
                <Input
                  type="text"
                  className="form-control"
                  name="dni"
                  placeholder="DNI"
                  value={dni}
                  onChange={onChangeDNI}

                />
              </div>
              {/* <div className="form-group">
                <Input
                  type="date"
                  className="form-control"
                  name="birthdate"
                  placeholder="Fecha de Nacimiento"
                  value={birthdate}
                  onChange={onChangeBirthdate}
                />
              </div> */}
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Direccion"
                  value={address}
                  onChange={onChangeAddress}
                />
              </div>
              <div>
                <button className="btn-register">Actualizar Perfil</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        </div>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;