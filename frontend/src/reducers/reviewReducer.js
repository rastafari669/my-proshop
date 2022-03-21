import {
    BEST_REVIEW_LIST_FAIL,
    BEST_REVIEW_LIST_REQUEST,
    BEST_REVIEW_LIST_SUCCESS
} from '../constants/reviewConstans'

export const bestReviewReducer = (state = { best:[] }, action) => {
    switch(action.type){
        case BEST_REVIEW_LIST_REQUEST:
            return { loading: true }
        case BEST_REVIEW_LIST_SUCCESS:
            return {loading: false, best: action.payload}
        case BEST_REVIEW_LIST_FAIL: 
            return {loading: false, error: action.payload}
        default:
             return state
    }
 }
