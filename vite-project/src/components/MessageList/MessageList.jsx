import Message from '../Message/Message';

export const MessageList = ({messageList}) => {
    return (
        <>  
            {messageList.map(({author, message, id}) => (
            <Message key={id} author={author} message={message} />
            ))}
        </> 
    );
}