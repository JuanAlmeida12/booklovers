import axios from 'axios'
import consts from '../common/consts'
import { error } from 'util';
import {toastr} from 'react-redux-toastr'

const URL = `${consts.API_URL}/clubs`

export const changeSearch = event => ({
    type: 'NAME_CHANGED',
    payload: event.target.value
})

export const changeMyClubeState = event => ([{
    type: 'MY_CLUBS_STATE_CHANGED',
    payload: event.target.checked
}, searchClub()])

export const verify = () => {
    return (dispatch, getState) => {
        const owner = getState().auth.user._id
        const club_id = getState().club.current_club._id
        const request = axios.get(`${URL}/verify?club_id=${club_id}&user_id=${owner}`)
            .then(resp => { 
                dispatch({type: 'CLUB_VERIFY', payload: resp.data.participant})
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    } 
}

export const fetchClub = (club) => {
    return (dispatch) => {
        dispatch({type: 'CLUB_FETCHING'})
        const request = axios.get(`${URL}/${club}`)
            .then((resp) => {
                dispatch([{type: 'CLUB_FETCHED', payload: resp.data},verify()])
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export const searchClub = (my_clubs) =>{
    return (dispatch, getState) => {
        const name = getState().club.search
        const user = getState().auth.user._id
        const search = name ? `&name__regex=/${name}/` : ''
        const url = `${URL}?sort=-createdAt${search}`
        const url_myclubs = `${URL}/myclubs?${name? `name=/${name}/`:'name='}&user_id=${user}`
        console.log(url_myclubs) 
        const request = axios.get(my_clubs? url_myclubs: url)
            .then((resp) => {
                dispatch({type: 'CLUB_SEARCHED', payload: resp.data})
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export const join = (club) => {
    return (dispatch, getState) => {
        const user = getState().auth.user._id
        let participants = club.participants
        participants.push(user)
        const request = axios.put(`${URL}/${club._id}`,{ ...club, participants })
            .then((resp, error) => {
                toastr.success('Sucesso', 'Você entrou no grupo.')
                dispatch(verify())
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export const left = (club) => {
    return (dispatch, getState) => {
        const user = getState().auth.user._id
        let participants = club.participants
        participants = participants.filter((item) => { 
            return item !== user
        })        
        const request = axios.put(`${URL}/${club._id}`,{ ...club, participants })
            .then(resp => {
                toastr.success('Sucesso', 'Você deixou o grupo.')
                dispatch(verify())
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export const add = (club) => {
    return (dispatch, getState) => {
        const createdBy = getState().auth.user._id
        const request = axios.post(URL,{ ...club, createdBy })
            .then(resp => {
                toastr.success('Sucesso', 'Clube Criado')
                dispatch(join(resp.data))
            }).catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}