import React from 'react';
import HistoryActions from '../actions/HistoryActions';
import styles from '../assets/styles/components/history.css';


var HistoryItem = React.createClass({
  _onClick() {
    HistoryActions.loadRequest(this.props.request);
  },

  _onDestroyClick() {

  },

  render() {
    var request = this.props.request;

    return (
      <li onClick={this._onClick}>
        <label className={styles.item}>Request #{request.id}</label>
      </li>
    );
  }
});

export default HistoryItem;
