import React, { Component } from "react";
import { PropTypes } from 'prop-types';

export default class MediaBridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bridge: "",
      user: ""
    };

    this.onRemoteHangup = this.onRemoteHangup.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.sendData = this.sendData.bind(this);
    this.setupDataHandlers = this.setupDataHandlers.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.sendDescription = this.sendDescription.bind(this);
    this.hangup = this.hangup.bind(this);
    this.init = this.init.bind(this);
    this.setDescription = this.setDescription.bind(this);

  }

  componentWillMount() {
      if(typeof window !== "undefined"){
      console.log( window.RTCPeerConnection )
    window.RTCPeerConnection =
      window.RTCPeerConnection || window.webkitRTCPeerConnection;

    this.props.media(this);
      }  
}

  componentDidMount() {




    this.props.getUserMedia.then(
      stream => (this.localVideo.srcObject = this.localStream = stream)
    );
    this.props.socket.on("message", this.onMessage);
    this.props.socket.on("hangup", this.onRemoteHangup);

  }

  componentWillUnmount() {
    this.props.media(null);
    if (this.localStream != undefined) {
      this.localStream.getVideoTracks()[0].stop();
    }
    this.props.socket.emit("leave");
  }
  onRemoteHangup() {
    this.SVGElementInstanceList({ user: "host", bridge: "host-hangup" });
  }

  onMessage(message) {
    if (message.type === "offer") {
      this.pc.setRemoteDesription(new RTCSessionDescription(message));
      this.pc
        .createAnswer()
        .then(this.setDescription)
        .then(this.sendDescription)
        .catch(this.handleError);
    } else if (message.type === "candidate") {
      //Adding the candidate
      this.pc.addIceCandidate(
        new RTCIceCandidate({
          sdpMLineIndex: message.mlineindex,
          candidate: message.candidate
        })
      );
    }
  }

  sendData(msg) {
    this.dc.send(JSON.stringify(msg));
  }

  //Data channel message handler
  setupDataHandlers() {
    this.dc.onmessage = e => {
      let msg = JSON.parse(e.data);
      console.log("Recieved Message over data channel" + msg);
    };
    this.dc.onclose = () => {
      this.remoteStream.getVideoTracks()[0].stop();
      console.log("The Data channel is closed");
    };
  }
  setDescription(offer) {
    this.pc.setLocalDescription(offer);
  }

  //Sending the offer to a server to be forwarded to the other peer

  sendDescription() {
    this.props.socket.send(this.pc.localDescription);
  }
  hangup() {
    this.setState({ user: "guest", bridge: "guest-hangup" });
    this.pc.close();
    this.props.socket.emit("leave");
  }

  handleError(e) {
    console.log(e);
  }

  init() {
    //Waiting for local media to be ready

    const attachMediaIfReady = () => {
      this.dc = this.pc.createDataChannel("chat");
      this.setupDataHandlers();
      console.log("Attach media if ready function executed");
      this.pc
        .createOffer()
        .then(this.setDescription)
        .then(this.sendDescription)
        .catch(this.handleError);
    };

    //Setting up the peer connection

    this.pc = new RTCPeerConnection({
      iceServers: [{ url: "stun:stun.l.google.com:1930" }]
    });

    //sending candidate to the peer

    this.pc.onicecandidate = e => {
      console.log(e, "onicecandidate");
      if (e.candidate) {
        this.props.socket.send({
          type: "candidate",
          mlineindex: e.candidate.sdpMLineIndex,
          candidate: e.candidate.candidate
        });
      }
    };

    //When the other side add media stream show it

    this.pc.onaddstream = e => {
      console.log("onaddstream", e);
      this.remoteStream = e.stream;
      this.remoteVideo.srcObject = this.remoteStreeam = e.stream;
      this.setState({ bridge: "established" });
    };

    this.pc.ondatachannel = e => {
      //Data channel

      this.dc = e.channel;
      this.setupDataHandlers();
      this.sendData({
        peerMediaStream: {
          video: this.localStream.getVideoTracks()[0].enabled
        }
      });
    };

    //Attach local media to the peer connection

    this.localStream
      .getTracks()
      .forEach(track => this.pc.addTrack(track, this.localStream));

    if (this.state.user === "host") {
      this.props.getUserMedia.then(attachMediaIfReady);
    }
  }

  render() {
    return (
      <div className={`media-bridge ${this.state.bridge}`}>
        <video
          className="remote-video"
          ref={ref => (this.remoteVideo = ref)}
          autoPlay
        ></video>
        <video
          className="local-video"
          ref={ref => (this.localVideo = ref)}
          autoPlay
          muted
        ></video>
      </div>
    );
  }
}

MediaBridge.propTypes = {
  socket: PropTypes.object.isRequired,
  getUserMedia: PropTypes.object.isRequired,
  media: PropTypes.func.isRequired
}