import React, { Component } from 'react'
import Comment from '../components/Comment'
import { Form, Container } from 'react-bootstrap'

// const BASE_API = "https://euraudax-app-api.herokuapp.com/"
const BASE_API = "http://localhost:3000/"

class CommentContainer extends Component {

    state = {
        allComments: [],
        newComment: '',
        filter: ''
    }

    componentDidMount() {
        this.setState({ allComments: this.props.comments })
    }

    renderComments = () => {
        if (this.state.allComments.length > 0) {
            return this.state.allComments.map(comment => <Comment deleteComment={this.deleteComment} key={comment.id} comment={comment} user={this.props.user}/>)
        }
    }

    submitComment = (e) => {
        e.preventDefault()
        fetch(BASE_API + '/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json'
            },
            body: JSON.stringify({
                content: this.state.newComment,
                user_id: this.props.user.id,
                event_id: this.props.event.id
            })
        })
            .then(resp => resp.json())
            .then(data => this.setState({ allComments: [...this.state.allComments, data] }, () => this.renderComments()))
            .then(() => this.setState({ newComment: '' }))
    }
    
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    deleteComment = (commentId) => { 
        fetch(BASE_API + 'comments/' + commentId, { 
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'accepts': 'application/json',
            }
        })
        .then(() => {
            let updatedArray = this.state.allComments.filter(comment => comment.id !== commentId)
            this.setState({ allComments: updatedArray })
        })
        .then(() => this.renderComments())
    }

    render() {
        return (
            <Container fluid id='comment-container'>
                <h5 style={{ textDecoration: 'underline'}}>Comments</h5>
                {this.props.comments.length > 0 ? this.renderComments() : null }
                <h5>Leave a Comment</h5>
                <Form onSubmit={this.submitComment} id='comment-form'>
                    <Form.Group>
                        <Form.Control type='text' name="newComment" value={this.state.newComment} onChange={this.changeHandler} placeholder='Comment...'></Form.Control>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}


export default CommentContainer

