import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <div className="container max-w-none">
      <div className="grid grid-cols-12 gap-2 home-grid">
        <div className="col-span-12 hero">
        <div className="container mx-auto">
        <h1>Bienvenido a Rely</h1>
        <h2>Tu nueva plataforma para invertir</h2>
        <Link to={"/register"} className="btn-hero">
          Registro
        </Link>
        <Link to={"/login"} className="btn-hero-secondary">
          Acceder
        </Link>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
