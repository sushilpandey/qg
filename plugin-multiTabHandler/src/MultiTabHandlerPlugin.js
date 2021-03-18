import React from 'react';
import { VERSION, Flex } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import ReactDOM from 'react-dom';

import ModalView from './ModalView';
import DuplicateWindow from './DuplicateWindow';


const PLUGIN_NAME = 'MultiTabHandlerPlugin';

export default class MultiTabHandlerPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
    DuplicateWindow();
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {

    flex.MainContainer.Content.add(<ModalView key="modalView"/>, {sortOrder: -1});

  }
}
