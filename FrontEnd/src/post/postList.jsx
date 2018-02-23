import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Post from './post'

const PostList = props => {

    const renderPosts = () => {
        const list = props.list || []
        console.log(list)
        return list.map(post => (
            <Post {...props} post={post} />
        ))
    }

    return (
        <div>
            {renderPosts()}
        </div>
    )
}

const mapStateToProps = state => ({list: state.post.list, user: state.auth.user})
const mapDispatchToProps = dispatch => 
    bindActionCreators({ }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostList)