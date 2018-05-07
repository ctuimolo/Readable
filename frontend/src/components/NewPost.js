import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            author: ''
        }

        this.onChange = this.onChange.bind(this);
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
                <select className='dropdown-menu'>
                    <option selected="selected" disabled="disabled">choose category</option>
                    <option value="option1">option 1</option>
                    <option value="option1">option 2</option>
                    <option value="option1">option 3</option>
                </select> <button className="submit-button">Submit new post</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, {})(NewPost);