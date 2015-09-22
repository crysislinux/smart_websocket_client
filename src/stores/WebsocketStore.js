import alt from '../alt';
import WebsocketActions from '../actions/WebsocketActions';
import HistoryActions from '../actions/HistoryActions';


class WebsocketStore {
  constructor() {
    this.connected = false;
    this.address = null;
    this.request_data = null;
    this.errorMessage = null;

    this.bindListeners({
      handleWebsocketOpened: WebsocketActions.WEBSOCKET_OPENED,
      handleWebsocketFailed: WebsocketActions.WEBSOCKET_FAILED,
      handleWebsocketClosed: WebsocketActions.WEBSOCKET_CLOSED,
      handleWebsocketReceived: WebsocketActions.WEBSOCKET_RECEIVED,
      handleLoadRequest: HistoryActions.LOAD_REQUEST,
      handleInitialRequest: HistoryActions.REQUESTS_LOADED,
      handleAddressChanged: WebsocketActions.ADDRESS_CHANGED,
      handleRequestDataChanged: WebsocketActions.REQUEST_DATA_CHANGED
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

  handleLoadRequest(request) {
    this.address = request.address;
    this.request_data = request.data;
  }

  handleInitialRequest(requests) {
    if(requests.length > 0) {
      var request = requests[requests.length - 1];
      this.address = request.address;
      this.request_data = request.data;
    }
  }

  handleAddressChanged(address) {
    this.address = address;
  }

  handleRequestDataChanged(data) {
    this.request_data = data;
  }
}

export default alt.createStore(WebsocketStore, 'WebsocketStore');
