// src/utils/auth.js

// Especifica la BASE_URL para la API.
export const BASE_URL = "https://api.nomoreparties.co";

// La función registrada acepta los datos necesarios como argumentos,
// y envía una solicitud POST al endpoint dado.
export const register = (username, password, email) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
