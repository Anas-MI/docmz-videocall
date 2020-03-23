import React, { Component } from 'react'
import {connect} from "react-redux"
import Link from "next/link"



const Home = props =>{

    console.log({"SDFdsfsaddsfdsa":props.rooms})
return <div className="home">
    <div>
    <h1 itemProp="headline"> Video Room test</h1>
    <p>Enter the room number</p>
    <input type="text" name="room" value={props.roomId} onChange= {props.handleChange}
    pattern="^\w+$" maxLength="10" required autoFocus title="Room name should only contain letters or numbers."/>
          <Link className="primary-button" href={ '/room/' + props.roomId }>Join</Link>
      <Link className="primary-button" href={ '/room/' + props.defaultRoomId }>Random</Link>
      { props.rooms.length !== 0 && <div>Recently used rooms:</div> }
      { props.rooms.map(room => <Link key={room} className="recent-room" href={ '/r/' + room }>{ room }</Link>) }

    </div>
</div>
}





const mapStateToProps = store => ({
    rooms: store.room
})

export default connect (mapStateToProps)(Home)