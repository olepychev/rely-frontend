import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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
const KYCForm = () => {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [dniFront, setDNIFront] = useState("");
  const [dniBack, setDNIBack] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeFrenteDNI = (e) => {
    const dniFront = e.target.value;
    setDNIFront(dniFront);
  };
  const onChangeDorsoDNI = (e) => {
    const dniBack = e.target.value;
    setDNIBack(dniBack);
  };
  const handleKYC = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    // if (checkBtn.current.context._errors.length === 0) {
    //   AuthService.login(username, password).then(
    //     () => {
    //       navigate("/success");
    //       window.location.reload();
    //     },
    //     (error) => {
    //       const resMessage =
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString();
    //       setLoading(false);
    //       setMessage(resMessage);
    //     }
    //   );
    // } else {
    //   setLoading(false);
    // }
  };
  return (
    <div className="container max-w-none">
      <div className="grid grid-cols-12 gap-2 login-grid">
        <div className="col-span-6 image"></div>
        <div className="col-span-6 form">
          <div>
            <h1>Verificacion de Identidad</h1>
            <h2>Comencemos!</h2>
            <Form onSubmit={handleKYC} ref={form}>
              <div className="KYC-box">
              <div className="form-group">
                <Input
                  type="file"
                  className="form-control dni-front"
                  name="Frente DNI"
                  value={dniFront}
                  placeholder="Frente DNI"
                  accept="image/*;capture=camera"
                  onChange={onChangeFrenteDNI}
                  validations={[required]}
                />
                <p>DNI FRENTE</p>
              </div>
              <div className="form-group">
                <Input
                  type="file"
                  className="form-control dni-back"
                  name="Dorso DNI"
                  placeholder="Dorso DNI"
                  accept="image/*;capture=camera"
                  value={dniBack}
                  onChange={onChangeDorsoDNI}
                  validations={[required]}
                />
                <p>DNI DORSO</p>
              </div>
              </div>
              <div>
                <button className="btn-login" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Enviar</span>
                </button>
              </div>
              {message && (
                <div className="form-group">
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
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
export default KYCForm;
