import React from 'react';


var Result = React.createClass({
  render() {
    return (
      <div>
        {this.props.result}
      </div>
    );
  }
});

export default Result;
