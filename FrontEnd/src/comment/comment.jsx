import React, { Component } from 'react'
import axios from 'axios'

import consts from '../common/consts'
import CommentForm from './commentForm'
import CommentList from './commentList'

const URL = `${consts.API_URL}/comments`

export default class Comments extends Component {

    constructor(props) {
        super(props)
        this.changeMessage = this.changeMessage.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.state = {
            list : [],
            comment: ''
        }
        this.getComments(props.typeComment, props.objId)
    }

    changeMessage(e) {
        this.setState({
            ...this.state,
            comment: e.target.value
        })
    }

    handleAdd() {
        const owner = this.props.current_user
        const { typeComment, objId } = this.props
        const data = typeComment === 'Book' ? { comment: this.state.comment, book: objId, owner }:{ comment: this.state.comment, post: objId, owner }
        console.log(data)
        axios.post(URL, data)
            .then((resp, error) => {
                if(error) { 
                    console.log(error) 
                    return
                }
                this.getComments(typeComment, objId)
            })
    }

    getComments(type, id) {
        axios.get(`${URL}/populated?id=${id}&type=${type}`)
            .then((resp, error) => {
                if(error) { 
                    console.log(error) 
                    return
                }
                this.setState({ ...this.state, list: resp.data })
            })
    }

    render() {
        return (
            <div >
                <CommentForm handleChange={this.changeMessage} handleAdd={this.handleAdd} />
                <CommentList list={this.state.list}/>
            </div>
        )
    }
}