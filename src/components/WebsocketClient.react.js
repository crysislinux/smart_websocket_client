import React from 'react';

import AddressBar from './AddressBar.react';
import Content from './Content.react';
import Result from './Result.react';
import History from './History.react';
import Messages from './Messages.react';
import styles from '../assets/styles/components/websocketClient.css';


var content = {
  action: 'order.index',
  params: {}
};

var WebsocketClient = React.createClass({
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.sidebar}>
          <History content='I am history' />
        </div>
        <div className={styles.content}>
          <Messages />
          <AddressBar />
          <Content content={JSON.stringify(content)} />
          <Result />
        </div>
      </div>
    );
  }
});

export default WebsocketClient;
