import React, { Component } from 'react'
import { NavItem, Navbar, Icon, Button } from 'react-materialize'

import SideBar from '../sidebar/sidebar'

export default class NavBar extends Component {
    render() {
        return (
            <Navbar brand='logo'  options={{menuWidth: 80}} right>
                <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
                <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
                <NavItem href='get-started.html'><Icon>refresh</Icon></NavItem>
                <NavItem href='get-started.html'><Icon>more_vert</Icon></NavItem>
            </Navbar>
        )
    }
}