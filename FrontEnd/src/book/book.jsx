import React from 'react'

import BookForm from './bookForm'
import BookList from './bookList'

export default props => (
    <div className='row'>
        <BookForm />
        <div className="divider"></div>
        <BookList />
    </div>
)