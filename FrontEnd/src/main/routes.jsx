import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import BookMain from '../book/bookMain'
import ClubMain from '../club/clubMain'
import ClubRegister from '../club/clubRegisterForm'
import ClubPage from '../club/clubPage'
import ConfigForm from '../auth/configs'
import BookInfo from '../book/bookInfo'
import WishList from '../wish/wishList'
import AuthOrApp from './authOrApp'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp}>
            <Route path='books' >
                <IndexRoute component={BookMain} />
                <Route path='info(/:book)' component={BookInfo} />
            </Route>
            <Route path='wishes' component={WishList} />
            <Route path='clubs' >
                <IndexRoute component={ClubMain} />
                <Route path='register' component={ClubRegister} />
                <Route path='page(/:club)' component={ClubPage} />
            </Route>
            <Route path='config' component={ConfigForm} />
        </Route>
        <Redirect from='*' to='/books' />
    </Router>
)