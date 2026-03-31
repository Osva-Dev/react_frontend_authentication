import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // Si el usuario no ha iniciado sesión, devuelve un componente Navigate que envía al usuario a /login
    return <Navigate to="/login" replace />;
  }
  // De otra forma, renderiza el componente hijo de la ruta protegida.
  return children;
}

export default ProtectedRoute;
