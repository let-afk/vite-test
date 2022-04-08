import { changeName, profileNameTracking } from "../../store/profile/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectName } from "../../store/profile/selectors";
import "./Profile.scss";
import { ProfileNameRef, logout } from "../../services/firebase";
import { onValue, set } from "firebase/database";

export const Profile = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectName, shallowEqual);

  const [value, setValue] = useState("");

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleChangeName = (e) => {
    e.preventDefault();

    set(ProfileNameRef, value);

    setValue("");
  };

  useEffect(() => {
    dispatch(profileNameTracking());
    [];
  });

  const handleChangeAuth = async () => {
    try {
      await logout();
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <div className="profile">
      <div className="profile-name">
        <h2>{name}</h2>
      </div>
      <form onSubmit={handleChangeName}>
        <input
          required
          onChange={handleChangeValue}
          type="text"
          placeholder="enter your name"
          value={value}
        />
        <button type="submit">Отправить</button>
      </form>
      <button className="btn-logout" onClick={handleChangeAuth}>
        Logout
      </button>
    </div>
  );
};
