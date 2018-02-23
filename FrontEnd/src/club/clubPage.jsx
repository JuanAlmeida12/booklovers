import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SimplePostForm from '../post/registerSimplePost'
import PostList from '../post/postList'
import { fetchClub, verify, join, left } from './clubActions'

class ClubPage extends Component {

    constructor(props){
        super(props)
        this.buttonAction.bind(this)
    }

    componentWillMount() {
        this.props.fetchClub(this.props.params.club)
    }

    formatAuthors(authors) {
        let formattedString = ''
        authors.forEach((e , index) => {
            if(index > 0) formattedString += `, ${e}`
            else formattedString = e
        })
        return formattedString
    }

    buttonAction() {
        const { participant, join, left, club } = this.props
        participant? left(club):join(club)
    }

    renderPostFormAndList(club) {
        const { participant } = this.props
        if(!participant) {
            return(
                <div className='card'>
                    <p className='center-align'>Apenas membros do Club podem ver/fazer postagens</p>
                </div>
            )
        }
        return(
            <div>
                <SimplePostForm club={club._id}/>
                <PostList />
            </div>
        )
    }

    renderInfo() {
        const {club, participant} = this.props
        return (
            <div>
                <div className="card" style={{ paddingBottom: '20px' }}>
                    <div className="card-image">
                        <img src={club.image} style={{ height: '55vh', width: '100%' }} />
                        <span className="card-title">{club.name}</span>
                    </div>
                    <div className="card-content">
                        <p>{club.message}</p>
                        <a onClick={() => this.buttonAction()} className="waves-effect waves-light btn right">{participant? 'Sair do':'Entrar no'} grupo</a>
                    </div>
                </div>
                {this.renderPostFormAndList(club)}
            </div>
        )
    }

    renderLoad() {
        return (
            <div className='row' style={{ height:'100vh' }}>
                <div className='col s3 offset-s4'>
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    renderInfoOrLoad() {
        if(!this.props.fetching) {
            return this.renderInfo()
        } else {
            return this.renderLoad()
        }
    }

    render () {
        return (
            this.renderInfoOrLoad()
        )
    }
}

const mapStateToprops = state => ({ fetching: state.club.fetching, club: state.club.current_club, participant: state.club.participant })
const mapDispatchToprops = dispatch => 
    bindActionCreators({ fetchClub, verify, join, left }, dispatch)
export default connect(mapStateToprops, mapDispatchToprops)(ClubPage)