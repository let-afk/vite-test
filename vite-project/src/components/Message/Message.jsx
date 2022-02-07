import './Message.sass';
import React from "react";
import PropTypes from "prop-types";

export default function Message({author, message}) {
    return (
        <>
            <p className="message"><span className="author-text">{author}</span>: {message}</p>
        </>
    );   
};

Message.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number]),
    author: PropTypes.string.isRequired
  };