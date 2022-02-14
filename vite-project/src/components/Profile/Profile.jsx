import { changeName } from "../../store/profile/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectName } from "../../store/profile/selectors"; 
import "./Profile.sass";

export const Profile = () => { 

    const dispatch = useDispatch();
    const name = useSelector(selectName, shallowEqual);

    const [value, setValue] = useState("");

    const handleChangeValue = (e) => {
        setValue(e.target.value);
    }

    const handleChangeName = (e) => {
        
        e.preventDefault();

        dispatch(changeName(value));
        
        setValue("");
    }

    return (
        <div className="profile">  
            <div className="profile-name">
                <h2>{name}</h2>
            </div>
            <form onSubmit={handleChangeName}>
                <input required onChange={handleChangeValue} type="text" placeholder="enter your name" value={value} />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
}