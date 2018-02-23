import React from 'react'

import ClubSearchForm from './clubSearchForm'
import ClubList from './clubList'

export default props => (
    <div className='container' style={{ width: '100%' }}>
        <div className='row'>
            <h4 href="#!" >Clubes</h4>
            <div className='card' style={{ padding: '15px' }}>
                <ClubSearchForm />
                <div className="divider" style={{ marginBottom: '15px' }}></div>
                <ClubList />
            </div>
        </div>
    </div>
)