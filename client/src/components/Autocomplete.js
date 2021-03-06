import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



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
        {"types": ["geocode"]});

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    const place = this.autocomplete.getPlace();
    this.props.setCurrentTrip({...this.props.currentTrip, startLocation: place});
  }

  render() {
    
    return (
        <input ref={this.autocompleteInput}  id="autocomplete" placeholder={this.props.placeholder}
         type="text"></input>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI"
})(SearchBar)