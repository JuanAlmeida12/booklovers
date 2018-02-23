import axios from 'axios'
import consts from '../common/consts'

import { registerComment } from './commentActions'

const URL = `/comments`

export const getComments = (type, id) => {
    return (dispatch, getState) => {
        const request = axios.get(`${URL}/populated?id=${id}&type=${type}`)
            .then((resp, error) => {
                if(error) { 
                    console.log(error) 
                    return
                }
                console.log(resp.data) 
                dispatch({type: 'COMMENTS_LOADED', payload: resp.data})
            })
    }
}

export const registerComment = (comment, type, id) => {
    return (dispatch, getState) => {
        const owner = getState().auth.user._id
        const data = type === 'Book' ? { ...comment, book: id, owner }:{ ...comment, post: id, owner }
        const request = axios.post(URL, data)
            .then((resp, error) => {
                if(error) { 
                    console.log(error) 
                    return
                }
                dispatch(getComments())
            })
    }
}