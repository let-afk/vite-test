import { ADD_MESSAGE_LIST, ADD_MESSAGE, DELETE_MESSAGE_LIST } from "./actions"

const initialState = {};

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE_LIST: {       
            
            state[action.payload]= []

            
            return {
                ...state,
            }
        }
        case ADD_MESSAGE: {
            return {
                ...state,
                [action.chatId]: [...state[action.chatId], action.payload]
            }
        }     
        case DELETE_MESSAGE_LIST: {

            delete state[action.payload]

            return {
                ...state,
            }
        }    
        default: 
            return state;
    }
}