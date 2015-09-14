import React from 'react';
import LocationActions from '../actions/LocationActions';
import LocationStore from '../stores/LocationStore';


var Locations = React.createClass({
  getInitialState() {
    return LocationStore.getState();
  },

  componentDidMount() {
    LocationStore.listen(this.onChange);
    LocationActions.fetchLocations();
  },

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState(state);
  },

  render() {
    if (this.state.errorMessage) {
      return (
        <div> Something is wrong</div>
      );
    }

    if (!this.state.locations.length) {
      return (
        <div>
          <img src="/assets/ajax-loader.gif" />
        </div>
      );
    }

    return (
      <ul>
        {this.state.locations.map((location) => {
          return (
            <li key={location.id}>{location.name}</li>
          );
        })}
      </ul>
    );
  }
});

export default Locations;
