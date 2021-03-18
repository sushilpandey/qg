export const startListenAction = () => ({
  type: 'LISTEN_CALL_START',
  value: false
})

export const endListenAction = () => ({
  type: 'LISTEN_CALL_END',
  value: true
})

export const selectedTaskBySupervisor = (taskSid) => ({
  type: 'SUPERVISOR_SELECTED_TASK_SID',
  value: taskSid
})


export const listeningTaskBySupervisor = (taskSid) => ({
  type: 'SUPERVISOR_LISTENING_TASK',
  value: taskSid
})

export const selectedTaskDirection = (taskDirection) => ({
  type: 'SUPERVISOR_SELECTED_TASK_DIRECTION',
  value: taskDirection
})


export const selectedTaskChannel = (taskChannel) => ({
  type: 'SUPERVISOR_SELECTED_TASK_CHANNEL',
  value: taskChannel
})

export const selectedTask = (task) => ({
  type: 'SUPERVISOR_SELECTED_TASK',
  value: task
})