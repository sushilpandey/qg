import React from 'react'
import { Actions,Manager } from '@twilio/flex-ui';
import PropTypes from 'prop-types';
import * as Twilio from 'twilio-client'
import axios from 'axios';
import { connect } from 'react-redux';
import { startListenAction, endListenAction } from './actions/ListenCall';
import { css } from 'emotion';
import { ListenCallButtonStyle } from './ListenButtonComponent.Styles';


export class ListenButtonComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  isonListeningTask(){
    return this.props.selected_task_sid === this.props.listening_task_sid
  }

  render() {
    console.log("--------  294922840282402824028234028304082302482024820248240282402982402840284----")
    return (
      <ListenCallButtonStyle>
        {this.props.selected_task.taskStatus == 'assigned' && this.props.selected_task_channel == 'voice' && this.props.selected_task_direction !== 'inbound' && this.props.show_listen_button === true && <button className={[this.props.disabled_class,'listenDiv'].join(" ")} onClick={this.props.startListening.bind(this)}><svg width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M13.229 3.071c.107.054.19.13.251.23.06.1.09.21.09.33V20.36c0 .12-.03.23-.09.33a.597.597 0 0 1-.251.23.447.447 0 0 1-.14.06.543.543 0 0 1-.331-.01.6.6 0 0 1-.172-.09l-6.428-5.043h-2.13c-.548 0-1.017-.17-1.405-.51-.389-.34-.583-.75-.583-1.23L2 9.875c0-.48.194-.888.583-1.221.388-.334.857-.5 1.406-.5h2.129l6.468-5.043a.6.6 0 0 1 .322-.11.572.572 0 0 1 .321.07zm5.504 9.08c0 .817-.261 1.547-.783 2.19a3.335 3.335 0 0 1-2.04 1.215.223.223 0 0 1-.07.01.612.612 0 0 1-.401-.15.616.616 0 0 1-.221-.372.587.587 0 0 1 .09-.482.662.662 0 0 1 .412-.282 1.996 1.996 0 0 0 1.245-.753c.322-.408.482-.867.482-1.376 0-.549-.157-1.024-.472-1.426a1.89 1.89 0 0 0-1.235-.723.588.588 0 0 1-.412-.261.652.652 0 0 1-.11-.483.633.633 0 0 1 .25-.421.576.576 0 0 1 .493-.1A3.155 3.155 0 0 1 17.95 9.9c.522.643.783 1.393.783 2.25zm-.844-5.906a5.978 5.978 0 0 1 1.668.934c.495.395.924.85 1.285 1.366a6.31 6.31 0 0 1 .834 5.494 6.164 6.164 0 0 1-.834 1.698c-.361.515-.79.97-1.285 1.366a5.978 5.978 0 0 1-1.668.934.929.929 0 0 1-.11.03.623.623 0 0 1-.472-.1.683.683 0 0 1-.241-.292.623.623 0 0 1 .01-.502.576.576 0 0 1 .371-.321 4.98 4.98 0 0 0 2.34-1.859 4.9 4.9 0 0 0 .895-2.842 4.93 4.93 0 0 0-.894-2.862 4.859 4.859 0 0 0-2.34-1.838.645.645 0 0 1-.372-.342.578.578 0 0 1-.01-.482.573.573 0 0 1 .331-.372.601.601 0 0 1 .492-.01z" fill="currentColor"></path></g></svg></button>}
        {this.props.selected_task.taskStatus == 'assigned' && this.props.selected_task_channel == 'voice' && this.props.selected_task_direction !== 'inbound' && this.props.show_listen_button === false && <button className={[this.props.disabled_class, 'endDiv', 'listenDiv'].join(" ")} onClick={this.props.endListening.bind(this)}>
<svg width="1em" height="1em" viewBox="0 0 24 24" class="Twilio-Icon-Content"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M13.229 3.071c.107.054.19.13.251.23.06.1.09.21.09.33V20.36c0 .12-.03.23-.09.33a.597.597 0 0 1-.251.23.447.447 0 0 1-.14.06.543.543 0 0 1-.331-.01.6.6 0 0 1-.172-.09l-6.428-5.043h-2.13c-.548 0-1.017-.17-1.405-.51-.389-.34-.583-.75-.583-1.23L2 9.875c0-.48.194-.888.583-1.221.388-.334.857-.5 1.406-.5h2.129l6.468-5.043a.6.6 0 0 1 .322-.11.572.572 0 0 1 .321.07zm-.944 16.15V4.84L6.68 9.34a.6.6 0 0 1-.361.12h-2.33c-.215 0-.385.047-.513.14-.127.095-.19.195-.19.302l.04 4.239c0 .107.063.21.19.311.128.1.299.15.513.15h2.33c.067 0 .13.007.19.02.061.014.118.041.172.081l5.564 4.52zM20.696 9.912L18.608 12l2.088 2.088a.43.43 0 1 1-.608.608L18 12.608l-2.088 2.088a.43.43 0 1 1-.608-.608L17.392 12l-2.088-2.088a.43.43 0 1 1 .608-.608L18 11.392l2.088-2.088a.43.43 0 1 1 .608.608z" fill="currentColor"></path></g></svg>
        </button>}
      </ListenCallButtonStyle>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    show_listen_button: state.listenCall.show_listen_button,
    listening_task_sid: state.listenCall.listening_task_sid,
    selected_task_sid: state.listenCall.selected_task_sid,
    selected_task_direction: state.listenCall.selected_task_direction,
    selected_task_channel: state.listenCall.selected_task_channel,
    selected_task: state.listenCall.selected_task
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  startListening: () => dispatch(startListenAction()),
  endListening: () => dispatch(endListenAction())
})
export default connect(mapStateToProps, mapDispatchToProps)(ListenButtonComponent);