import React from 'react';


var Content = React.createClass({
  render() {
    return (
      <textarea value={this.props.content}></textarea>
    );
  }
});

export default Content;
