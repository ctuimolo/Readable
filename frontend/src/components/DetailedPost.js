import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, votePost, deletePost } from '../actions/postActions';
import { fetchComments, deleteComment, postComment, voteComment } from '../actions/commentsActions';
import { Link } from 'react-router-dom';
import CommentModal from './CommentModal';
import PostModal from './PostModal';

class DetailedPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            button: "<<< RETURN HOME",
            postModalOpen: false,
            commentModalOpen: false,
            editingComment: undefined,
            editingPost: undefined,
            body: '',
            author: '',
            postExists: true
        }
        this.onChange = this.onChange.bind(this);
    }

    updateFetch() {
        this.props.fetchPost(this.props.match.params.post_id);
        this.props.fetchComments(this.props.match.params.post_id);
    }

    generateID() {
        var ID_LENGTH = 22;
        var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var rtn = '';
        for (var i = 0; i < ID_LENGTH; i++) {
            rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        return rtn;
    }

    deletePost() {
        this.props.deletePost(this.props.match.params.post_id);
        this.updateFetch();
    }

    deleteComment(comment_id) {
        this.props.deleteComment(comment_id);
        this.updateFetch();
    }

    postComment() {

        var new_comment= ({
            body: this.state.body,
            author: this.state.author,
            id: this.generateID(),
            timestamp: Date.now(),
            parentId: this.props.post.id,
        })

        var comment_keys = Object.keys(new_comment);
        var missing_values = [];
        for (var i in comment_keys) {
            if (new_comment[comment_keys[i]] === '') {
                missing_values.push(comment_keys[i]);
            }
        }

        if (missing_values.length > 0)
            alert("Please fill in the missing values:\n" + missing_values);
        else {
            this.props.postComment(new_comment);
            this.updateFetch();
            this.setState({ body: '', author: '' });
        }
    }

    votePost(value) {
        this.props.votePost(this.props.post.id, value);
        this.props.fetchPost(this.props.match.params.post_id);
    }

    voteComment(comment_id, value) {
        this.props.voteComment(comment_id, value);
        this.props.fetchComments(this.props.match.params.post_id);
    }

    openCommentModal(comment) {
        this.setState({ commentModalOpen: true, postModalOpen: false, editingComment: comment })
    }

    openPostModal() {
        this.setState({ postModalOpen: true, commentModalOpen: false })
    }

    closePostModal() {
        this.setState({ postModalOpen: false })
    }

    closeCommentModal() {
        this.setState({ commentModalOpen: false })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ editingPost: nextProps.post, postExists: false });
        if (nextProps.post.category !== undefined) {
            this.setState({ postExists: true });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillMount() {
        this.props.fetchPost(this.props.match.params.post_id);
        this.props.fetchComments(this.props.match.params.post_id);
    }

    render() {
        return (
            this.state.postExists 
            ? <div className="detailed-post-component">

                <PostModal isOpen={this.state.postModalOpen} parent={this} post={this.state.editingPost}/>
                <CommentModal isOpen={this.state.commentModalOpen} parent={this} comment={this.state.editingComment}/>

                <Link to="/"><button className="return-button">{this.state.button}</button></Link>

                <div className="detailed-post">
                    <div className="post-title"> ====== {this.props.post.title} ======</div>
                    by {this.props.post.author} -- Category: {String(this.props.post.category).toUpperCase()}<br />
                    Posted on {new Date(this.props.post.timestamp).toTimeString()} {new Date(this.props.post.timestamp).toDateString()}<br />
                    <div className="post-body">{this.props.post.body}<br /></div>
                    ID: {this.props.post.id}<br />
                    ==== Comments ({this.props.post.commentCount}) ==== Score ({this.props.post.voteScore}) ====<br />
                    <button className="voteup-button" onClick={() => this.votePost('upVote')}>Vote up!</button>
                    <button className="votedown-button" onClick={() => this.votePost('downVote')}>Vote down</button>
                    <Link to="/"><button className="delete-button" onClick={() => this.deletePost()}>delete</button></Link>
                    <button className="edit-button" onClick={() => this.openPostModal()}>edit</button><br />
                </div>
                <ol className="comments">
                    {this.props.comments.map((comment) => (
                        <div className="post" key={comment.id}>
                            <div className="comment-body">{comment.body}</div>
                            <div className="post-title">{comment.title} <br /></div>by {comment.author}<br />
                            Posted on {new Date(comment.timestamp).toTimeString()} {new Date(comment.timestamp).toDateString()}<br />
                            ID: {comment.id}<br />
                            ==== Score ({comment.voteScore}) ====<br />
                            <button className="voteup-button" onClick={() => this.voteComment(comment.id, 'upVote')}>Vote up!</button>
                            <button className="votedown-button" onClick={() => this.voteComment(comment.id, 'downVote')}>Vote down</button>
                            <button className="delete-button" onClick={() => this.deleteComment(comment.id)}>delete</button>
                            <button className="edit-button" onClick={() => { this.openCommentModal(comment); }}>edit</button><br />
                        </div>
                    ))}
                </ol>

                <div className="new-comment">
                    <div>Body: </div>
                    <textarea className='text-input-body' type='text' name='body' onChange={this.onChange} value={this.state.body} />
                    <div>Author: </div>
                    <input className='text-input-title' type='text' name='author' onChange={this.onChange} value={this.state.author} />
                    <br />
                    <button
                        className="submit-button"
                        onClick={() => this.postComment()}>
                        Submit new comment
                </button>
                </div>


                </div>
                : <div className="posts-404">
                    404 <br /> POST {this.props.match.params.post_id} NOT FOUND <br />IN CATEGORY {this.props.match.params.category}<br /><Link to="/"><button className="submit-button"> Return to home </button></Link>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    post: state.reducedPosts.items,
    category: state.reducedPosts.items.category,
    comments: state.reducedComments.items,
})

export default connect(mapStateToProps, { fetchPost, fetchComments, deleteComment, postComment, voteComment, votePost, deletePost })(DetailedPost);