import React from 'react';
import WebsocketClient from './components/WebsocketClient.react';
import './chrome'


React.render(
  <WebsocketClient />,
  document.getElementById('ReactApp')
);
