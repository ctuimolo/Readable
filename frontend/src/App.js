import React, { Component } from 'react';
import './App.css';

const url = "http://localhost:3001" || `${process.env.REACT_APP_BACKEND}`;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: 'backend-data',
            posts: [],
            comments: {},
            reactCategories: 'backend-data',
            reduxCategories: 'backend-data',
            udacityCategories: 'backend-data',
        }
    }

    getComments = (parent_id) => {
        var comments_array = [];
        fetch(url + "/posts/" + parent_id + "/comments", { headers: { 'Authorization': 'whatever-you-want' } })
            .then((res) => { return (res.json()) })
            .then((data) => {
                for (var i in data) {
                    comments_array.push(data[i]);
                }
            });
        return comments_array;
    }

    componentDidMount() {

        console.log('attempting to post...', url + "/posts");
        fetch(url + "/posts", {
            method: 'POST',
            headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json', },
            body: JSON.stringify({
                id: 'some-unique-id',
                timestamp: Date.now(),
                title: "my test post",
                body: 'this is a test posted from my home PC',
                author: 'Chaiz man',
                category: 'udacity',
            })
        });

        console.log('attempting to post...', url + "/posts");
        fetch(url + "/posts", {
            method: 'POST',
            headers: { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json', },
            body: JSON.stringify({
                id: 'some-other-unique-id',
                timestamp: Date.now(),
                title: "my test post number 2",
                body: 'this is another test posted from my home PC',
                author: 'Chaiz man',
                category: 'udacity',
            })
        });

        fetch(url + "/posts", { headers: { 'Authorization': 'whatever-you-want' } })
            .then((res) => { return (res.json()) })
            .then((data) => {
                var posts_array = [];
                var comments_list = {};
                for (var i in data) {
                    if (data[i].id != null) {
                        posts_array.push(data[i]);
                        comments_list[data[i].id] = this.getComments(data[i].id);
                    }
                }
                this.setState({
                    posts: this.state.posts.concat(posts_array),
                    comments: comments_list,
                });
            });
    }

    render() {
    return (
        <div className="App">
            {console.log(this.state.posts)}
            {console.log(this.state.comments)}
            <div className="all-posts">
                These are the posts...
                    <ol className="posts">
                    {this.state.posts.map((post) => (
                        <div className="post" key={post.id}>
                            Title: "{post.title}" by {post.author} -- ID: {post.id}<br />
                            Date: {Date(post.timestamp)} -- Category: {post.category}<br />
                            {post.body}<br />
                            Comments ({post.commentCount}) -- Score ({post.voteScore})<br />
                            {console.log(this.state.comments[post.id])}
                                <ol className="comments">
                                    {this.state.comments[post.id].map((comment) => (
                                        <div className="comment">
                                            {comment.body}
                                        </div>
                                    ))}
                                </ol>
                            <br />
                        </div>
                    ))}
                    </ol>
            </div>
        </div>
    );
    }
}

export default App;
