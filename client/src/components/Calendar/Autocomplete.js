import React from "react";
import { GoogleApiWrapper } from 'google-maps-react';
export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }
  componentDidMount() {
    const google = window.google
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
      { "types": ["geocode"] });
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }
  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    if (this.props.placeholder === "Start location") {
      this.props.setCurrentTrip({ ...this.props.currentTrip, startLocation: place.formatted_address });
    }
    else if (this.props.placeholder === "Destination") {
      this.props.setCurrentTrip({ ...this.props.currentTrip, destination: place.formatted_address });
    }
    else if (this.props.className === "updateStart") {
      this.props.setUpdateStartLocation(place.formatted_address);
    }
    else if (this.props.className === "updateDestination") {
      this.props.setUpdateDestination(place.formatted_address);
    }
  }
  render() {
    return (
      <input className="form-control" ref={this.autocompleteInput} id="autocomplete" placeholder={this.props.placeholder}
        type="text"></input>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI"
})(SearchBar)