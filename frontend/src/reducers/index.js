import { combineReducers } from 'redux';
import postReducer from './postReducer'
import categoriesReducer from './categoriesReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
    reducedPosts: postReducer,
    reducedCategories: categoriesReducer,
    reducedComments: commentsReducer,
});
