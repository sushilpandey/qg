import React from "react";
import { connect } from "react-redux";
import { Manager, withTaskContext, Actions } from '@twilio/flex-ui';

const request = require("request");

export class RecordControlsComponent extends React.Component {
  constructor(props) {
    super(props);

    // local state of recording
    this.state = {
      recordingStatus: "Not Started",
      recordingSid: null,
      recordingMessage: null
    };
console.log("vversion 100")
    //this.setListeners();
  }


  // setListeners() {
  //   let _this = this;

  //   Actions.addListener("afterAcceptTask", (payload, abortFunction) => {
  //        console.log(_this.props.task);
  //        console.log(payload.task);
  //        console.log("-----c  r   e   a   t   e ------");
  //       _this.makeRequest('create')
  //   });
  // }

  makeRequest = t => {

    let conference = this.props.task.conference;

    // if (conference === null) {
    //   window.m = Manager.getInstance();
    //   let storeConferences = Manager.getInstance().store.getState().flex.conferences;
    //   let conferencesStates = storeConferences && storeConferences.states;
    //   let conferenceSid = this.props.task.attributes.conference.sid;


    //   conferencesStates.forEach(function(item){
    //     if(item.source.conferenceSid == conferenceSid){
    //       conference = item;
    //       return false;
    //     }
    //   })
    // }



    let callSid;
    if (this.props.task.attributes.direction == 'inbound' || this.props.task.attributes.source == 'salesforce'){
      callSid = this.props.task.attributes.conference.participants.customer;
    } else {
      callSid = conference.participants.filter( p => p.participantType == 'customer')[0].callSid;
    }

    // show progress
    this.setState({ recordingMessage: `Making ${t} request...` });

    // create Function payload
    let requestURL = `${this.props.serviceBaseUrl}/recordControls?`;
    requestURL += `taskSid=${this.props.task.taskSid}`;
    requestURL += `&setStatus=${t}`;
    requestURL += `&recordingSid=${this.state.recordingSid}`;
    requestURL += `&callSid=${callSid}`;

    // make request to Function
    request.post(requestURL, (err, response, body) => {
      if (err) {
        this.setState({ recordingMessage: `Unable to make request.` });
      }

      // parse JSON response
      let thisResult = JSON.parse(body);

      // update state with response
      if (thisResult.error) {
        this.setState({ recordingMessage: thisResult.error.message });
      } else {
        this.setState({
          recordingMessage: null,
          recordingSid: thisResult.recordingSid,
          recordingStatus: thisResult.status
        });
      }
    });
  };

  // returns button when filter condition met and call is active
  simpleButton = (value, action, showWhen) => {
    if (
      !showWhen.includes(this.state.recordingStatus) ||
      !this.props.phoneCallActive
    ) {
      return null;
    } else {
      return (
        <span id={"recordControlButton-" + action}>
          <input
            type="button"
            value={value}
            onClick={m => this.makeRequest(action)}
          />
        </span>
      );
    }
  };

  render() {
    // reset the controls/message when task moves to wrapping
    if (
      this.props.task.status === "wrapping" &&
      this.state.recordingStatus !== "No Active Call"
    ) {
      this.setState({
        recordingMessage: null,
        recordingStatus: "No Active Call"
      });
    }

console.log("ini here");

    let conference = this.props.task.conference;
    let participantLength = 0;
    let participantJoined = false;
    if (conference && conference.participants) participantLength = conference.participants.length;

    if (this.props.task.attributes.source === 'salesforce' && this.props.task.attributes.direction == 'outbound'){
      conference = this.props.task.attributes.conference;
      if (conference) {
        participantLength = Object.keys(conference.participants).length
      }
      if (this.props.task.attributes.joinedAt) participantJoined = true;
    } else {
      participantJoined = true;
    }
    // if (conference === null) {
    //   window.m = Manager.getInstance();
    //   let storeConferences = Manager.getInstance().store.getState().flex.conferences;
    //   let conferencesStates = storeConferences && storeConferences.states;
    //   let conferenceSid = this.props.task.attributes.conference.sid;


    //   conferencesStates.forEach(function(item){
    //     if(item.source.conferenceSid == conferenceSid){
    //       conference = item;
    //       return false;
    //     }
    //   })
    // }
console.log("in conffference")
console.log(conference);
window.t = this;
console.log(participantLength);
console.log("real check");
console.log("this.props.task.sid = " + this.props.task.sid );
console.log("this.state.taskSid = " + this.state.taskSid);
console.log("conference=");
console.log(conference);

console.log("conference.participants");
if (conference)console.log(conference.participants);
console.log(this.props.phoneCallActive)

    if (this.props.task.sid != this.state.taskSid && conference && conference.participants && participantLength == 2 && this.props.phoneCallActive && participantJoined) {
      console.log("in the important check.")
      console.log(this.props.task.sid )
      console.log(this.state.taskSid )
      this.setState({taskSid: this.props.task.sid});
      this.makeRequest('create')
    }

    return (
      <div id="recordControls" key="recordControls">
        <div id="recordControlsStatus">
          Status: {this.state.recordingStatus}
          {this.state.recordingSid ? `(${this.state.recordingSid})` : ""}
        </div>

        {/* create button for each action */}
        <div id="recordControlsButtons">
          {this.simpleButton("Start", "create", ["stopped", "Not Started"])}
          {this.simpleButton("Resume", "in-progress", ["paused"])}
          {this.simpleButton("Pause", "paused", ["in-progress"])}
          {/*this.simpleButton("Stop", "stopped", ["in-progress"])*/}
        </div>

        {/* display update / error messages */}
        <div id="recordControlsMessage">{this.state.recordingMessage}</div>
        <hr />
      </div>
    );
  }
}

// pass in agent phone status and runtime domain (Functions)
const mapStateToProps = state => {
  return {
    serviceBaseUrl: `https://${state.flex.config.serviceBaseUrl}`,
    phoneCallActive: state.flex.phone.connection ? true : false
  };
};

export default connect(mapStateToProps)(withTaskContext(RecordControlsComponent));
