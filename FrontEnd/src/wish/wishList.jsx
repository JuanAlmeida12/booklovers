import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Card, CardTitle } from 'react-materialize'
import { hashHistory } from 'react-router'

import { wishList, clearList } from './wishActions'

class WishList extends Component {

    updateAndRedirect(book) {
        hashHistory.push(`/books/info/${book}`)
    }

    componentWillMount() {
        this.props.clearList()
        this.props.wishList()
    }

    renderCards() {
        const list = this.props.list || []
        return list.map(wish => (
            <div>
                <div className='col s3'>
                    <div onClick={() => this.updateAndRedirect(wish.book)} className='book-item-container hoverable'>
                        <div className='row'>
                            <img className='col push-m2' src={wish.thumbnail?wish.thumbnail:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'} />
                        </div>
                        <h5 className="truncate center-align"> {wish.title}</h5>
                    </div>
                </div>
            </div>
        ))
    }

    render() {
        return (
            <div>
                <h4 href="#!" >Lista de Desejos</h4>
                <div className='card' style={{ minHeight: '100vh' }}>
                    <p className="center-align" style={{ margin:'20px', color: 'gray' }}>Nesta seção vocé pode ver os livros que você adicionou a lista de desejos.
                        Adicionar livros a lista de desejos irá te ajudar a lembrar dos livros que você achou interessantes e deseja comprar eles futuramente</p>
                    <div className='divider'></div>
                    <div className='row'>
                        {this.renderCards()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({list: state.wish.list})
const mapDispatchToProps = dispatch => 
    bindActionCreators({ wishList, clearList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(WishList)