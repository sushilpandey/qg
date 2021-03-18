import { Actions } from '@twilio/flex-ui';
import axios from 'axios';


export default function (runtimeDomain, manager) {

  Actions.replaceAction('RejectTask', (payload, original) => {
    return new Promise((resolve, reject) => {

      if (payload.task.attributes.direction == 'inbound' && payload.task.taskChannelUniqueName == 'voice') {


        const callSid = payload.task.attributes.call_sid;
        const jweToken = manager.store.getState().flex.session.ssoTokenPayload.token

        // Direction the call to voicemail after
        fetch(`https://${runtimeDomain}/update-call-to-voicemail`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          body: `callSid=${callSid}&taskSid=${payload.task.taskSid}&Token=${jweToken}`
        })
        .then(response => {
          console.log('Outbound call has been placed into wrapping');
          original(payload);
        })
        .catch(error => {
          original(payload);
          console.log(error);
        });
      } else {
        original(payload);
      }
      resolve();
    })
  })




}
