import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import { setToken, getToken } from "../utils/token";
import * as api from "../utils/api";
import "./styles/App.css";

function App() {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      auth
        .register(username, password, email)
        .then(() => {
          console.log("Registro Exitoso...");
          navigate("/login");
        })
        .catch(console.error);
    }
  };

  const handleLogin = ({ username, password }) => {
    if (!username || !password) {
      return;
    }

    auth
      .authorize(username, password)
      .then((data) => {
        if (data.jwt) {
          // Guarda el token en el almacenamiento local
          setToken(data.jwt);
          setUserData(data.user);
          setIsLoggedIn(true);
          navigate("/ducks");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    // Llama a la función, pasándole el JWT.
    api
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        // si la respuesta es exitosa, inicia la sesión del usuario, guarda sus
        // datos en el estado y lo dirige a /ducks.
        setIsLoggedIn(true);
        setUserData({ username, email });
        navigate("/ducks");
      })
      .catch(console.error);
  }, []);

  return (
    <Routes>
      <Route
        path="/ducks"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Ducks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-profile"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <MyProfile userData={userData} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <div className="loginContainer">
            <Login handleLogin={handleLogin} />
          </div>
        }
      />

      <Route
        path="/register"
        element={
          <div className="registerContainer">
            <Register handleRegistration={handleRegistration} />
          </div>
        }
      />

      <Route
        path="*"
        element={
          isLoggedIn ? (
            <Navigate to="/ducks" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
