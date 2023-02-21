import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import UserService from "../../services/user.service";
import { showLoading, hideLoading } from "../../lib/uiService";

const required = (value) => {
  if (!value) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        Este campo es obligatorio.
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
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
const Contact = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeFirstName = (e) => {
    const firstname = e.target.value;
    setFirstName(firstname);
  };
  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastName(lastname);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };
  const onChangeQuery = (e) => {
    const query = e.target.value;
    setQuery(query);
  };
  const handleSend = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      showLoading();
      UserService.send_query(
        firstname,
        lastname,
        phone,
        email,
        query
      ).then(
        (response) => {
          hideLoading();
          setMessage(response.data.message);
          setSuccessful(true);
          console.log(response);
        },
        (error) => {
          hideLoading();
          const resMessage =
            (error.response &&
              error.response.data) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  return (
    <div className="container max-w-none">
      <div className="grid grid-cols-12 gap-2 register-grid">
        <div className="col-span-6 image"></div>
        <div className="col-span-6 form">
          <div>
            <h1>Contacto</h1>
            <h2>Dejanos tu consulta!</h2>
            <Form onSubmit={handleSend} ref={form}>
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
                  <div className="form-group">
                    <Input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Telefono"
                      value={phone}
                      onChange={onChangePhone}
                      validations={[required]}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={onChangeEmail}
                      validations={[required, validEmail]}
                    />
                  </div>
                  <div className="form-group">
                    <Textarea
                      type="text"
                      className="form-control"
                      name="message"
                      placeholder="Escribi tu consulta"
                      value={query}
                      onChange={onChangeQuery}
                      validations={[required]}
                    />
                  </div>
                  <div>
                    <button className="btn-register">Enviar Mensaje</button>
                  </div>
                </div>
              )}
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
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
export default Contact;
