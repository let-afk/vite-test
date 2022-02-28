import { onValue } from "firebase/database";
import { ProfileNameRef } from "../../services/firebase";

export const CHANGE_NAME = "PROFILE::CHANGE_NAME";

export const changeName = (newName) => ({
  type: CHANGE_NAME,
  payload: newName,
});

export const profileNameTracking = () => (dispatch) => {
  onValue(ProfileNameRef, (snapshot) => dispatch(changeName(snapshot.val())));
};
