const userKey = 'blover_user'
const cookies = JSON.parse(localStorage.getItem(userKey))
const INITIAL_STATE = {
    user: cookies? cookies.user:null,
    token: cookies? cookies.token:null,
    validToken: false
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOKEN_VALIDATED':
        if(action.payload) {
            return { ...state, validToken: true }
        } else {
            localStorage.removeItem(userKey)
            return { ...state, validToken: false, user: null }
        }
    case 'USER_LOGIN':
        localStorage.setItem(userKey, JSON.stringify(action.payload))
        return { ...state, user: action.payload.user, validToken: true, token: action.payload.token }
    case 'USER_UPDATE':
        localStorage.setItem(userKey, JSON.stringify({ user: action.payload, token: state.token }))
        return { ...state, user: action.payload }
    default:
        return state
  }
}