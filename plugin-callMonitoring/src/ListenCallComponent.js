import React from 'react'
import { Actions,Manager } from '@twilio/flex-ui';
import * as Flex from "@twilio/flex-ui";
import PropTypes from 'prop-types';
import * as Twilio from 'twilio-client'
import axios from 'axios';
import { connect } from 'react-redux';
import { startListenAction, endListenAction, selectedTaskBySupervisor, listeningTaskBySupervisor, selectedTaskDirection, selectedTaskChannel, selectedTask} from './actions/ListenCall';



export class ListenCallComponent extends React.Component {
  constructor(props) {
    super(props)
    this.setListeners();
  }

    // Initialize after component creation
  componentDidMount() {
    let self = this
    let baseUrl = Manager.getInstance().configuration.serviceBaseUrl;
    let token = ""
    axios.post(`https://${baseUrl}/outbound-call-monitoring-capability-token`, {
      params: {
        token: token
      }
    })
    .then(response => {
      Twilio.Device.setup(response.data.token);
    })
    .catch(error => {
       self.setState({log: error});
    });

    // Configure event handlers for Twilio Device
    Twilio.Device.disconnect(function() {
      self.props.endListening()
    });

    Twilio.Device.ready(function(e) {
      console.log("ready")
      console.log(e)
    });
  }

  setListeners = () => {
    let _this = this
    Actions.addListener("afterSelectTaskInSupervisor", (payload) => {
      _this.props.selectedTaskBySupervisor(payload.task.taskSid)
      _this.props.selectedTaskDirection(payload.task.attributes.direction)
      _this.props.selectedTaskChannel(payload.task.taskChannelUniqueName)
      _this.props.selectedTask(payload.task)
    });
  }

  componentDidUpdate(prevProps) {
   if (this.props.show_listen_button !== prevProps.show_listen_button){
   	 if (this.props.show_listen_button === true){
   	 	this.props.listeningTaskBySupervisor('')
   	 	this.endListening()
   	 } else if (this.props.show_listen_button === false){
   	 	console.log("loooooog")
   	 	console.log(this.props)
   	 	console.log(prevProps)
   	 	this.props.listeningTaskBySupervisor(this.props.selected_task_sid)
   	 	this.startListening()
   	 }
   }
  }

  startListening(){
  	console.log("-------------start listening--------------------")
  	Twilio.Device.connect({taskSid: this.props.selected_task_sid})
  	Flex.Notifications.showNotification("CallListening", null);
  }

  endListening(){
    console.log("-------------end listening--------------------")
  	Twilio.Device.disconnectAll()
  	Flex.Notifications.dismissNotificationById("CallListening");
  }

  render() {
    return (null);
  }
}


const mapStateToProps = (state) => {
  return {
    show_listen_button: state.listenCall.show_listen_button,
    listening_task_sid: state.listenCall.listening_task_sid,
    selected_task_sid: state.listenCall.selected_task_sid,
    selected_task_direction: state.listenCall.selected_task_direction,
    selected_task: state.listenCall.selected_task
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  endListening: () => dispatch(endListenAction()),
  selectedTaskBySupervisor: (taskSid) => dispatch(selectedTaskBySupervisor(taskSid)),
  listeningTaskBySupervisor: (taskSid) => dispatch(listeningTaskBySupervisor(taskSid)),
  selectedTaskDirection: (taskDirection) => dispatch(selectedTaskDirection(taskDirection)),
  selectedTaskChannel: (taskChannel) => dispatch(selectedTaskChannel(taskChannel)),
  selectedTask: (task) => dispatch(selectedTask(task))

})
export default connect(mapStateToProps, mapDispatchToProps)(ListenCallComponent);