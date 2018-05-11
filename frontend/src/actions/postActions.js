import { FETCH_POSTS, FETCH_POST, FETCH_POSTS_BY_CATEGORY } from '../actions/types';
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

export const fetchPostsByCategory = (_category) => dispatch => {
    fetch(url + '/' + _category + '/posts', { headers: { 'Authorization': 'whatever-you-want' } })
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
            type: FETCH_POSTS_BY_CATEGORY,
            payload: data_array
     })
);
}

export const fetchPost = (get_id) => dispatch => {
    fetch(url + "/posts/" + get_id, { headers: { 'Authorization': 'whatever-you-want' } })
        .then((res) => { return (res.json()) })
        .then((data) => dispatch({
            type: FETCH_POST,
            payload: data
        })
    );
}

export const votePost = (post_id, value) => dispatch => {
    fetch(url + "/posts/" + post_id, {
        method: 'POST',
        headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json', },
        body: JSON.stringify({
            option: value,
        })
    });
}

export const postPost = (post) => dispatch => {
    fetch(url + "/posts", {
        method: 'POST',
        headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json', },
        body: JSON.stringify({
            id: post.id,
            timestamp: post.timestamp,
            title: post.title,
            body: post.body,
            author: post.author,
            category: post.category,
        })
    });
}

export const deletePost = (post_id) => dispatch => {
    fetch(url + "/posts/" + post_id, {
        method: 'DELETE',
        headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json', },
    });
}

export const editPost = (post_update) => dispatch => {
    fetch(url + "/posts/" + post_update.id, {
        method: 'PUT',
        headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json', },
        body: JSON.stringify({
            title: post_update.title,
            body: post_update.body
        })
    });
}