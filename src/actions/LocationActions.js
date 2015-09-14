import alt from '../alt';
import LocationSource from '../sources/LocationSource';

class LocationActions {
  updateLocations(locations) {
    this.dispatch(locations);
  }

  fetchLocations() {
    this.dispatch();
    LocationSource.fetch()
      .then((locations) => {
        this.actions.updateLocations(locations);
      })
      .catch((errorMessage) => {
        this.actions.locationsFailed(errorMessage);
      })
  }

  locationsFailed(errorMessage) {
    console.log(errorMessage);
    this.dispatch(errorMessage);
  }
}

export default alt.createActions(LocationActions);
