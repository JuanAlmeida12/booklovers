import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { Row } from 'react-materialize'

import { update } from './authActions'
import Input from '../common/form/input'

class ConfigForm extends Component {

    onSubmit(values) {
        console.log(values)
        const { update } = this.props
        update(values)
    }

    render() {
        const { handleSubmit, changeImage, image_add } = this.props
        return(
            <div>
            <h4 href="#!" >Configurações</h4>
                <div className='card' style={{ padding:'20px' }}>
                    <Row>
                        <div className='col s3'>
                            <div className='book-imag' >
                            </div>
                        </div>
                        <i><p style={{ color: '#bdbdbd' }}>"Nesta área é possivel alterar seu nome e foto, basta preencher os campos abaixo"</p></i>
                    </Row>
                    <div className="divider" style={{ marginBottom: '15px' }}></div>
                    <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                        <Field component={Input} name='name' placeholder="Altere seu nome" label='Nome' /> 
                        <Field component={Input} name='image' placeholder="URL da imagem"  label="Imagem" type='text' onChange={changeImage} />           
                        <button className="btn waves-effect waves-light" type="submit">Atualizar
                            <i className="material-icons right">send</i>
                        </button>
                        <a href='#/clubs' className="waves-effect waves-teal btn-flat">Cancelar</a>
                    </form>
                </div>
            </div>
        )
    }
}

ConfigForm = reduxForm({form: 'updateUserForm'})(ConfigForm)
const mapStateToProps = state => ({ })
const mapDispatchToProps = dispatch => 
    bindActionCreators({ update }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ConfigForm)