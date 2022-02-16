import {Form} from '../Form/Form';
import {MessageList} from '../MessageList/MessageList';

export const Chat = ({messageList, updateForm, endMessage, chatId}) => {

    return (
        <div className="chat">
          <div className="message-list">
            <MessageList messageList={messageList[chatId]} />
            <div ref={endMessage}/>
          </div> 
          <Form onSubmit={updateForm} />
        </div>
    );
}