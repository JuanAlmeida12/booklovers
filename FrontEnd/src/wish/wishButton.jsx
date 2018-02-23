import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addWish, removeWish, verify } from './wishActions'

class WishButton extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.verify()
    }

    render() {
        const { verification,  addWish, removeWish } = this.props
        return (
            <div style={{ margin: '5px' }}>
                <label>Deseja {!verification? 'adicionar a':'remover da'} lista de desejos?</label>
                <button className="waves-effect waves-light btn" onClick={!verification? addWish:removeWish} >{!verification? 'Adicionar!':'Remover'}</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({ verification: state.wish.verification })
const mapDispatchToProps = dispatch => 
    bindActionCreators({ addWish, removeWish, verify }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(WishButton)