import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectName } from "../../store/profile/selectors";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Form.sass";
export const Form = ({ onSubmit }) => {
  const [message, setMessage] = useState("");

  const name = useSelector(selectName, shallowEqual);

  const dash = /-/g;

  const unDash = (str) => str.replace(dash, "");

  const value = {
    author: name,
    message: message,
    id: unDash(uuidv4()),
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    setMessage("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        required
        margin="dense"
        color="primary"
        label="message"
        size="small"
        variant="outlined"
        name="message"
        value={message}
        onChange={handleChange}
      />
      <Button size="small" variant="contained" className="submit" type="submit">
        Отправить
      </Button>
    </form>
  );
};
