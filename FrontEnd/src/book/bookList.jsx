import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Card, CardTitle } from 'react-materialize'
import { hashHistory } from 'react-router'

import { moreInfo } from './bookActions'

const BookList = props => {

    const updateAndRedirect = (book) => {
        hashHistory.push(`/books/info/${book.id}`)
    }

    const renderCards = () => {
        const list = props.list || []
        return list.map(book => (
            <div className='col s3'>
                <div onClick={() => updateAndRedirect(book)} className='book-item-container hoverable'>
                    <div className='row'>
                        <img className='col push-m2' src={book.thumbnail?book.thumbnail:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'} />
                    </div>
                    <h5 className="truncate center-align"> {book.title}</h5>
                </div>
            </div>
        ))
    }

    return (
        <div className='row'>
            {renderCards()}
        </div>
    )
}

const mapStateToProps = state => ({list: state.book.list})
const mapDispatchToProps = dispatch => 
    bindActionCreators({ moreInfo }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BookList)