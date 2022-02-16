import { changeShowName, CHANGE_NAME } from "../../store/profile/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./Profile.sass";

export const Profile = () => { 

    const dispatch = useDispatch();
    const {showName, name} = useSelector(state => state);

    const [value, setValue] = useState("");

    const handleShowName = () => {
        dispatch(changeShowName);
    }

    const handleChangeValue = (e) => {
        setValue(e.target.value);
    }

    const handleChangeName = (e) => {
        
        e.preventDefault();

        dispatch({
            type: CHANGE_NAME,
            payload: value,
        });
        
        setValue("");
    }

    return (
        <div className="profile">  
            <div className="profile-name">
                {showName && <h2>{name}</h2>}
                <input className="show-name" onClick={handleShowName}  type="checkbox" value={showName} />
            </div>
            <form onSubmit={handleChangeName}>
                <input onChange={handleChangeValue} type="text" placeholder="enter your name" value={value} />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
}