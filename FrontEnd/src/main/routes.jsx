import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Book from '../book/book'

export default props => (
    <Router history={hashHistory}>
        <Route path='/books' component={Book} />
        <Redirect from='*' to='/books' />
    </Router>
)