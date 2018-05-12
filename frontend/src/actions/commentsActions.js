import { FETCH_COMMENTS } from '../actions/types';
import { url } from '../ServerURL';

export const fetchComments = (post_id) => dispatch => {
    fetch(url + "/posts/" + post_id +"/comments", { headers: { 'Authorization': 'whatever-you-want' } })
        .then((res) => { return (res.json()) })
        .then(data => dispatch({
            type: FETCH_COMMENTS,
            payload: data
        })
    );
}

export const voteComment = (comment_id, value) => dispatch => {
    fetch(url + "/comments/" + comment_id, {
        method: 'POST',
        headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json', },
        body: JSON.stringify({
            option: value,
        })
    });
}

export const postComment = (comment) => dispatch => {
    fetch(url + "/comments", {
        method: 'POST',
        headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json', },
        body: JSON.stringify({
            id: comment.id,
            body: comment.body,
            author: comment.author,
            parentId: comment.parentId,
            timestamp: comment.timestamp
        })
    });
}

export const deleteComment = (comment_id) => dispatch => {
    fetch(url + "/comments/" + comment_id, {
        method: 'DELETE',
        headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json', },
    });
}

export const editComment = (comment_update) => dispatch => {
    fetch(url + "/comments/" + comment_update.id, {
        method: 'PUT',
        headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json', },
        body: JSON.stringify({
            body: comment_update.body,
            timestamp: comment_update.timestamp
        })
    });
}