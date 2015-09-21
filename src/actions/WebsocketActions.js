import alt from '../alt';
import * as constants from '../sources/WebsocketSource';
import WebsocketSource from '../sources/WebsocketSource';

class WebsocketActions {
  initWebsocket() {
    WebsocketSource.on(constants.OPEN_EVENT, this.actions.websocketOpened);
    WebsocketSource.on(constants.CLOSE_EVENT, this.actions.websocketClosed);
    WebsocketSource.on(constants.MESSAGE_EVENT, this.actions.websocketReceived);
  }

  openWebsocket(address) {
    try {
      WebsocketSource.connect(address);
    } catch (e) {
      this.actions._websocketFailed('Connect failed: ' + e.message);
    }
  }

  closeWebsocket() {
    WebsocketSource.close();
  }

  sendData(data) {
    WebsocketSource.send(data);
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

  websocketReceived(data) {
    console.log(data);
    this.dispatch(data);
  }
}

export default alt.createActions(WebsocketActions);
