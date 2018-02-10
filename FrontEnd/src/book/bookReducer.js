const INITIAL_STATE = { title: '', list: [], addMode: false }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TITLE_CHANGED':
            return { ...state, title: action.payload }
        case 'BOOK_SEARCHED':
            return { ...state, list: action.payload }
        case 'ADD_MODE':
            return { ...state, addMode: !state.addMode }
        default:
            return state
    }
}