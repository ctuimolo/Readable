import { combineReducers } from 'redux';
import postReducer from './postReducer'
import categoriesReducer from './categoriesReducer';

export default combineReducers({
    reducedPosts: postReducer,
    reducedCategories: categoriesReducer
});
