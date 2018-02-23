import React from 'react'

import BookSearchForm from './bookSearchForm'
import BookList from './bookList'

export default props => (
    <div className='container' style={{ width: '100%' }}>
        <div className='row'>
            <h4 href="#!" >Livros</h4>
            <div className='card' style={{ padding: '15px' }}>
                <BookSearchForm />
                <div className="divider" style={{ marginBottom: '15px' }}></div>
                <BookList />
            </div>
        </div>
    </div>
)