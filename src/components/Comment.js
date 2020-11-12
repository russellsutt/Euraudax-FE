import React, { Component } from 'react'
import { Media }  from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class Comment extends Component {


    deleteComment = () => { 
        this.props.deleteComment(this.props.comment.id)
    }

    render() {
        return (
            <div className="comment">
                <Media as="li">
                    <img className="comment-image" width={75} height={75} src={this.props.comment.user.pic} alt=""/>
                    <Media.Body className='comment-text'>
                        <p style={{ textDecoration: 'underline'}}> {this.props.comment.user.firstname}{this.props.comment.user.lastname}</p>
                        <h5>{this.props.comment.content}</h5>
                    </Media.Body>
                        { this.props.comment.user.id === this.props.user.id ? <button className="delete-comment" onClick={this.deleteComment}>X</button> : null }
                </Media>
            </div>
        )
    }
}

export default withRouter(Comment)