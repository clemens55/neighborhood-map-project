import React from 'react'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react'

function LoadMap(props) {
    return(
      <div id="map">
        <Map google={props.google}
          initialCenter={{ lat: 51.5117506, lng: -0.1242792 }}
          zoom={13.3}
          onClick={props.onMapClicked}
        >
          {props.filteredLocations.map((marker, index) =>(
                <Marker
                  key={index}
                  title={marker.name}
                  name={marker.name}
                  address={marker.address}
                  position={{
                    lat: marker.location.lat,
                    lng: marker.location.lng }}
                  onClick={props.onMarkerClick}
                  animation={props.activeMarker ? (marker.name === props.activeMarker.title ? '1' : '0') : '0'}
                />
              ))}
          <InfoWindow
            marker={props.activeMarker}
            visible={props.showingInfoWindow}
            onClose={props.onInfoWindowClose}
          >
            <div>
              <h3>{props.selectedPlace.name}</h3>
              <p>{props.selectedPlace.address}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBQ9G8_MuMOpa7W7cvCfTxQGYL2ittra7o")
})(LoadMap)
