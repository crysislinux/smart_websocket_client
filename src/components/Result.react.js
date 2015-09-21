import React from 'react';
import WebsocketStore from '../stores/WebsocketStore'
import styles from '../assets/styles/components/result.css'


var Result = React.createClass({
  getInitialState() {
    return {
      content: this.props.content
    }
  },

  componentDidMount() {
    WebsocketStore.listen(this._onChange);
  },

  componentWillUnmount() {
    WebsocketStore.unlisten(this._onChange);
  },

  _onChange(state) {
    this.setState({
      content: state.data
    });
  },

  render() {
    return (
      <div className={styles.root}>
        {this.state.content}
      </div>
    );
  }
});

export default Result;
