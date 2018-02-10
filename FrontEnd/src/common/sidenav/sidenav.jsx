import React, { Component } from 'react'

export default class SideNav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul id="slide-out" className="side-nav fixed">
            <li style={{marginBottom: '20px'}}>
                <div className="userView">
                    <img className="background" style={{height: '250px'}} src="http://i.ebayimg.com/00/s/NTY2WDg0OA==/z/25IAAOxyx0JTjb6a/$_32.JPG?set_id=880000500F" />
                    <a><img className="circle" style={{background: '#fff'}} src="https://openclipart.org/image/2400px/svg_to_png/277084/Male-Avatar-3.png" /></a>
                    <a><span className="white-text name">John Doe</span></a>
                    <a><span className="white-text email">jdandturk@gmail.com</span></a>
                    <a><span className="white-text name"> Level 2 </span></a>
                    <div className="progress">
                        <div className="determinate" style={{width: '70%'}}></div>
                    </div>
                </div>
            </li>
                <li><a href="#!"className="waves-effect"><i className="material-icons">home</i>Inicio</a></li>
                <li><a href="#!"className="waves-effect"><i className="material-icons">book</i>Livros</a></li>
                <li><a href="#!"className="waves-effect"><i className="material-icons">visibility</i>Lista de desejos</a></li>
                <li><a href="#!"className="waves-effect"><i className="material-icons">announcement</i>Anúncios</a></li>
                <li><a href="#!"className="waves-effect"><i className="material-icons">account_circle</i>Perfil</a></li>
                <li><div className="divider"></div></li>
                <li><a href="#!" className="waves-effect"><i className="material-icons">exit_to_app</i>Sair</a></li>
        </ul>
        )
    }
}