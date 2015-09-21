import alt from '../alt';
import WebsocketActions from '../actions/WebsocketActions';
import HistoryActions from '../actions/HistoryActions';


class HistoryStore {
  constructor() {
    this.requests = [];
    this.bindListeners({
      handleNewRequest: WebsocketActions.DATA_SENT,
      handleRequestsLoaded: HistoryActions.REQUESTS_LOADED
    });
  }

  handleRequestsLoaded(requests) {
    this.requests = requests;
  }

  handleNewRequest(request) {
    this.requests.push(request);
    HistoryActions.addRequest(request);
  }
}

export default alt.createStore(HistoryStore, 'HistoryStore');
