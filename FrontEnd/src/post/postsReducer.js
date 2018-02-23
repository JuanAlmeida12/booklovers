const INITIAL_STATE = { list: [] }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'POSTS_LOADED':
            return { ...state, list: action.payload }
        case 'CLEAR_POSTS':
            return { ...state, list: [] }
        default:
            return state
    }
}