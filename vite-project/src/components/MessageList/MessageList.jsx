import Message from '../Message/Message';

export const MessageList = ({messageList}) => {
    return (
        <>     
            {messageList.map(({author, message}, i) => (
            <Message key={i} author={author} message={message} />
            ))}
        </> 
    );
}