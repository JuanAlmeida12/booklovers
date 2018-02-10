import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Card, CardTitle } from 'react-materialize'

import { remove } from './bookActions'

const BookList = props => {

    const renderCards = () => {
        const list = props.list || []
        return list.map(book => (
            <Card className='small' className="col s4"
                header={<CardTitle image={book.image}>{book.title}</CardTitle>}
                actions={[<a href='#'>Mais Info</a>]}>
                {book.sinopse}
            </Card>
        ))
    }

    return (
        <Row>
            {renderCards()}
        </Row>
    )
}

const mapStateToProps = state => ({list: state.book.list})
const mapDispatchToProps = dispatch => 
    bindActionCreators({ remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BookList)