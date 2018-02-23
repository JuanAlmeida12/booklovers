import GoogleBooks from 'google-books-search'

const booksOptions = {
    offset: 0,
    limit: 39,
    type: 'books',
    order: 'relevance',
    lang: 'pt'
};


export const changeSearch = event => ({
    type: 'TITLE_CHANGED',
    payload: event.target.value
})

export const moreInfo = book => ({
    type: 'MORE_INFO',
    payload: book
})

export const fetchBook = (book) => {
    return (dispatch) => { 
        dispatch({ type: 'FETCHING_BOOK' })
        GoogleBooks.lookup(book, (error, result) => {
            console.log(result)
            dispatch({type: 'BOOK_FETCHED', payload: result})
        })
    }
}



export const search = () => {
    return (dispatch, getState) => {
        const title = getState().book.search_title 
        /* 
        const search = title ? `&title__regex=/${title}/` : ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then((resp, error) => {
                if(error) { 
                    console.log(error) 
                    return
                }
                console.log(resp.data) 
                dispatch({type: 'BOOK_SEARCHED', payload: resp.data})
            }) */
            GoogleBooks.search(title, booksOptions, (err, result) =>{
                console.log(result)
                dispatch({type: 'BOOK_SEARCHED', payload: result})
            })
    }
}
