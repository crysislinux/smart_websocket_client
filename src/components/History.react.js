import React from 'react';
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
    this.state.requests.forEach((request, index) => {
        rows.push(<li>Request {index}</li>);
    });

    return (
      <div className={styles.root}>
        <ul>
          {rows}
        </ul>
      </div>
    );
  }
});

export default History;
