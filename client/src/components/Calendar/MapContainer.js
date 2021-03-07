import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';

export class MapContainer extends Component {




  displayMarkers = () => {
    if (this.props.type) {
      return this.props.type.map((place, index) => {
        return <Marker key={place.reference} position={{
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        }} icon={place.icon}
          onClick={() => console.log("You clicked me!")} />
      })
    }
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        gestureHandling="greedy"
        initialCenter={
          {
            lat: this.props.props.lat,
            lng: this.props.props.lng
          }
        }
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI"
})(MapContainer)