import alt from '../alt';
import WebsocketActions from '../actions/WebsocketActions';
import HistoryActions from '../actions/HistoryActions';

class HistoryStore {
  constructor() {
    this.requests = [];
    this.bindListeners({
      handleNewRequest: WebsocketActions.DATA_SENT,
      handleRequestsLoaded: HistoryActions.REQUESTS_LOADED,
      handleRequestAdded: HistoryActions.REQUEST_ADDED,
      handleRequestDestroyed: HistoryActions.REQUEST_DESTROYED
    });
  }

  handleRequestsLoaded(requests) {
    this.requests = requests;
  }

  handleNewRequest(request) {
    HistoryActions.addRequest(request);
  }

  // the request has been added into database
  handleRequestAdded(request) {
    this.requests.unshift(request);
    if(this.requests.length > 200) {
      this.requests.pop();
    }
  }

  handleRequestDestroyed(requestId) {
    var deleteIndex = -1;
    for(var i = 0; i < this.requests.length; i++) {
      if(this.requests[i].id === requestId) {
        deleteIndex = i;
        break;
      }
    }

    if(deleteIndex > -1) {
      this.requests.splice(deleteIndex, 1);
    }
  }
}

export default alt.createStore(HistoryStore, 'HistoryStore');