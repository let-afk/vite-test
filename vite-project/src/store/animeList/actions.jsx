import { API_URL_PUBLIC } from '../../utils/api'
export const GET_ANIMELIST_REQUEST = "ANIMELIST::GET_ANIMELIST_REQUEST";
export const GET_ANIMELIST_SUCCESS = "ANIMELIST::GET_ANIMELIST_SUCCESS";
export const GET_ANIMELIST_FAILURE = "ANIMELIST::GET_ANIMELIST_FAILURE";

export const animeListRequest = (id) => ({
    type: GET_ANIMELIST_REQUEST,
})


export const animeListSuccess = (data) => ({
    type: GET_ANIMELIST_SUCCESS,
    payload: data
})

export const animeListFailure = (error) => ({
    type: GET_ANIMELIST_FAILURE,
    payload: error
})

export const animeListAll = () => async (dispatch) => {
    dispatch(animeListRequest());

    try {
        const response = await fetch(API_URL_PUBLIC);

        if(!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }

        const result = await response.json();
        dispatch(animeListSuccess(result.data));

    } catch (err) {
        dispatch(animeListFailure(err));
        console.warn(err);
    } finally {
        console.log('finally')
    }

}