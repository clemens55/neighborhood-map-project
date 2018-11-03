import React, { Component } from 'react';
import './App.css';
import Nav from './components/Navigation.js';
import MapContainer from './components/Map.js'
import Sidebar from './components/Sidebar.js'
import escapeRegExp from 'escape-string-regexp'

class App extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    query: '',
    locations: [],
    tabIndex: -1,
    active: false
  }

  componentDidMount = () => {
    this.getLocations()
    this.handleTabIndex()
  }

  componentDidUpdate= () => {
    this.handleTabIndex()
  }

  getLocations = () => { //fetch locations from Foursquare API -> searching in Vienna for Coffee
    fetch('https://api.foursquare.com/v2/venues/search?near=london&query=coffee&v=20180323&limit=6&intent=browse&radius=4000&client_id=JKHLLTRULLMBDKR32BFUKWNFQ0UKGKJOEVNDAQ24NWB2A50J&client_secret=AKBVI1TWWMAAJKMQ34240ENKBWDZ5YEEWCQZBJZ5QUQU4BOM')
    .then(res => res.json())
    .then(locations => {
        this.setState({ locations: locations.response.venues });
      })
    .catch(error => this.onGetLocationsError('', error));
  }

  onGetLocationsError = (e) => { //handle possible fetching errors
    var appContainer = document.querySelector('.App')
    var errorInfo = document.createElement('div')
    var errorInfoP = document.createTextNode("There was a problem with recieving data");
    appContainer.append(errorInfo)
    errorInfo.appendChild(errorInfoP)
    errorInfo.className += 'error-info'
  }

 onMarkerClick = (props, marker) =>
   this.setState({
     activeMarker: marker,
     selectedPlace: props,
     showingInfoWindow: true
   })

 onInfoWindowClose = () =>
   this.setState({
     activeMarker: null,
     showingInfoWindow: false
   })

 onMapClicked = () => {
   if (this.state.showingInfoWindow)
     this.setState({
       activeMarker: null,
       showingInfoWindow: false
     })
  }

  onLinkClick = (e) => {
   [...document.querySelectorAll('.gmnoprint map area')].find(m => m.title === e).click()
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  onKeyPressed = (e) => { //add event to tab key press
    if (e.keyCode === 13) {
      document.activeElement.click()
    }
  }

  handleTabIndex = (i) => {
    var mapLinks = document.querySelectorAll('a')
    for (i; i < mapLinks.length; i++) {
      mapLinks[i].tabIndex = "-1";
    }
    [...document.querySelectorAll('.gmnoprint map area')].tabIndex=[0]
  }


  render() {
    const {locations, query} =  this.state
    let filteredLocations
    if (query && locations) { //filtering search results
      const match = new RegExp(escapeRegExp(query), 'i')
      filteredLocations = locations.filter((location) => match.test(location.name))
    } else {
      filteredLocations = locations ? locations : []
    }

    return (
      <div id="app">
        <Nav />
        <Sidebar
          filteredLocations={filteredLocations}
          onLinkClick={this.onLinkClick}
          locations={locations}
          onChange={this.updateQuery}
          query={query}
          active={this.state.active}
          tabIndex={this.state.tabIndex}
          onKeyPressed={this.onKeyPressed}
        />
        <MapContainer
          filteredLocations={filteredLocations}
          activeMarker={this.state.activeMarker}
          selectedPlace={this.state.selectedPlace}
          showingInfoWindow={this.state.showingInfoWindow}
          onMapClick={this.onMapClick}
          onMarkerClick={this.onMarkerClick}
          onInfoWindowClose={this.onInfoWindowClose}
        />
      </div>
    );
  }
}

export default App;
