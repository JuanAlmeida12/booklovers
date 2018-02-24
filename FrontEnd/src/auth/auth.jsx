import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, register } from './authActions'
import If from '../common/if'
import Input from '../common/form/input'
import Messages from '../common/msg'

export class Auth extends Component {
    constructor(props) {
        super(props)
        this.changeMode = this.changeMode.bind(this)
        this.state = {loginMode: true}
    }
    
    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }
    
    onSubmit(values) {
        console.log(values)
        const { login, register } = this.props
        this.state.loginMode ? login(values) : register(values)
    }
    
    render() {
        const { loginMode } = this.state
        const { handleSubmit } = this.props
        return (
            <div>
            <div className="container">
                <div className="login-container">
                        <div id="output"></div>
                        <h5>{loginMode? 'Login': 'Cadastro'}</h5>
                        <div className='divider'></div>
                        <br/>
                        <div className="form-box">
                            <If test={loginMode}>
                                <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                                    <Field component={Input} name="email" type="text" placeholder="Email" id='email-login' />
                                    <Field component={Input} name="password" type="password" placeholder="Senha" />
                                    <button className="btn waves-effect waves-light" type="submit">Login
                                        <i className="material-icons right">send</i>
                                    </button>
                                </form>
                            </If>
                            <If test={!loginMode}>
                                <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                                    <img className="circle" style={{background: '#fff', height: '100px'}} src="https://openclipart.org/image/2400px/svg_to_png/277084/Male-Avatar-3.png" />
                                    <Field component={Input} name="name" type="text" placeholder="Nome" />
                                    <Field component={Input} name="email" type="text" placeholder="Email" />
                                    <Field component={Input} name="image" type="text" placeholder="Link da Imagem" />
                                    <Field component={Input} name="password" type="password" placeholder="Senha" />
                                    <button className="btn waves-effect waves-light" type="submit">Cadastrar
                                        <i className="material-icons right">send</i>
                                    </button>
                                </form>
                            </If>
                            <br/>
                            <a onClick={() => this.changeMode()} className="waves-effect waves-teal btn-flat">{loginMode? 'Cadastro':'Voltar' }</a>
                        </div>
                    </div>
            </div>

            <Messages />            
            </div>
        )
    }
}

Auth = reduxForm({form: 'authForm'})(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login, register },
dispatch)
export default connect(null, mapDispatchToProps)(Auth)
