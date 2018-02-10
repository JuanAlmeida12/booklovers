import 'modules/materialize-css/dist/css/materialize.min.css'
import 'modules/materialize-css/dist/js/materialize.min.js'
import 'modules/font-awesome/css/font-awesome.min.css'

import React from 'react'

import SideNav from '../common/sidenav/sidenav'
import Routes from './routes'

export default props => (
    <div className='container'>
        <SideNav />
        <Routes />
    </div>
)
