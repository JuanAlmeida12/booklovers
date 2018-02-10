import axios from 'axios'
import consts from '../common/consts'

const URL = `${consts.API_URL}/books`

export const changeSearch = event => ({
    type: 'TITLE_CHANGED',
    payload: event.target.value
})

export const checkAdd = event => ({
    type: 'ADD_MODE',
    payload: event.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const title = getState().book.title
        const search = title ? `&title__regex=/${title}/` : ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({type: 'BOOK_SEARCHED', payload: resp.data}))
    }
}

export const add = (book) => {
    return dispatch => {
        axios.post(URL, { book })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

export const edit = (book) => {
    return dispatch => {
        axios.put(`${URL}/${book._id}`, { book })
            .then(resp => dispatch(search()))
    }
}

export const remove = (book) => {
    return dispatch => {
        axios.delete(`${URL}/${book._id}`)
            .then(resp => dispatch(search()))
    }
}
