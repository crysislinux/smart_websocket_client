import alt from '../alt';
import WebsocketActions from '../actions/WebsocketActions';

class WebsocketStore {
  constructor() {
    this.connected = false;
    this.errorMessage = null;

    this.bindListeners({
      handleWebsocketOpened: WebsocketActions.WEBSOCKET_OPENED,
      handleWebsocketFailed: WebsocketActions.WEBSOCKET_FAILED,
      handleWebsocketClosed: WebsocketActions.WEBSOCKET_CLOSED,
      handleWebsocketReceived: WebsocketActions.WEBSOCKET_RECEIVED
    });
  }

  handleWebsocketClosed() {
    this.connected = false;
  }

  handleWebsocketOpened() {
    this.connected = true;
    this.errorMessage = null;
  }

  handleWebsocketFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleWebsocketReceived(data) {
    this.data = data;
  }
}

export default alt.createStore(WebsocketStore, 'WebsocketStore');
