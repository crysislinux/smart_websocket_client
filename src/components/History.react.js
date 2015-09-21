import React from 'react';
import HistoryItem from './HistoryItem.react'
import HistoryStore from '../stores/HistoryStore';
import HistoryActions from '../actions/HistoryActions';
import styles from '../assets/styles/components/history.css';


var History = React.createClass({
  getInitialState() {
    return {
      requests: []
    }
  },

  componentDidMount() {
    HistoryStore.listen(this._onChange);
    HistoryActions.setupDatabase();
  },

  componentWillUnmount() {
    HistoryStore.unlisten(this._onChange);
  },

  _onChange(state) {
    this.setState({
      requests: state.requests
    });
  },

  render() {
    var rows = [];

    for(let i = this.state.requests.length - 1; i >= 0; i--) {
      let request = this.state.requests[i];
      request.id = i;
      rows.push(<HistoryItem key={request.id} request={request} />);
    }

    return (
      <div className={styles.root}>
        <ul className={styles.container}>
          {rows}
        </ul>
      </div>
    );
  }
});

export default History;
