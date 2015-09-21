import React from 'react';
import styles from '../assets/styles/components/result.css'


var Result = React.createClass({
  render() {
    return (
      <div className={styles.root}>
        {this.props.result}
      </div>
    );
  }
});

export default Result;
