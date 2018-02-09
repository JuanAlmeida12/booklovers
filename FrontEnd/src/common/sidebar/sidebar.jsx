import React, { Component } from 'react'
import { SideNav, Button, SideNavItem } from 'react-materialize'

export default class Sidebar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SideNav
                trigger={<Button floating large className='red' waves='light' icon='menu' />}
                options={{ closeOnClick: true }}
                >
                <SideNavItem userView
                    user={{
                        background: 'http://i.ebayimg.com/00/s/NTY2WDg0OA==/z/25IAAOxyx0JTjb6a/$_32.JPG?set_id=880000500F',
                        image: 'img/yuna.jpg',
                        name: 'John Doe',
                        email: 'jdandturk@gmail.com'
                    }}
                />
                <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
                <SideNavItem href='#!second'>Second Link</SideNavItem>
                <SideNavItem divider />
                <SideNavItem subheader>Subheader</SideNavItem>
                <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
            </SideNav>
        )
    }
}