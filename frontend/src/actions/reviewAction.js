import {
    BEST_REVIEW_LIST_FAIL,
    BEST_REVIEW_LIST_REQUEST,
    BEST_REVIEW_LIST_SUCCESS
} from '../constants/reviewConstans'
import axios from 'axios';

export const bestReviewstDetails = () => async (dispatch) => {
    try {
        dispatch({type: BEST_REVIEW_LIST_REQUEST})
 
        const { data } = await axios.get(`/api/bestreviews`)
 
        dispatch({type: BEST_REVIEW_LIST_SUCCESS, payload: data})
 
    } catch (error) {
        dispatch({
            type: BEST_REVIEW_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
             error.message
         })
    }
 }