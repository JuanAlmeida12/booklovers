import React from 'react'
import If from '../if'
export default props => (
    <If test={!props.hide}>
        <div >
            <label> {props.label}
                <textarea {...props.input}
                    className={ props.className + " materialize-textarea"}
                    placeholder={props.placeholder}
                    readOnly={props.readOnly}
                    type={props.type} />
            </label>
        </div>
    </If>
)