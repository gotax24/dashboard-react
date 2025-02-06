import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/CreateAnAccount.css";

const CreateAnAccount = () => {
  const navigation = useNavigate();
  const API = import.meta.env.VITE_API_URL
  const { theme } = useContext(ThemeContext);

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const SingUp = (e) => {
    e.preventDefault();
    setLoading(true);

    if(user.name === "" || user.lastName === "" || user.email === "" || user.password === "") return (setError("Un campo o varios campos estan vacios") , setLoading(false))

    axios
      .post(API+"users", user)
      .then((response) => {
        const users = response.data;
        console.log(users);
        navigation("/");
      })
      .catch((e) => {
        setLoading(false);
        setError(e.response.data.error);
        console.error(e);
      });
  };

  const handleInputChange = (fields, value) => {
    if (fields === "email" && !value.includes("@")) return setError("Ingresar un correo valido");

    setUser((prevUser) => ({
      ...prevUser,
      [fields]: value,
    }));
  };

  return (
    <>
      <div className="container-welcome">
        <img
          className="logo-singUp"
          src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
          alt="Logo de la pagina"
        />
        <h1 className="title-singUp">The panel-0n</h1>
      </div>
      <div className="singUp-box">
        <p>Registrarse</p>
        <form>
          <div className="user-box">
            <input
              type="text"
              autoComplete="on"
              required
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <label>Nombre</label>
            <div className="user-box">
              <input
                type="text"
                autoComplete="on"
                required
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
              <label>Apellido</label>
            </div>
            <div className="user-box">
              <input
                type="email"
                autoComplete="on"
                required
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <label>Correo</label>
            </div>
          </div>
          <div className="user-box">
            <input
              className="input-singUp"
              type="password"
              autoComplete="on"
              required
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <label>Contraseña</label>
          </div>
          <a onClick={SingUp} href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {loading ? "Registrando..." : "Registrar"}
          </a>
        </form>
        <p>
          Ya tienes una cuenta?{" "}
          <Link to="/login" className="a2">
            Inicia Sesión!
          </Link>
        </p>
        {error && <span className="error-singUp">{error}</span>}
      </div>
    </>
  );
};

export default CreateAnAccount;
