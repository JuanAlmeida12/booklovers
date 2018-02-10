import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Input, Icon } from 'react-materialize'

import { add, changeSearch, search, checkAdd } from './bookActions'
import If from '../common/if'

class BookForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandler(e) {
        const { add, search, title } = this.props
        if (e.key === 'Enter') {
            search()
        }
    }

    render() {
        const { add, search, title, addMode } = this.props
        return (
            <div >
                <Row >
                    <Row >
                        <Input s={6} label="Titulo"
                            onChange={this.props.changeSearch}
                            onKeyUp={this.keyHandler}> 
                            <Icon>{addMode? 'playlist_add':'search' }</Icon> 
                        </Input>
                        <If test={addMode}>
                            <Input s={6} label="Autor"></Input>                        
                        </If> 
                    </Row >
                    <If test={addMode}>
                        <Row style={{marginLeft: '30px'}}>
                            <Input s={12}  label="Autor"></Input>                        
                        </Row>
                        <Row style={{marginLeft: '30px'}}>
                            <Input s={12} label="Autor"></Input>                         
                        </Row>
                        <Row style={{marginLeft: '30px'}}>                        
                            <Input s={12} type='textarea' label="Autor"></Input>
                        </Row>
                    </If>           
                <Input name='group1' type='checkbox' value='add' label='Novo Livro?' onChange={this.props.checkAdd}></Input>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({title: state.book.title, addMode: state.book.addMode })
const mapDispatchToProps = dispatch => 
    bindActionCreators({ add, changeSearch, search, checkAdd}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BookForm)