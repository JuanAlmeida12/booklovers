
const INITIAL_STATE = { search_title: 'A', list: [], current_book: null, in_wish_list: false, fetching: true }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TITLE_CHANGED':
            return { ...state, search_title: action.payload }
        case 'BOOK_SEARCHED':
            return { ...state, list: action.payload }
        case 'BOOK_FETCHED':
            return { ...state, current_book: action.payload, fetching: false }
        case 'FETCHING_BOOK':
            return { ...state, fetching: true }
        default:
            return state
    }
}