import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

const ClubList = props => {

    const renderItens = () => {
        const list = props.list || []
        return list.map(club => (
            <div>
                <div className='row hoverable' style={{ padding: '10px' }}>
                    <div className='col s3'>
                        <img src={club.image} style={{ maxWidth: '200px' }}/>
                    </div>
                    <div className='col s6'>
                        <strong>{club.name}</strong>
                        <p className='my-truncate' >{club.message}</p>
                    </div>
                    <div className='col s3 '>
                        <a onClick={() => hashHistory.push(`/clubs/page/${club._id}`)} className="waves-effect waves-light btn" style={{ marginTop: '40px' }}>Ver grupo</a>
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <div>
            {renderItens()}
        </div>
    )
}

const mapStateToProps = state => ({list: state.club.list})
const mapDispatchToProps = dispatch => 
    bindActionCreators({  }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClubList)