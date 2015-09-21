import assign from 'object-assign'
import EventEmitter from 'events'

export const OPEN_EVENT = 'open';
export const CLOSE_EVENT = 'close';
export const ERROR_EVENT = '_error'; //event cannot just be 'error', or the EventEmitter will raise an error.
export const MESSAGE_EVENT = 'message';
export const EXCEPTION_EVENT = 'exception';
export const SENT_EVENT = 'sent';


var self;

class WebsocketSource {
  constructor() {
    assign(this, EventEmitter.prototype);
    this.connection = null;
    self = this;
  }

  connect(address) {
    this.connection = new WebSocket(address);
    this.connection.onclose = this._onClose;
    this.connection.onopen = this._onOpen;
    this.connection.onerror = this._onError;
    this.connection.onmessage = this._onMessage;

    return this;
  }

  send(data) {
    if (this.connection) {
      console.log('sending data:', data);
      this.emit(SENT_EVENT, {
        address: this.connection.url,
        data: data
      });
      this.connection.send(data);
    } else {
      self.emit(EXCEPTION_EVENT, 'The websocket has not connected to the server');
    }
  }

  close() {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
  }

  _onOpen() {
    self.emit(OPEN_EVENT);
  }

  _onClose() {
    self.emit(CLOSE_EVENT);
  }

  _onError(event) {
    self.emit(ERROR_EVENT, 'Can not connect to ' + event.target.url);
  }

  _onMessage(event) {
    self.emit(MESSAGE_EVENT, event.data)
  }
}

export default new WebsocketSource();
