import React, { Component } from 'react'
import { Row } from 'react-materialize'

export default class CommentForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                    <Row >
                        <div className='col s8 push-s3'>
                            <div style={{ marginBottom: '10px' }}>
                            <textarea
                                onChange={this.props.handleChange}
                                className={"materialize-textarea"}
                                placeholder={"Faça um comentário. :)"}
                                type={'textarea'} />
                                <button className="btn waves-effect waves-light" onClick={this.props.handleAdd}>Enviar
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </Row >
            </div>
        )
    }
}
