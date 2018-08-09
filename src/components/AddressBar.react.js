import React from 'react';
import WebsocketStore from '../stores/WebsocketStore'
import WebsocketActions from '../actions/WebsocketActions'
import styles from '../assets/styles/components/addressBar.css'
import buttonStyle from '../assets/styles/components/button.css'

var AddressBar = React.createClass({
  getInitialState() {
    var websocket = WebsocketStore.getState();
    return {
      websocket: websocket
    };
  },

  componentDidMount() {
    WebsocketStore.listen(this._onChange);
    WebsocketActions.initWebsocket();
  },

  componentWillUnmount() {
    WebsocketStore.unlisten(this._onChange);
  },

  _onChange(state) {
    this.setState({
      websocket: state
    });
  },

  _onClick() {
    if (this.state.websocket.connected) {
      WebsocketActions.closeWebsocket();
    } else {
      WebsocketActions.openWebsocket(this.state.websocket.address);
    }
  },

  _onAddressChange(event) {
    WebsocketActions.addressChanged(event.target.value);
  },

  render() {
    var text = this.state.websocket.connected ? 'Disconnect' : 'Connect';
    return (
      <div className={styles.root}>
        <input className={styles.input} type="text" placeholder="ws://localhost:3002" value={this.state.websocket.address} onChange={this._onAddressChange} />
        <button className={buttonStyle.button} type="button" onClick={this._onClick}>{text}</button>
      </div>
    );
  }
});

export default AddressBar;
