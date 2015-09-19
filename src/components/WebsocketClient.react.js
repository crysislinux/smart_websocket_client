import React from 'react';

import AddressBar from './AddressBar.react';
import Content from './Content.react';
import Result from './Result.react';
import History from './History.react';
import styles from '../assets/styles/addressBar.css';


var content = {
  action: 'order.index',
  params: {}
};

var WebsocketClient = React.createClass({
  render() {
    return (
      <div className={styles.addressBar}>
        <div>
          <History />
        </div>
        <div>
          <AddressBar />
          <Content content={JSON.stringify(content)} />
          <Result result="test result" />
        </div>
      </div>
    );
  }
});

export default WebsocketClient;
