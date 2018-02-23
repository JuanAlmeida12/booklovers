import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row } from 'react-materialize'
import { hashHistory } from 'react-router'

import { changeSearch, searchClub, changeMyClubeState } from './clubActions'

class ClubSearchForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.searchClub(this.props.myclubs)
    }

    keyHandler(e) {
        const { searchClub, myclubs } = this.props
        if (e.key === 'Enter') {
            searchClub(myclubs)
        }
    }

    render() {
        const { searchClub,myclubs } = this.props
        return (
            <div >
                    <Row >
                        <div className='col s8 push-s3'>
                        <div className='row'>
                            <input
                                className='col s5'
                                id='name'
                                onChange={this.props.changeSearch}
                                onKeyUp={this.keyHandler}
                                placeholder='Busca'/>
                            <a className='col s2' onClick={() => searchClub(myclubs)} className="waves-effect waves-teal btn" style={{ marginTop:'5px', marginLeft:'10px' }}><i className="material-icons">search</i></a>
                            <p className='col s5'>
                                <input type="checkbox" id="test5" onChange={this.props.changeMyClubeState} />
                                <label htmlFor="test5">Seus Clubes</label>
                            </p>
                            </div>
                            <a className='col s2' onClick={() => hashHistory.push(`/clubs/register`)} className="waves-effect waves-teal btn" style={{ marginTop:'5px', marginLeft:'10px' }}>Criar Clube</a>
                        </div>
                    </Row >
            </div>
        )
    }
}

const mapStateToProps = state => ({ name: state.club.search, myclubs: state.club.myclubs })
const mapDispatchToProps = dispatch => 
    bindActionCreators({ changeSearch, searchClub, changeMyClubeState}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ClubSearchForm)