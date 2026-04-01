import NavBar from "./NavBar";
import "./styles/MyProfile.css";

function MyProfile({
  userData = {
    username: "Nombre de usuario aquí",
    email: "Correo electrónico aquí",
  },
  setIsLoggedIn,
}) {
  const { username, email } = userData;

  return (
    <>
      <NavBar setIsLoggedIn={setIsLoggedIn} />
      <div className="my-profile">
        <div className="my-profile__container">
          <div className="my-profile__header">
            <p>Mi perfil</p>
            <hr className="my-profile__rule" />
          </div>
          <div className="my-profile__info">
            <div className="my-profile__user">
              <p className="my-profile__key">Nombre de usuario:</p>
              <p className="my-profile__value">{username}</p>
            </div>
            <div className="my-profile__user">
              <p className="my-profile__key">Correo electrónico:</p>
              <p className="my-profile__value">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
