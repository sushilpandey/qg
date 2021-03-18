import React from 'react'
import { Manager, Actions } from '@twilio/flex-ui';


export class FlexReadyDetector extends React.Component {
  constructor(props) {
    super(props)
  }


  postData(data) {
        window.parent.postMessage(data, '*');
  }

  componentDidMount() {
   // Actions.invokeAction("SetActivity", {activityName: "Unavailable"});
  }


  render() {
    return (null);
  }
}

export default FlexReadyDetector; 