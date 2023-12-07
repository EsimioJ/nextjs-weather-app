"use client"
import "mapbox-gl/dist/mapbox-gl.css"
import React from 'react'
import Map, {Marker} from 'react-map-gl'


const Mapo = () => {
  return (
    <Map
    initialViewState={{
      latitude: 37.8,
      longitude: -122.4,
      zoom: 14
    }}
    style={{width: 800, height: 600}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
  >
    <Marker longitude={-122.4} latitude={37.8} color="red" />
  </Map>
  )
}

export default Mapo