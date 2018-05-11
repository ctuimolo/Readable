import { FETCH_POSTS, FETCH_POST, FETCH_POSTS_BY_CATEGORY } from '../actions/types';

const initialState = {
	items: [],
	item: {}
}

export default function(state =  initialState, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            }
            case FETCH_POSTS_BY_CATEGORY:
                return {
                ...state,
                items: action.payload
            }
        case FETCH_POST:
            return {
                ...state,
                items: action.payload
            }
        default:
	        return state;
        }
}