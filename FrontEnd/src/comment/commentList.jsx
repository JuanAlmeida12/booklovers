import React from 'react'

export default props => {

    const formatDate = (datestring) => {
        let date = new Date(datestring)
        
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        let hour = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()

        if(day < 10) {
            day = `0${day}`
        }
        if(month < 10) {
            month = `0${month}`
        }
        if(hour < 10) {
            hour = `0${hour}`
        }
        if(minutes < 10) {
            minutes = `0${minutes}`
        }
        if(seconds < 10) {
            seconds = `0${seconds}`
        }

        return `${hour}:${minutes}:${seconds} ${day}/${month}/${year}`
    }

    const renderComments = () => {
        const list = props.list || []
        return list.map(comment => (
            <div>
                <div>
                    <div className='row valign-wrapper' style={{ marginBottom:'-10px' }}>
                        <div className='col s2'>
                            <img className='col push-s3' src={comment.owner.image} style={{ width: '6vw' }} />
                        </div>
                        <div className='col s10'>
                            <div>
                                <p className='user-name' style={{textAlign:'left'}}>
                                    {comment.owner.name}
                                    <span> data do comentário: {formatDate(comment.createdAt)}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='row' style={{ marginTop:'-10px', marginRight: '15px' }}>
                        <p className='col s10 offset-s2'>{comment.comment}</p>
                    </div>
                </div>
                <div className='divider'></div>
            </div>
        ))
    }

    return (
        <div>
            {renderComments()}
        </div>
    )
}