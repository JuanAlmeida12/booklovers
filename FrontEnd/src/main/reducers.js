import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import clubReducer from '../club/clubReducer'
import bookReducer from '../book/bookReducer'
import commentReducer from '../comment/commentReducer'
import wishReducer from '../wish/wishReducer'
import PostReducer from '../post/postsReducer'
import authReducer from '../auth/authReducer'
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
    book: bookReducer,
    form: formReducer,
    auth: authReducer,
    comment: commentReducer,
    wish: wishReducer,
    club: clubReducer,
    post: PostReducer,
    toastr: toastrReducer
})

export default rootReducer