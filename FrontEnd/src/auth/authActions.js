import axios from 'axios'
import consts from '../common/consts'
import {toastr} from 'react-redux-toastr'

export function login(values) {
    return submit(values, `${consts.API_URL}/users/login`)
}

export function register(values) {
    return submit(values, `${consts.API_URL}/users`)
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                dispatch([
                    {type: 'USER_LOGIN', payload: resp.data}
                ])
            })
            .catch(e => {
                toastr.error('Erro', e.response.data.message)
            })
    }
}

export function update(values) {
    return (dispatch, getState) => {
        const user = getState().auth.user
        const url =`${consts.API_URL}/users/${user._id}`
        console.log(url)
        axios.put(url, values)
            .then(resp => {
                toastr.success('Sucesso', 'Usuário Atualizado.')
                dispatch({type: 'USER_UPDATE', payload: resp.data})
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function logout() {
    return {type: 'TOKEN_VALIDATED', payload: false}
}

export function validateToken(token) {
    return dispatch => {
        if(token) {
            axios.post(`${consts.API_URL}/users/validateToken`, {token})
            .then(resp => {
                dispatch({type: 'TOKEN_VALIDATED', payload: resp.data.valid})
            })
            .catch(e => dispatch({type: 'TOKEN_VALIDATED', payload: false}))
        } else {
            dispatch({type: 'TOKEN_VALIDATED', payload: false})
        }
    }
}
    