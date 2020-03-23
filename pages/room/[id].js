import React, { Component } from 'react';
import MediaContainer from "../../components/videoCall/mediaContainer"
import CommunicationContainer from "../../components/videoCall/communicationContainer"
import {connect} from "react-redux"
import "./style.css"
// importing actions from redux
import {addRoom} from "../../redux/actions"

import io from 'socket.io-client'

//Importing the action to add to room from actions


class RoomPage extends Component{

 constructor(props){
    super(props);

    // console.log({navigator})
    if(typeof navigator !== "undefined"){
    this.getUserMedia =  navigator.mediaDevices.getUserMedia({
        audio: true, 
        video: true
    }).catch(e => console.log(`No user media found ` + e.name))
    console.log({navigator})
    this.socket = io.connect('http://localhost:3001')
    // this.props.addRoom(this.state.room)
    console.log(this.props.roomFromUrl)    
    }
}


//Getting the room id

static getInitialProps({query}){
     const {id} = query
     console.log({query})
  return {roomFromUrl: id}
}


async componentDidMount(){

   

}

render(){

    return <div>

    <MediaContainer media={media => this.media = media} socket={this.socket} getUserMedia={this.getUserMedia}/>
    <CommunicationContainer socket={this.socket} media={this.media} getUserMedia={this.getUserMedia} />

    </div>
}

}

const mapStateToProps = state => 
(
    {rooms: state}
    )
const mapDispatchToProps = {
    addRoom
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage)