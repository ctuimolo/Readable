import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchPostsByCategory, votePost, deletePost } from '../actions/postActions';
import NewPost from './NewPost';
import { Link } from 'react-router-dom';
import PostModal from './PostModal';


class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            editingPost: undefined,
            postModalOpen: false,
            sortMode: 'recent',
            postsExist: true
        }
    }

    updateFetch() {
        this.props.params.category === undefined
            ? this.props.fetchPosts()
            : this.props.fetchPostsByCategory(this.props.params.category);
    }

    votePost(post_id, value) {
        this.props.votePost(post_id, value);
        this.updateFetch();
    }

    deletePost(post_id) {
        this.props.deletePost(post_id);
        this.updateFetch();
    }

    closePostModal() {
        this.setState({ postModalOpen: false })
    }

    openPostModal(post) {
        this.setState({ editingPost: post, postModalOpen: true })
    }

    sortByRecent() {
        var sorted_array = this.state.posts.sort((a, b) => { return b.timestamp - a.timestamp });
        this.setState({ posts: sorted_array, sortMode: 'recent' });
    }

    sortByOldest() {
        var sorted_array = this.state.posts.sort((a, b) => { return a.timestamp - b.timestamp });
        this.setState({ posts: sorted_array, sortMode: 'oldest' });
    }

    sortByHighscore() {
        var sorted_array = this.state.posts.sort((a, b) => { return b.voteScore - a.voteScore });
        this.setState({ posts: sorted_array, sortMode: 'high score' });
    }

    sortByLowscore() {
        var sorted_array = this.state.posts.sort((a, b) => { return a.voteScore - b.voteScore });
        this.setState({ posts: sorted_array, sortMode: 'low score' });
    }

    componentWillMount() {
        this.props.params.category === undefined
            ? this.props.fetchPosts()
            : this.props.fetchPostsByCategory(this.props.params.category);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ posts: nextProps.posts, postsExist: false });
        if (nextProps.params.category !== undefined) {
            for (var i in nextProps.categories) {
                if (nextProps.categories[i].path === nextProps.params.category)
                    this.setState({ postsExist: true });
            }
        } else this.setState({ postsExist: true });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props && this.state.posts.sort !== undefined) {
            switch (this.state.sortMode) {
                case 'recent':
                    this.sortByRecent();
                    break;
                case 'oldest':
                    this.sortByOldest();
                    break;
                case 'high score':
                    this.sortByHighscore();
                    break;
                case 'low score':
                    this.sortByLowscore();
                    break;
                default:
                    this.sortByRecent();
            }
        }
    }

    generateDetailedPostLink(post_details) {
        return '/' + post_details.category + '/' + post_details.id;
    }

    render() {
        return (
            this.state.postsExist
            ?   <div className="all-posts">
                    <PostModal isOpen={this.state.postModalOpen} parent={this} post={this.state.editingPost} />
                    <NewPost categories={this.props.categories} parent={this} />
                    <div className='category-select'>
                        Sort category: 
                        <Link to='/'><button className="categories-button">show all</button></Link>
                        {this.props.categories.map !== undefined ?
                            this.props.categories.map((category) => (
                                <Link to={'/' + category.path} key={category.path}><button className="categories-button" onClick={() => this.props.fetchPostsByCategory(category.path)} >{category.name.toUpperCase()} </button></Link>
                            ))
                            : <div />
                        }
                        <div className='sorting-select'>
                            Sort posts by:<button className="categories-button" onClick={() => this.sortByRecent()}>RECENT</button>
                                          <button className="categories-button" onClick={() => this.sortByOldest()}>OLDEST</button>
                                          <button className="categories-button" onClick={() => this.sortByHighscore()}>HIGH SCORE</button>
                                          <button className="categories-button" onClick={() => this.sortByLowscore()}>LOW SCORE</button>
                        </div>
                    </div>
                    <ol className="posts">
                        {this.state.posts.map !== undefined ?
                            this.state.posts.map((post) => (
                                <div className="post" key={post.id}>
                                    <div className="post-title"> ====== {post.title} ======</div>
                                    by {post.author} -- Category: {post.category.toUpperCase()}<br />
                                    Posted on {new Date(post.timestamp).toTimeString()} {new Date(post.timestamp).toDateString()}<br />
                                    ID: {post.id}<br />
                                    ==== Comments ({post.commentCount}) ==== Score ({post.voteScore}) ====<br />
                                    <Link to={this.generateDetailedPostLink(post)}><button className="details-button">See Comments/Details</button></Link>
                                    <button className="voteup-button" onClick={() => this.votePost(post.id, 'upVote')}>Vote up!</button>
                                    <button className="votedown-button" onClick={() => this.votePost(post.id, 'downVote')}>Vote down</button>
                                    <button className="delete-button" onClick={() => this.deletePost(post.id)}>delete</button>
                                    <button className="edit-button" onClick={() => this.openPostModal(post)}>edit</button><br />
                                </div>
                            ))
                            : <option />}
                    </ol>
                </div>
                :   <div className="posts-404">
                    404 <br /> CATEGORY {this.props.params.category} NOT FOUND <br /> Did you mean to capitalize? <br /> i.e. /SUSHI not /sushi <br/> <Link to="/"><button className="submit-button"> Return to home </button></Link>
                    </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.reducedPosts.items,
})

export default connect(mapStateToProps, { fetchPosts, fetchPostsByCategory, votePost, deletePost })(Posts);