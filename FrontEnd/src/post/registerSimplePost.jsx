import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { register, getPosts } from './postActions'
import TextArea from '../common/form/textarea'

class SimplePostForm extends Component {

    onSubmit(values) {
        console.log(values)
        const { register, club } = this.props
        register({ ...values,  club })
    }

    componentWillMount() {
        this.props.getPosts()
    }

    render() {
        const { handleSubmit } = this.props
        return(
            <div className='card' style={{ padding:'20px' }}>
                <h5>Criar postagem</h5>
                <form onSubmit={handleSubmit(v => this.onSubmit(v))}>          
                    <Field component={TextArea} name='message' type='textarea' placeholder="Mensagem"/>
                    <button className="btn waves-effect waves-light" type="submit">Postar
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        )
    }
}

SimplePostForm = reduxForm({form: 'simplePostForm'})(SimplePostForm)
const mapStateToProps = state => ({ })
const mapDispatchToProps = dispatch => 
    bindActionCreators({ register, getPosts }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SimplePostForm)