import React, { Component } from "react";
import { render } from "react-dom";
import _ from "lodash";
import socket from "./socket";
import PeerConnection from "./PeerConnection";
import MainWindow from "./MainWindow";
import CallWindow from "./CallWindow";
import CallModal from "./CallModal";
import "./app.scss";
import { assignId } from "../../redux/actions/callActions";
import { connect } from "react-redux";
import { Card } from "antd";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      callWindow: "",
      callModal: "",
      callFrom: "",
      localSrc: null,
      peerSrc: null,
      isDoctor: false,
      isPatient: false,
      appointments:[]
    };
    this.pc = {};
    this.config = null;
    this.startCallHandler = this.startCall.bind(this);
    this.endCallHandler = this.endCall.bind(this);
    this.rejectCallHandler = this.rejectCall.bind(this);
    this.callThis = this.callThis.bind(this);
  }

  componentDidMount() {
 
    console.log(this.state);
    // if (this.props.loggedInDoctor._id) {
    //   this.setState({ isDoctor: true });
    // }

    // if (this.props.loggedInPatient._id) {
    //   this.setState({ isPatient: true });
    // }

   

    // this.setState({isDoctor: this.props.loggedInDoctor._id})
    //Initilising the connection on the client side
    socket
      .emit("test", "dsds")
      .on("init", ({ id: clientId }) => {
        //Giving an unique id whenever someone connects with the app
        this.props.assignId(clientId);
        console.log(this.props.test);

        //Setting the title of the window as the client ID
        document.title = `${clientId} - VideoCall`;
        this.setState({ clientId });
      })
      .on("request", ({ from: callFrom }) => {
        //This is where we are requesting the call and setting the modal to be active
        this.setState({ callModal: "active", callFrom });
      })
      .on("call", data => {
        if (data.sdp) {
          //Setting the remote description
          this.pc.setRemoteDescription(data.sdp);

          //The createAnswer() method on the RTCPeerConnection interface creates an SDP answer to an offer received from a remote peer during the offer/answer negotiation of a WebRTC connection.
          if (data.sdp.type === "offer") this.pc.createAnswer();
          //This adds this new remote candidate to the RTCPeerConnection's remote description
        } else this.pc.addIceCandidate(data.candidate);
      })
      .on("end", this.endCall.bind(this, false))
      .emit("init");
  }
  componentDidUpdate(prevProps){
    console.log({prevProps})
    if(this.props.loggedInPatient !== prevProps.loggedInPatient){
      console.log(this.props.loggedInPatient, "Patient Logged in")
      if(this.props.loggedInPatient._id){
        console.log("SDsadsadsadsadsadsa")
        this.setState({isPatient: true})
      }
    }
    if(this.props.loggedInDoctor !== prevProps.loggedInDoctor){
      console.log(this.props.loggedInDoctor, "Doctor Logged in")
      if(this.props.loggedInDoctor._id){
        console.log("SDsadsadsadsadsadsa")

        this.setState({isDoctor: true})

        
          const appointments = this.props.appointments.map(appointment => {
            return (
              <Card title={appointment.patient.email} style={{ width: 300 }}>
                <button onClick={e => this.callThis(appointment)}>
                  Call this patient
                </button>
              </Card>
            );
          });
          this.setState({appointments})
        
      }

    }


    // if (this.state.isDoctor) {
    //   this.appointments = this.props.appointments.map(appointment => {
    //     return (
    //       <Card title={appointment.patient.email} style={{ width: 300 }}>
    //         <button onClick={e => this.callThis(appointment)}>
    //           Call this patient
    //         </button>
    //       </Card>
    //     );
    //   });
    // }
  }
  //Starting a call
  startCall(isCaller, friendID, config) {
    this.config = config;
    this.pc = new PeerConnection(friendID)
      .on("localStream", src => {
        //Showing the call window
        const newState = { callWindow: "active", localSrc: src };
        if (!isCaller) newState.callModal = "";
        this.setState(newState);
      })
      .on("peerStream", src => this.setState({ peerSrc: src }))
      .start(isCaller, config);
  }

  //Rejecting a call
  rejectCall() {
    const { callFrom } = this.state;
    socket.emit("end", { to: callFrom });
    this.setState({ callModal: "" });
  }

  //Ending a call
  endCall(isStarter) {
    if (_.isFunction(this.pc.stop)) {
      this.pc.stop(isStarter);
    }
    this.pc = {};
    this.config = null;
    this.setState({
      callWindow: "",
      callModal: "",
      localSrc: null,
      peerSrc: null
    });
  }

  callThis(e) {
    console.log({ e });
  }

  render() {
    // if (this.state.isDoctor) {
    //   this.appointments = this.props.appointments.map(appointment => {
    //     return (
    //       <Card title={appointment.patient.email} style={{ width: 300 }}>
    //         <button onClick={e => this.callThis(appointment)}>
    //           Call this patient
    //         </button>
    //       </Card>
    //     );
    //   });
    // }
    
    console.log(this.state);
    // if (this.props.loggedInDoctor._id) {
    //   this.setState({ isDoctor: true });
    // }

    // if (this.props.loggedInPatient._id) {
    //   this.setState({ isPatient: true });
    // }

  

    // this.setState({isDoctor: this.props.loggedInDoctor._id})
    //Initilising the connection on the client side
    








    const {
      clientId,
      callFrom,
      callModal,
      callWindow,
      localSrc,
      peerSrc
    } = this.state;
    return (
      <div>
        <MainWindow isDoctor={this.state.isDoctor} clientId={clientId} startCall={this.startCallHandler} />
        {this.state.isDoctor && this.state.appointments}
        {this.state.isPatient && <div>Wait For your Doctor</div>}
        {!_.isEmpty(this.config) && (
          <CallWindow
            status={callWindow}
            localSrc={localSrc}
            peerSrc={peerSrc}
            config={this.config}
            mediaDevice={this.pc.mediaDevice}
            endCall={this.endCallHandler}
          />
        )}
        <CallModal
          status={callModal}
          startCall={this.startCallHandler}
          rejectCall={this.rejectCallHandler}
          callFrom={callFrom}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appointments: state.appointment.allAppointments,
  loggedInDoctor: state.loggedInDoctor,
  loggedInPatient: state.loggedInPatient
});

const mapActionsToPropps = {
  assignId
};

export default connect(mapStateToProps, mapActionsToPropps)(App);
