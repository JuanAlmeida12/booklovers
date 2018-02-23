import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import If from '../common/if'
import Comments from '../comment/comment'
import WishButton from '../wish/wishButton'
import { fetchBook } from './bookActions'
import ShareButton from '../club/shareButton'

class BookInfo extends Component {

    constructor(props){
        super(props)
    }

    componentWillMount() {
        this.props.fetchBook(this.props.params.book)
    }

    formatAuthors(authors) {
        let formattedString = ''
        authors.forEach((e , index) => {
            if(index > 0) formattedString += `, ${e}`
            else formattedString = e
        })
        return formattedString
    }

    renderInfo() {
        return (
            <div className='card'>
                <div className='row'>
                    <div className='col s5'style={{ padding: '5px', background:'#dbdbdb', marginLeft: '10px'}}>
                        <img className='col push-s1' style={{ width: '20vw', marginLeft: '15px' }} src={ this.props.current_book.thumbnail } />
                    </div>
                    <div className='col s6'>
                        <p><strong>Titulo:</strong> { this.props.current_book.title }</p>
                        <p><strong>Ano de Publicação:</strong> { this.props.current_book.publishedDate }</p>
                        {this.props.current_book.publisher? <p><strong>Editora:</strong> { this.props.current_book.publisher }</p>:''}
                        {this.props.current_book.authors? <p><strong>Autores:</strong> { this.formatAuthors(this.props.current_book.authors) }</p>:''}
                        {this.props.current_book.averageRating? <p><strong>Avaliação do Google Books:</strong> { this.props.current_book.averageRating }</p>:''}
                        {this.props.current_book.description? <p><strong>Descrição:</strong> { this.props.current_book.description }</p>:''}
                    </div>
                </div>
                <div className='divider'> </div>
                <div className='row'>
                    <div className='col s3 offset-s4'>
                        <WishButton />
                        <label>Compartilhe em um grupo</label>
                        <ShareButton book={this.props.current_book}/>
                    </div>
                </div>
                <div className='divider'> </div>
                <h5 style={{ marginLeft: '15px' }}>Comentários</h5>
                <Comments typeComment={'Book'} objId={this.props.current_book.id} current_user={this.props.user._id}/>
            </div>
        )
    }

    renderLoad() {
        return (
            <div className='row'>
                <div className='col s3 offset-s4'>
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    renderInfoOrLoad() {
        if(!this.props.fetching) {
            return this.renderInfo()
        } else {
            return this.renderLoad()
        }
    }

    render () {
        return (
            this.renderInfoOrLoad()
        )
    }
}

const mapStateToprops = state => ({ current_book: state.book.current_book, fetching: state.book.fetching, user: state.auth.user })
const mapDispatchToprops = dispatch => 
    bindActionCreators({ fetchBook }, dispatch)
export default connect(mapStateToprops, mapDispatchToprops)(BookInfo)