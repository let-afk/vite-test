import './Message.sass';

export const Message = ({author, message}) => {
    return (
        <>
            <p className="message"><span className="author-text">{author}</span>: {message}</p>
        </>
    );   
};
