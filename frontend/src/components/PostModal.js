import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { editPost } from '../actions/postActions';

class PostModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            isOpen: false,
            post: undefined,
            post_id: undefined,
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    editPost() {
        var post_update = ({
            title: this.state.title,
            body: this.state.body,
            id: this.state.post_id
        })

        var post_keys = Object.keys(post_update);
        var missing_values = [];
        for (var i in post_keys) {
            if (post_update[post_keys[i]] === '') {
                missing_values.push(post_keys[i]);
            }
        }

        if (missing_values.length > 0)
            alert("Please fill in the missing values:\n" + missing_values);
        else {
            this.props.editPost(post_update);
            this.props.parent.updateFetch();
            this.props.parent.closePostModal();
        }
    }

    componentWillMount() {
        Modal.setAppElement('body');
        this.setState({ isOpen: this.props.isOpen });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isOpen: nextProps.isOpen, post: nextProps.post, body: nextProps.post.body, title: nextProps.post.title, post_id: nextProps.post.id });
    }


    render() {
        return (
            <Modal
                className='post-modal'
                overlayClassName='overlay'
                isOpen={this.state.isOpen}
                contentLabel='Modal'
            >
                <div>======== EDIT POST ========</div><br />
                <div>Editing post ID: {this.state.post_id}</div><br />
                <div>Title: </div>
                <input className='text-input-title' type='text' name='title' onChange={this.onChange} value={this.state.title} />
                <br />
                <div>Body: </div>
                <textarea className='text-input-body' type='text' name='body' onChange={this.onChange} value={this.state.body} />
                <br />
                <button className="submit-button" onClick={() => this.editPost()}>
                    Submit changes
				</button> <button className="close-modal" onClick={() => { this.props.parent.closePostModal()}}>CANCEL [X]</button>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { editPost })(PostModal);