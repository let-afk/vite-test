import { ADD_MESSAGE } from "./actions"
import { DELETE_CHAT, ADD_CHAT } from "../chats/actions";

const initialState = {};

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT: {       
            
            const newState = { ...state }
            newState[action.payload.id]= []

            
            return {
                ...newState,
            }
        }
        case ADD_MESSAGE: {
            return {
                ...state,
                [action.chatId]: [...state[action.chatId], action.payload]
            }
        }     
        case DELETE_CHAT: {

            const newState = { ...state }
            delete newState[action.payload]

            return {
                ...newState,
            }
        }    
        default: 
            return state;
    }
}