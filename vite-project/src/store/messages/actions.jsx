import { v4 as uuidv4 } from 'uuid';

export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";

export const addMessage = (value, id) => ({
    type: ADD_MESSAGE,
    payload: {
        author: value.author,
        message: value.message,
        id: value.id
    },
    chatId: id
})

let timeout;

export const addMessageWithMiddlewares = (value, id) => (dispatch) => {

    dispatch(addMessage(value, id));
    
    if(value.author !== 'robot') {
        clearTimeout(timeout)
        timeout = setTimeout(() => {

        const robotAnswer = {
            author: "robot",
            message: `I am a robot from ${id}`,
            id: uuidv4(),
            };

        dispatch(addMessage(robotAnswer, id))}, 1000)
    }    
}