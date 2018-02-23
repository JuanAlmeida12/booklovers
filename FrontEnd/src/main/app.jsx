import 'modules/materialize-css/dist/css/materialize.min.css'
import 'modules/materialize-css/dist/js/materialize.min.js'
import 'modules/font-awesome/css/font-awesome.min.css'

import React from 'react'

import SideNav from '../common/sidenav/sidenav'
import Auth from '../auth/auth'
import Messages from '../common/msg'

export default props => (
    <div className='container'>
        <div className="row">
            <SideNav />
            <div className='content-div'>
                {props.children}
            </div>
            <Messages />
        </div>
    </div>
)
