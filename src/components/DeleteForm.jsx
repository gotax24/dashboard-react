import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";
import PropTypes from "prop-types";

const DeleteForm = ({ title, setData, closeModal }) => {
  const { theme } = useContext(ThemeContext);
  const [taskId, setTaskId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  const Delete = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .delete(`${API}task/${taskId}`)
      .then(() => {
        setData((prevData) => prevData.filter((task) => task.id !== taskId));
        setLoading(false);
        closeModal();
      })
      .catch((e) => {
        console.error(e);
        setError("Ocurrio un error al eliminar la tarea");
        setLoading(false);
      });
  };

  return (
    <>
      <div className="header-form">
        <img src="" alt="Imagen de eliminar" />
        <h1>Eliminar {title}</h1>
      </div>
      <div>
        <label className="label-form">
          N° de la tarea:
          <input
            type="number"
            required
            className="input-form"
            onChange={(e) => {
              setTaskId(e.target.value);
            }}
          />
        </label>
        <button className="button-form delete-button" onClick={Delete}>
          {loading ? "Eliminando..." : "Confirmar eliminacion"}
        </button>
        {error && <p className="error-form">{error}</p>}
      </div>
    </>
  );
};

DeleteForm.propTypes = {
  title: PropTypes.string,
  setData: PropTypes.func,
  closeModal: PropTypes.func,
};

export default DeleteForm;
