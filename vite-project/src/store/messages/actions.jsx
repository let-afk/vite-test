export const ADD_MESSAGE_LIST = "MESSAGES::ADD_MESSAGE_LIST";
export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE_LIST = "MESSAGES::DELETE_MESSAGE_LIST"

export const addMessageList = (id) =>({
    type: ADD_MESSAGE_LIST,
    payload: id
    
})

export const addMessage = (value, id) => ({
    type: ADD_MESSAGE,
    payload: {
        author: value.author,
        message: value.message,
        id: value.id
    },
    chatId: id
})

export const deleteMessageList = (id) => ({
    type: DELETE_MESSAGE_LIST,
    payload: id
})