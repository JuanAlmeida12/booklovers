import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Modal, Input, Button,Icon } from 'react-materialize'

import { register } from '../post/postActions'
import { searchClub } from './clubActions'
 
class ShareButton extends Component {

    constructor(props) {
        super(props)
        this.handleChangeMessage = this.handleChangeMessage.bind(this)
        this.handleChangeClub = this.handleChangeClub.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.state = {
            message: '',
            club: '',
            thumbnail: props.book.thumbnail,
            book: props.book.id,
            title: props.book.title
        }
    }

    handleChangeMessage(e) {
        this.setState({ ...this.state, message: e.target.value })
    }

    handleChangeClub(e) {
        console.log(e.target.value)
        this.setState({ ...this.state, club: e.target.value })
    }

    handleAdd() {
        console.log(this.state)
        this.props.register({ ...this.state })
    }

    componentWillMount() {
        this.props.searchClub(true)
    }

    componentWillUnmount() {
        this.props.searchClub(false)
    }

    renderClupOptions() {
        const list = this.props.list || []
        return list.map(club => (
            <option value={club._id}>{club.name}</option>
        ))
    }   

    render() {
        return (  
            <div>
                <div className='share-box'>
                    <div >
                        <Input type='select' label='Selecione o Clube' onChange={this.handleChangeClub}>
                            <option value="" disabled selected>Selecione o Clube</option>
                            {this.renderClupOptions()}
                        </Input>
                    </div>
                    <textarea
                        onChange={this.handleChangeMessage}
                        className={"materialize-textarea"}
                        placeholder={"Digite a mensagem do Post"}
                        type={'textarea'} />       
                            
                    <button className="btn waves-effect waves-light" onClick={this.handleAdd}>Compartilhar
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.club.list })
const mapDispatchToProps = dispatch => 
    bindActionCreators({ register, searchClub }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ShareButton)