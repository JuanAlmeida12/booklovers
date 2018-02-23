import 'modules/materialize-css/dist/css/materialize.min.css'
import 'modules/materialize-css/dist/js/materialize.min.js'
import 'modules/font-awesome/css/font-awesome.min.css'
import '../common/css/custom.css'

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import App from './app'
import Auth from '../auth/auth'
import { validateToken } from '../auth/authActions'

class AuthOrApp extends Component {
    componentWillMount() {
        if (this.props.auth.user) {
            this.props.validateToken(this.props.auth.token)
        }
    }

    render() {
        const { user, validToken, token } = this.props.auth
        if (user && validToken) {
            axios.defaults.headers.common['x-access-token'] = token
            return <App>{this.props.children}</App>
        } else if (!user && !validToken) {
            return <Auth />
        } else {
            return false
        }
    }
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)