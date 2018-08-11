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

  _onClearClicked() {
    HistoryActions.clearRequests();
  },

  render() {
    var rows = [];

    for(let i = 0; i < this.state.requests.length; i++) {
      let request = this.state.requests[i];
      rows.push(<HistoryItem key={request.id} request={request} />);
    }

    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <label className={styles.title}>History</label>
          <div className={styles.actions}>
            <button className={styles.ButtonClear} type="button" onClick={this._onClearClicked}>Clear</button>
          </div>
        </div>

        <ul className={styles.container}>
          {rows}
        </ul>
      </div>
    );
  }
});

export default History;
