import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row } from 'react-materialize'

import { changeSearch, search } from './bookActions'

class BookSearchForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandler(e) {
        const { search, title } = this.props
        if (e.key === 'Enter') {
            search()
        }
    }

    render() {
        const { search, title } = this.props
        return (
            <div >
                    <Row >
                        <div className='col s8 push-s3'>
                            <input
                                className='col s5'
                                id='title'
                                onChange={this.props.changeSearch}
                                onKeyUp={this.keyHandler}
                                placeholder='Busca'/>
                            <a onClick={() => search()} className="waves-effect waves-teal btn" style={{ marginTop:'5px', marginLeft:'10px' }}><i className="material-icons">search</i></a>
                        </div>
                    </Row >
            </div>
        )
    }
}

const mapStateToProps = state => ({ title: state.book.search_title })
const mapDispatchToProps = dispatch => 
    bindActionCreators({ changeSearch, search}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BookSearchForm)