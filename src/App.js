import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import Navigation from './components/Navigation.js';
import Header from './components/Header.js';


class App extends Component {
  render() {
    return (
        <div>
            <Header />
            <div className="app">
                <Navigation />
                <Map />
            </div>
        </div>
    );
  }
}

export default App;
