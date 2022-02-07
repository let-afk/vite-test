import './Form.sass';
import React, {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const Form = ({onSubmit}) => {
    const [message, setMessage] = useState(""); 
    const [author, setAuthor] = useState("");
    
    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleChangeAuthor = (e) => {
        setAuthor(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(author, message);
        setAuthor("");
        setMessage("");
    }

    return (
        <form className="form"  onSubmit={handleSubmit}>
            <TextField required margin="dense" color="primary" label="author" size="small" variant="outlined" name='author' value={author} onChange={handleChangeAuthor} />
            <TextField required margin="dense" color="primary" label="message" size="small" variant="outlined" name='message' value={message} onChange={handleChange} />
            <Button size="small" variant="contained" className="submit" type="submit">Отправить</Button>
        </form>
    );   
};
