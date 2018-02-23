import axios from 'axios'
import consts from '../common/consts'
import { error } from 'util'
import {toastr} from 'react-redux-toastr'

const URL = `${consts.API_URL}/wishes`

export const addWish = () => {
    return (dispatch, getState) => {
        const owner = getState().auth.user._id
        const book = getState().book.current_book.id
        const title = getState().book.current_book.title
        const thumbnail = getState().book.current_book.thumbnail

        const request = axios.post(URL,{ book, owner, title, thumbnail })
            .then(resp => {
                toastr.success('Sucesso', 'Adicionado a Lista de Desejos')
                dispatch(verify())
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export const removeWish = () => {
    return (dispatch, getState) => {
        const id = getState().wish.id
        const request = axios.delete(`${URL}/${id}`)
            .then(resp => {
                toastr.success('Sucesso', 'Removido da Lista de Desejos')
                dispatch(verify())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export const clearList = () => ({
    type: 'CLEAR_WISHLIST'
})


export const wishList = () => {
    return (dispatch, getState) => {
        const user = getState().auth.user._id
        const search = user ? `&owner=${user}` : ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then((resp, error) =>{
                console.log(resp.data)
                dispatch({ type: 'FETCHED_WISHES', payload: resp.data })
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export const verify = () => {
    return (dispatch, getState) => {
        const owner = getState().auth.user._id
        const current_book_id = getState().book.current_book.id
        const request = axios.get(`${URL}/verify?book_id=${current_book_id}&user_id=${owner}`)
            .then(resp => { 
                dispatch({type: 'WISH_VERIFY', payload: resp.data})
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    } 
}