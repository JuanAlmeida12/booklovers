import 'modules/materialize-css/dist/css/materialize.min.css'
import 'modules/materialize-css/dist/js/materialize.min.js'
import 'modules/font-awesome/css/font-awesome.min.css'

import React from 'react'

import SideBar from '../common/sidebar/sidebar'
import NavBar from '../common/navbar/navbar'

export default props => (
    <div className='container-fluid'>
        <div className='row'>
            <NavBar />
            <SideBar />
        </div>
    </div>
)
