import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from '../../auth/authActions'

class SideNav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul id="slide-out" className={`side-nav fixed ${this.props.className}`}>
            <li style={{marginBottom: '20px'}}>
                <div className="userView">
                    <img className="background" style={{height: '190px'}} src="http://www.solidbackgrounds.com/images/2560x1600/2560x1600-dark-gray-solid-color-background.jpg" />
                    <a><img className="circle" style={{background: '#fff'}} src={this.props.user.image} /></a>
                    <a><span className="white-text name">{this.props.user.name}</span></a>
                    <a><span className="white-text email">{this.props.user.email}</span></a>
                    
                </div>
            </li>
                <li><a href="#/books"className="waves-effect"><i className="material-icons">book</i>Livros</a></li>
                <li><a href="#/wishes"className="waves-effect"><i className="material-icons">visibility</i>Lista de desejos</a></li>
                <li><a href="#/clubs"className="waves-effect"><i className="material-icons">announcement</i>Clubes</a></li>
                <li><a href="#/config"className="waves-effect"><i className="material-icons">account_circle</i>Configurações</a></li>
                <li><div className="divider"></div></li>
                <li><a href="#!" onClick={this.props.logout} className="waves-effect"><i className="material-icons">exit_to_app</i>Sair</a></li>
        </ul>
        )
    }
}

const mapStateToProps = state => ({user: state.auth.user })
const mapDispatchToProps = dispatch => 
    bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SideNav)