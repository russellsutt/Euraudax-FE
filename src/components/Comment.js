import React, { Component } from 'react'
import { Media }  from 'react-bootstrap'
import { withRouter } from 'react-router-dom'


class Comment extends Component {

    render() {
        return (
            <div>
            <Media as="li">
                <img className="comment-image" width={75} height={75} src={this.props.comment.user.pic} alt=""/>
                <Media.Body className='comment-text'>
                    <h5>{this.props.comment.user.firstname}{this.props.comment.user.lastname}</h5>
                    <p>{this.props.comment.content}</p>
                </Media.Body>
                </Media>
            </div>
        )
    }
}

export default withRouter(Comment)