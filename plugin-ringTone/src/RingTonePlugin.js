import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';


const PLUGIN_NAME = 'RingTonePlugin';

export default class RingTonePlugin extends FlexPlugin {
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
    flex.MainHeader
    .defaultProps
    .logoUrl = "https://ceil-jackal-5630.twil.io/assets/qg.png";

    let alertSound = new Audio(`https://ceil-jackal-5630.twil.io/assets/incoming-call.mp3`);
    alertSound.loop = true;

    let chatAlertSound = new Audio(`https://ceil-jackal-5630.twil.io/assets/ding.mp3`);


    const resStatus = ["accepted","canceled","rejected","rescinded","timeout"];

    // @ts-ignore
    manager.workerClient.on("reservationCreated", function(reservation) {
      let sound;
      if (reservation.task.taskChannelUniqueName === 'voice') {
        sound = alertSound
      } else if (reservation.task.taskChannelUniqueName === 'chat'){
        sound = chatAlertSound
      }
      sound.play();
      resStatus.forEach((e) => {
        reservation.on(e, () => {
          sound.pause()
        });
      })
    });

    manager.chatClient.on("messageAdded", message => {
      if (message.state.author !== manager.workerClient.attributes["contact_uri"].replace("client:","")) {
       chatAlertSound.play();
      }
    });

  }
}
