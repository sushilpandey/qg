import React from 'react';
import { withTaskContext} from '@twilio/flex-ui';





export class WebChatDetails extends React.Component {


    constructor(props) {
        super(props);
    }


    render = () => {
       
        return (<div>
          <br />
          <hr />
          <h3>WebChat preEngagement Information</h3>
          <ul>
          <li>Name: {this.props.task.attributes.name}</li>
          <li>Email: {this.props.task.attributes.preEngagement.emailAddress}</li>
          <li>PhoneNumber: {this.props.task.attributes.preEngagement.phoneNumber}</li>
          <li>Source: {this.props.task.attributes.preEngagement.source}</li>
          <li>Location: {this.props.task.attributes.preEngagement.location}</li>
          </ul>
        </div>)

    }
}


export default withTaskContext(WebChatDetails);

