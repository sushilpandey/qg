import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ReactDOM from 'react-dom';
import { Manager } from '@twilio/flex-ui';

const styles = theme => ({
    modalDialog: {
        height: '170px',
        width: '450px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '4px'
    },
    content: {
        padding: '20px'
    },
    footer: {
        borderTop: '1px solid #e1dfde',
        background: '#f3f2f2',
        padding: '3px',
        height: '50px',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px'
    },
    footerButton: {
        lineHeight: '40px',
        fontSize: '12px',
        background: '#fff',
        border: '1px solid #d2d2d2',
        borderRadius: '4px',
        float: 'right',
        minWidth: '60px',
        marginLeft: '20px',
        padding: '0 15px',
        cursor: 'pointer',
        outline: 0,
        fontWeight: 400
    },
    okBtn: {
        background: '#1c5297',
        color: '#fff',
        border: '1px solid #1c5297'
    },
    loadAnywayBtn: {
        color: '#3f6da7',
        border: '1px solid #e4e2e1'
    },
    duplicateWindowModal: {
        position: 'fixed',
        zIndex: 1000,
        left: 'calc(50% - 225px)',
        border: '1px solid #d2d2d2'
    }
  });

const manager = Manager.getInstance();

export class ModalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        localStorage.setItem('loadAnywayBtnClicked', 'false');
    }

    componentDidMount(){
        this.checkForDuplicateTab()
    }

    checkForDuplicateTab() {
        if (window.IsDuplicate()) {
            this.setState({showModal: true});
        }
    };

    loadAnywayClick() {
        window.resetDuplicate();
        this.setState({showModal: false});
        localStorage.setItem('loadAnywayBtnClicked', 'true');
    }

    okBtnClick() {
        window.location.href = `https://${manager.serviceConfiguration.runtime_domain}/assets/flex-failsafe.html`;
        return false;
    }

    render() {
        const { classes } = this.props;
        if(this.state.showModal){
            // ReactDOM.unmountComponentAtNode(document.getElementById('container'));
            return (
                <div id="duplicateWindow" className={classes.duplicateWindowModal}>
                    <div className={classes.modalDialog}>
                        <div className={classes.content}>
                            <p>'Twilio Flex is already active in another browser window. If Flex is active in multiple tabs, it will cause severe issues with your phone calls or other messages. If you wish to keep using Flex in the original tab, please click on OK. If you wish to use Flex in the current tab instead, please click on “Open Flex here”. In this case Flex is deactivated in the original tab.'</p>
                        </div>
                        <div className={classes.footer}>
                            <button id="okBtn" className={`${classes.footerButton} ${classes.okBtn}`} onClick={this.okBtnClick.bind(this)}>OK</button>
                            <button id="loadAnywayBtn" className={`${classes.footerButton} ${classes.loadAnywayBtn}`} onClick={this.loadAnywayClick.bind(this)}>Open Flex here</button>
                        </div>
                    </div>
                </div>
            );
        } else{
            return(<div></div>);
        }
        
    }
}

export default connect()(withStyles(styles)(ModalView));
