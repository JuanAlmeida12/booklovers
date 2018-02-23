const INITIAL_STATE = { search: '', list: [], current_club: {}, participant: false, fetching: true, myclubs: false }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'NAME_CHANGED':
            return { ...state, search: action.payload }
        case 'CLUB_SEARCHED':
            return { ...state, list: action.payload }
        case 'CLUB_VERIFY':
            return { ...state, participant: action.payload }
        case 'FETCHING_BOOK':
            return { ...state, fetching: true }
        case 'CLUB_FETCHED':
            return { ...state, fetching: false, current_club: action.payload }
        case 'MY_CLUBS_STATE_CHANGED':
            return { ...state, myclubs: action.payload }
        default:
            return state
    }
}