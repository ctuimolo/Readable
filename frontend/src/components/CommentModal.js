import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { editComment } from '../actions/commentsActions';

class CommentModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
            body: '',
            isOpen: false,
            comment: undefined,
            comment_id: undefined
		}

        this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

    editPost() {
        var comment_update = ({
            id: this.state.comment_id,
            body: this.state.body,
            timestamp: Date.now(),
        })

        if (comment_update.body === '')
            alert("Please fill in the missing values:\nbody");
        else {
            this.props.editComment(comment_update);
            this.props.parent.updateFetch();
            this.props.parent.closeCommentModal();
        }
    }

    componentWillMount() {
        Modal.setAppElement('body');
        this.setState({ isOpen: this.props.isOpen });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isOpen: nextProps.isOpen, comment: nextProps.comment, body: nextProps.comment.body, comment_id: nextProps.comment.id });
    }

	render() {
		return (
			<Modal
				className='comment-modal'
				overlayClassName='overlay'
				isOpen={this.state.isOpen}
				contentLabel='Modal'
			>
				<div>======== EDIT COMMENT ========</div><br />
                <div>Editing Comment ID: {this.state.comment_id}</div><br />
				<div>Body: </div>
				<textarea className='text-input-body' type='text' name='body' onChange={this.onChange} value={this.state.body} />
				<br />
                <button className="submit-button" onClick={() => this.editPost()}>
				Submit changes
				</button><button className="close-modal" onClick={() => { this.setState({ isOpen: false }); this.props.parent.closeCommentModal();}}>CANCEL [X]</button>
			</Modal>
		)
	}
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { editComment })(CommentModal);