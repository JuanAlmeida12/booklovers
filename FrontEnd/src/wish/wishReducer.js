const INITIAL_STATE = { verification : false, list: [] }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'WISH_VERIFY':
            return { ...state, verification: action.payload.valid, id: action.payload.id }
        case 'CLEAR_WISHLIST':
            return { ...state, list:[] }
        case 'FETCHED_WISHES':
            return { ...state, list: action.payload }
        default:
            return state
    }
}