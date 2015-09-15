import assign from 'object-assign'
import EventEmitter from 'events'

export const OPEN_EVENT = 'open';
export const CLOSE_EVENT = 'close';
export const ERROR_EVENT = '_error'; //event cannot just be 'error', or the EventEmitter will raise an error.
export const MESSAGE_EVENT = 'message';


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

  send(message) {
    if (this.connection) {
      this.connection.send(message);
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

  _onError() {
    self.emit(ERROR_EVENT);
  }

  _onMessage(event) {
    self.emit(MESSAGE_EVENT, event.data)
  }
}

export default new WebsocketSource();
