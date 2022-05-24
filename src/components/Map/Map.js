import React, { Component, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'

import './Map.css';

class Map extends Component {
  render() {

    function LocationMarker() {
      const [position, setPosition] = useState(null)
      const map = useMapEvents({
        click() {
          map.locate()
        },
        locationfound(e) {
          setPosition(e.latlng)
          map.flyTo(e.latlng, map.getZoom())
        },
      })

      return position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )
    }

    // Tokyo coordinate
    const coords = {
      latitude: 35.652832,
      longitude: 139.839478
    }

    return (
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={8}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    );
  }
}

export default Map;
