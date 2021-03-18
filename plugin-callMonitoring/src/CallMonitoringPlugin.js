import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import ListenButtonComponent from "./ListenButtonComponent";
import ListenCallComponent from "./ListenCallComponent";
import listenCallReducer from './reducers/ListenCall';

const PLUGIN_NAME = 'CallMonitoringPlugin';

export default class CallMonitoringPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    manager.store.addReducer('listenCall', listenCallReducer);
    flex.Supervisor.TaskCanvas.Content.add(<ListenButtonComponent key="listen-outbound-call-component"/>);
    flex.MainHeader.Content.add(<ListenCallComponent key="listen-call-component"/>);


    flex.Notifications.registerNotification({
      id: "CallListening",
      content: "You are now monitoring agent's call.",
      type: flex.NotificationType.information,
      timeout: 0,
      backgroundColor: 'palegreen',
      icon: 'IncomingCall'
    });

  }
}
