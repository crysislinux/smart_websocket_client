import React from 'react';

import AddressBar from './AddressBar';
import Content from './Content';
import Result from './Result';
import History from './History';


var content = {
  action: 'order.index',
  params: {}
};

var WebsocketClient = React.createClass({
  render() {
    return (
      <div>
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
