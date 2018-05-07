import { FETCH_POSTS } from '../actions/types';
const url = "http://localhost:3001" || `${process.env.REACT_APP_BACKEND}`;

export const fetchPosts = () => dispatch => {
    fetch(url + "/posts", { headers: { 'Authorization': 'whatever-you-want' } })
        .then((res) => { return (res.json()) })
        .then((data) => {
            var posts_array = [];
            for (var i in data) {
                if (data[i].id != null) {
                    posts_array.push(data[i]);
                }
            }
            return posts_array;
        })
        .then(data_array => dispatch({
            type: FETCH_POSTS,
            payload: data_array
        })
    );
}

