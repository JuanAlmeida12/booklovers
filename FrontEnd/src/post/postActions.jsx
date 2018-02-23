import axios from 'axios'
import consts from '../common/consts'
import { error } from 'util';
import {toastr} from 'react-redux-toastr'

const URL = `${consts.API_URL}/posts`

export const getPosts = () => {
    return (dispatch, getState) => {
        dispatch(clear())
        const club = getState().club.current_club._id
        const request = axios.get(`${URL}/populated?club=${club}`)
            .then(resp => {
                dispatch({type: 'POSTS_LOADED', payload: resp.data})
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export const clear = () => {
    return (dispatch) => {
        dispatch({ type:'CLEAR_POSTS' })
    }
}

export const register = (post) => {
    return (dispatch, getState) => {
        const createdBy = getState().auth.user._id
        const request = axios.post(URL,{ ...post, createdBy })
            .then((resp, error) => {
                toastr.success('Sucesso', 'Postagem adicionada.')
                dispatch(getPosts())
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}