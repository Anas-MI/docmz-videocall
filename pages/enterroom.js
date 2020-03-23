import React, {Component} from "react"
import Home from "../components/videoCall/Home"

class HomePage extends Component{
    constructor(props){
        super(props)
        this.defaultRoomId = String(new Date() - new Date().setHours(0,0,0,0))
        this.state = { roomId: this.defaultRoomId}
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(e){
        this.setState({roomId: e.target.value})
    }


    render(){
        return (
            <Home
                defaultRoomId={this.defaultRoomId}
                roomId={this.state.roomId}
                handleChange={this.handleChange}
            />
        )
    }

}

export default HomePage