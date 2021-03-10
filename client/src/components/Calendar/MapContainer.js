import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

export class MapContainer extends Component {




  displayMarkers = (lat, lng) => {
    if (this.props.type) {
      return this.props.type.map((place, index) => {
        return <Marker key={place.reference} position={{
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        }} icon={place.icon}
          onClick={() => console.log("You clicked me!")} />
      })
    }
    else {
      return <Marker key={uuidv4()} position={{
        lat: lat,
        lng: lng
      }}
        onClick={() => console.log("You clicked me!")} />
    }

  }


  render() {
    const style = {

    }
    return (
      <Map
        google={this.props.google}
        style={style}
        zoom={5}
        gestureHandling="greedy"
        initialCenter={
          {
            lat: this.props.props.lat,
            lng: this.props.props.lng
          }
        }
      >
        {this.displayMarkers(this.props.props.lat, this.props.props.lng)}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI"
})(MapContainer)