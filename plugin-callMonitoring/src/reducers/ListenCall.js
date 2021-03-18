const listenCallReducer = (state = { show_listen_button: true, selected_task_sid: '', selected_task: {}, listening_task_sid: '', selected_task_direction: '', selected_task_channel: ''}, action) => {
  switch (action.type) {
    case 'LISTEN_CALL_START':
      return Object.assign({}, state, {
        show_listen_button: action.value
      });

    case 'LISTEN_CALL_END':
      return Object.assign({}, state, {
        show_listen_button: action.value
      });

    case 'SUPERVISOR_SELECTED_TASK_SID':
      return Object.assign({}, state, {
        selected_task_sid: action.value
      });


    case 'SUPERVISOR_SELECTED_TASK_CHANNEL':
      return Object.assign({}, state, {
        selected_task_channel: action.value
      });

    case 'SUPERVISOR_SELECTED_TASK_DIRECTION':
      return Object.assign({}, state, {
        selected_task_direction: action.value
      });

    case 'SUPERVISOR_LISTENING_TASK':
      return Object.assign({}, state, {
        listening_task_sid: action.value
      });


    case 'SUPERVISOR_SELECTED_TASK':
      return Object.assign({}, state, {
        selected_task: action.value
      });
    /* falls through */
    default:
      return state
  }
}

export default listenCallReducer
