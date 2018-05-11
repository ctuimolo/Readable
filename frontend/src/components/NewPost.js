import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postPost } from '../actions/postActions';

class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            author: '',
            category: '',
            postModalOpen: false
        }
        this.onChange = this.onChange.bind(this);
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

    submitPost() {

        var new_post = ({
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,
            category: this.state.category,
            id: this.generateID(),
            timestamp: Date.now(),
        })

        var post_keys = Object.keys(new_post);
        var missing_values = [];
        for (var i in post_keys) {
            if (new_post[post_keys[i]] === '') {
                missing_values.push(post_keys[i]);
            }
        }

        if (missing_values.length > 0)
            alert("Please fill in the missing values:\n" + missing_values);
        else {
            this.props.postPost(new_post);
            this.props.parent.updateFetch();
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="new-post">
                <div>Title: </div>
                <input className='text-input-title' type='text' name='title' onChange={this.onChange} value={this.state.title} />
                <br />
                <div>Body: </div>
                <textarea className='text-input-body' type='text' name='body' onChange={this.onChange} value={this.state.body} />
                <div>Author: </div>
                <input className='text-input-title' type='text' name='author' onChange={this.onChange} value={this.state.author} />
                <br />
                <select className='dropdown-menu' defaultValue="default" name='category' onChange={this.onChange}>
                    <option value="default" disabled='disabled'>select category</option>
                    {this.props.categories.map((category) => (
                        <option key={category.path} value={category.name}>{category.name.toUpperCase()}</option>
                    ))}
                </select>
                <button
                    className="submit-button"
                    onClick={() => this.submitPost()}>
                    Submit new post
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { postPost })(NewPost);