import alt from '../alt';
import * as constants from '../sources/WebsocketSource';
import WebsocketSource from '../sources/WebsocketSource';

class WebsocketActions {
  initWebsocket() {
    WebsocketSource.on(constants.OPEN_EVENT, this.actions.websocketOpened);
    WebsocketSource.on(constants.CLOSE_EVENT, this.actions.websocketClosed);
  }

  openWebsocket(address) {
    try {
      WebsocketSource.connect(address);
    } catch (e) {
      this.actions.websocketFailed('Connect failed: ' + e.message);
    }
  }

  closeWebsocket() {
    WebsocketSource.close();
  }

  websocketClosed() {
    this.dispatch();
  }

  websocketOpened() {
    this.dispatch();
  }

  websocketFailed(message) {
    console.log(message);
    this.dispatch(message);
  }
}

export default alt.createActions(WebsocketActions);
