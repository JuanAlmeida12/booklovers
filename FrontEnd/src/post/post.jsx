import React, { Component } from 'react'

import Comments from '../comment/comment'

export default class Post extends Component {

    constructor(props) {
        super(props)
        this.handleShowComments = this.handleShowComments.bind(this)
        this.state = {
            post: props.post,
            user: props.user._id,
            hideComments: true
        }
    }
    
    formatDate(datestring) {
        let date = new Date(datestring)
        
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        let hour = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()

        if(day < 10) {
            day = `0${day}`
        }
        if(month < 10) {
            month = `0${month}`
        }
        if(hour < 10) {
            hour = `0${hour}`
        }
        if(minutes < 10) {
            minutes = `0${minutes}`
        }
        if(seconds < 10) {
            seconds = `0${seconds}`
        }

        return `${hour}:${minutes}:${seconds} ${day}/${month}/${year}`
    }
    
    handleShowComments(e) {
        this.setState({ ...this.state, hideComments: !this.state.hideComments })
    }

    render() { 
        const { post, user } = this.state
        return (
            <div  className='card'>
                    <div>
                        <div className='row'>
                            <div className='col s2' style={{ marginTop:'30px' }}>
                                <div className='row'>
                                    <img className='col push-s3' src={post.createdBy.image} style={{ width: '50%' }} />
                                </div>
                                <div className='row'>
                                    <p  className='center-align'>{post.createdBy.name}</p>
                                </div>
                            </div>
                            <div className='col s9 post-box'>
                                <p className='date-format' style={{textAlign:'left'}}>
                                    {this.formatDate(post.createdAt)}
                                </p>
                                <div>
                                    <div  style={{ display: post.message?'block':'none' }}>
                                        <p>{post.message}</p>
                                    </div>
                                    <div className='col s6 offset-s4' style={{ display: post.thumbnail?'block':'none' }}>
                                        <div className='row'><a href={`#/books/info/${post.book}`}>{post.title}</a></div>
                                        <div className='row'><img src={post.thumbnail} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <a onClick={this.handleShowComments} className="waves-effect waves-teal btn-flat">{this.state.hideComments?'Mostrar':'Ocultar'} Comentários</a>
                    <div className='row gray' style={{ display: this.state.hideComments?'none':'block' }}>
                        <div className='col s7 offset-s2'>
                            <Comments typeComment='Post' objId={post._id} current_user={user}/>
                        </div>
                    </div>
                </div>
        )
    }
}