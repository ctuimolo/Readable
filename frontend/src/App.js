import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import HomePage from './components/HomePage';
import DetailedPost from './components/DetailedPost';
import { url } from './ServerURL';

class App extends Component {

    fetchComment = (parent_id) => {
        var comments_list = this.state.comments;
        var comments_array = [];
        fetch(url + "/posts/" + parent_id + "/comments", { headers: { 'Authorization': 'whatever-you-want' } })
            .then((res) => { return (res.json()) })
            .then((data) => {
                for (var i in data) {
                    comments_array.push(data[i]);
                }
                comments_list[parent_id] = comments_array;
                this.setState({ comments: comments_list });
            });
    }

    fillComments = () => {
        for (var i in this.state.posts) {
            this.fetchComment(this.state.posts[i].id);
        }
    }

    renderComments = (posts_comments) => {
        if (posts_comments !== undefined) {
            return (<ol className="comments">
                    {posts_comments.map((comment) => (
                    <div className="comment" key={comment.id}>
                        {comment.author} -- ID: {comment.id}<br />
                        <div className="comment-body">{comment.body}<br /></div>
                        {Date(comment.timestamp)} -- Score({comment.voteScore})<br />
                        <br />
                    </div>
                    ))}
                </ol>)
        }
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/:category/' component={HomePage} />
                        <Route exact path='/:category/:post_id' component={DetailedPost} />
                    </div>
                </BrowserRouter>
            </Provider>
    );
    }
}

export default App;
