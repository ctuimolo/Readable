import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import { fetchCategories } from '../actions/categoriesActions'


class Posts extends Component {

    componentWillMount() {
        this.props.fetchPosts();
        this.props.fetchCategories();
    }

    componentDidUpdate() {
        console.log("UPDATED >>>>>>>");
        console.log(this.props.posts);
        console.log(this.props.categories);
    }

    render() {
        return (
            <div className="all-posts">
                <div className='category-select'>
                    Sort category: 
                        {this.props.categories.map((category) => (
                            <button className="categories-button" key={category.path}>{category.name.toUpperCase()}</button>
                    ))}
                    <div className='sorting-select'>
                        Sort posts by:<button className="categories-button">DATE</button><button className="categories-button">SCORE</button>
                    </div>
                </div>
                <ol className="posts">
                    {this.props.posts.map((post) => (
                        <div className="post" key={post.id}>
                            ==== Category: {post.category.toUpperCase()} ====<br />
                            <div className="post-title">{post.title} <br /></div>by {post.author}<br />
                            Posted on {Date(post.timestamp)}<br />
                            <div className="post-body">{post.body}<br /></div>
                            ==== Comments ({post.commentCount}) ==== Score ({post.voteScore}) ====<br />
                            <button className="details-button" onClick={() => console.log("clicked")}>See Comments/Details</button>
                            <button className="voteup-button" onClick={() => console.log("clicked")}>Vote up!</button>
                            <button className="votedown-button" onClick={() => console.log("clicked")}>Vote down</button><br />
                        </div>
                    ))}
                </ol>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.reducedPosts.items,
    categories: state.reducedCategories.items
})

export default connect(mapStateToProps, { fetchPosts, fetchCategories })(Posts);