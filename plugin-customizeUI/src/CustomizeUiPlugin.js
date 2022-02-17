import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import WebChatDetails from './WebChatDetails';
import registerCustomActions from './CustomActions';
import FlexReadyDetector from "./FlexReadyDetector";


const PLUGIN_NAME = 'CustomizeUiPlugin';

export default class CustomizeUiPlugin extends FlexPlugin {
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
    flex.TaskInfoPanel.Content.add(<WebChatDetails key="webchat"/>, {if: props => props.task.attributes.channelType === 'web'});
    
    const functionsUrl = manager.configuration.dialpadDomain;
    registerCustomActions('ceil-jackal-5630.twil.io', manager);
    flex.MainHeader.Content.add(<FlexReadyDetector key="flex-ready-detector"/>);


    flex.Actions.replaceAction('StartOutboundCall', (payload, original) => {
      if(manager.workerClient.attributes.callerId){
        payload.callerId = manager.workerClient.attributes.callerId;
      }
      original(payload);
    })

    manager.strings.TransferFailedNotification = "This agent is busy on another task."

    // flex.DefaultTaskChannels.Call.notifications.override.TransferFailed = (notification) => {
    //   console.log("-------- notification notififation")
    //   console.log(notification)
    //   if (notification.content.indexOf('does not have capacity') >= 0){
    //     notification.content = "This agent is busy on another task.";
    //   }
    // };

  }
}
