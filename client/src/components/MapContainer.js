import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';



// export class Autocomplete extends Component {

//   constructor(props) {
//     super(props);
//     this.state = { address: '' };
//   }

//   handleChange = address => {
//     this.setState({ address });
//   };
 
//   handleSelect = address => {
//     geocodeByAddress(address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => console.log('Success', latLng))
//       .catch(error => console.error('Error', error));
//   };
//   render() {
    
//     return (
//       <PlacesAutocomplete
//         value={this.state.address}
//         onChange={this.handleChange}
//         onSelect={this.handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <input
//               {...getInputProps({
//                 placeholder: 'Search Places ...',
//                 className: 'location-search-input',
//               })}
//             />
//             <div className="autocomplete-dropdown-container">
//               {loading && <div>Loading...</div>}
//               {suggestions.map(suggestion => {
//                 const className = suggestion.active
//                   ? 'suggestion-item--active'
//                   : 'suggestion-item';
//                 // inline style for demonstration purpose
//                 const style = suggestion.active
//                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                 return (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       style,
//                     })}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     )
//   }

// }
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