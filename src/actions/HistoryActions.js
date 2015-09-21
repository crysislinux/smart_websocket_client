import alt from '../alt';


var historyDb = {};

class HistoryActions {
  setupDatabase() {
    var self = this;

    var loadRequestItems = function(tx, rs) {
      var requests = [];

      for(var i = 0; i < rs.rows.length; i++) {
        requests.push(rs.rows.item(i));
      }

      self.actions.requestsLoaded(requests);
      console.log('load items: ', requests)
    };

    historyDb.open = function() {
      var dbSize = 10 * 1024 * 1024; // 10MB
      historyDb.db = openDatabase('Request', '1', 'Request history', dbSize);
    };

    historyDb.onError = function(tx, e) {
      console.log('database error', e.message);
    };

    historyDb.onSuccess = function(fx, r) {
    };

    historyDb.createTable = function() {
      var db = historyDb.db;
      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS " +
        "request(ID INTEGER PRIMARY KEY ASC, address TEXT, data TEXT)", []);
      })
    };

    historyDb.addRequest = function(request) {
      var db = historyDb.db;
      db.transaction(function(tx){
        tx.executeSql("INSERT INTO request(address, data) VALUES (?,?)",
          [request.address, request.data],
          historyDb.onSuccess,
          historyDb.onError);
      });
    };

    historyDb.getAllRequestItems = function(successCallback) {
      var db = historyDb.db;
      db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM request", [], successCallback,
          historyDb.onError);
      });
    };

    historyDb.open();
    historyDb.createTable();
    historyDb.getAllRequestItems(loadRequestItems);
  }


  addRequest(request) {
    historyDb.addRequest(request)
  }

  requestsLoaded(requests) {
    this.dispatch(requests);
  }
}

export default alt.createActions(HistoryActions);
