import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';


export class MapContainer extends Component {


  displayMarkers = () => {
    if (this.props.props) {
      return this.props.props.map((place, index) => {
        return <Marker key={place.reference} position={{
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        }} icon={place.icon}
          onClick={() => console.log("You clicked me!")} />
      })
    }
  }

  render() {
    console.log(this.props);
    return (
      <Map
        google={this.props.google}
        zoom={11}
        gestureHandling="greedy"
        initialCenter={
          {
            lat: 40.730610,
            lng: -73.935242
          }
        }
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI'
})(MapContainer);