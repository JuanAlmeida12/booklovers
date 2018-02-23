import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { Row } from 'react-materialize'

import { add, changeImage } from './clubActions'
import Input from '../common/form/input'
import TextArea from '../common/form/textarea'

class ClubRegister extends Component {

    onSubmit(values) {
        console.log(values)
        const { add } = this.props
        add(values)
    }

    render() {
        const { handleSubmit, changeImage, image_add } = this.props
        return(
            <div className='card' style={{ padding:'20px' }}>
                <Row>
                    <div className='col s3'>
                        <div className='book-imag' >
                            <img className='col push-s4' style={{height:'100px'}} src={ image_add }/>
                        </div>
                    </div>
                    <i><p style={{ color: '#bdbdbd' }}>"Nesta área é possivel adicionar novos clubes, basta preencher os campos abaixo"</p></i>
                </Row>
                <div className="divider" style={{ marginBottom: '15px' }}></div>
                <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                    <Field component={Input} name='name' placeholder="Nome do Grupo" label='Nome' /> 
                    <Field component={Input} name='image' placeholder="URL da imagem"  label="Imagem" type='text' onChange={changeImage} />           
                    <Field component={TextArea} name='message' type='textarea' placeholder="Escreva Sua Mensagem" label="Mensagem"/>
                    <button className="btn waves-effect waves-light" type="submit">Cadastrar
                        <i className="material-icons right">send</i>
                    </button>
                    <a href='#/clubs' className="waves-effect waves-teal btn-flat">Cancelar</a>
                </form>
            </div>
        )
    }
}

ClubRegister = reduxForm({form: 'clubRegisterForm'})(ClubRegister)
const mapStateToProps = state => ({ image_add: state.book.image_add })
const mapDispatchToProps = dispatch => 
    bindActionCreators({ add, changeImage }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClubRegister)