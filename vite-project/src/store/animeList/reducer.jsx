import { STATUSES } from "../../utils/status";
import { GET_ANIMELIST_FAILURE, GET_ANIMELIST_REQUEST, GET_ANIMELIST_SUCCESS } from "./actions"

const initialState = {
    data: [],
    request: STATUSES.IDLE,
    error: null,
  };

export const animeListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ANIMELIST_REQUEST: {
            return {
                ...state,
                request: STATUSES.REQUEST
            }
        }        
        case GET_ANIMELIST_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                request: STATUSES.SUCCESS
            }
        }
        case GET_ANIMELIST_FAILURE: {
            return {
                ...state,
                request: STATUSES.FAILURE,
                error: action.payload
            }
        }
        default: 
            return state;
    }
}