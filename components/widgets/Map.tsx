"use client"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useMemo, useState } from "react"
import ReactMapGL, { Layer, LayerProps, Source } from "react-map-gl"
import { Card } from "../ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useSearchParams } from "next/navigation"
import { DEFAULT_LOCATION } from "@/lib/config"
import { useTheme } from "next-themes"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const OPENWEATHERMAP_TOKEN = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY

export default function Map() {
  const { theme } = useTheme()
  const MapTheme = useMemo(() => {
    return theme === "system"
      ? window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme
  }, [theme])

  const searchParams = useSearchParams()
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  const [defaultLat, defaultLon] = useMemo(() => {
    const latNumber = lat ? Number(lat) : Number(DEFAULT_LOCATION.coord.lat)
    const lonNumber = lon ? Number(lon) : Number(DEFAULT_LOCATION.coord.lon)
    return [latNumber, lonNumber]
  }, [lat, lon])

  const weatherTiles = useMemo(() => {
    return [
      { label: "Temperature (°C)", code: "TA2" },
      { label: "Precipitation Intensity (mm/s)", code: "PR0" },
      { label: "Wind Speed and Direction (m/s)", code: "WND" },
      { label: "Relative Humidity (%)", code: "HRD0" },
      { label: "Cloudiness (%)", code: "CL" },
      { label: "Atmospheric Pressure (hPa)", code: "APM" },
    ]
  }, [])

  const weatherLayer: LayerProps = {
    id: "weatherLayer",
    type: "raster",
    minzoom: 0,
    maxzoom: 15,
  }

  const [viewport, setViewport] = useState({
    latitude: lat ? Number(lat) : Number(defaultLat),
    longitude: lon ? Number(lon) : Number(defaultLon),
    zoom: 7,
    pitch: 60,
    bearing: -60,
  })

  const [MapCode, setMapCode] = useState("PR0")

  useEffect(() => {

    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: lat ? Number(lat) : Number(defaultLat),
      longitude: lon ? Number(lon) : Number(defaultLon),
    }))
  }, [lat, lon, defaultLat, defaultLon])

  console.log(lat, lon, defaultLat, defaultLon)

  return (
    <Card className="order-11 col-span-2 h-[25rem] overflow-hidden overscroll-contain  p-0 md:p-0 xl:col-span-3">
      <div className="absolute right-0 z-10 m-2">
        <Select value={MapCode} onValueChange={setMapCode}>
          <SelectTrigger aria-label="Map layer" className="w-fit">
            <SelectValue placeholder="Map Layers" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              {weatherTiles.map((tile) => (
                <SelectItem key={tile.code} value={tile.code}>
                  {tile.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ReactMapGL
        //reuseMaps
        {...viewport}
        attributionControl={true}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={`mapbox://styles/mapbox/${MapTheme}-v11`}
        style={{
          flex: "1",
          position: "relative",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          zIndex: 0,
        }}
      >
        {/* <Source
          key={MapCode}
          id="weatherSource"
          type="raster"
          tiles={[
            //`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHERMAP_TOKEN}`,

            //`https://maps.openweathermap.org/maps/2.0/weather/PR0/{z}/{x}/{y}?appid=75812949eb323e3b2b952f77f2102191`,
            `https://api.openweathermap.org/data/3.0/onecall?lat=44.1544355&lon=10.861614&exclude=hourly,daily&appid=${OPENWEATHERMAP_TOKEN}`,
            //https://api.openweathermap.org/data/3.0/onecall?lat=44.1544355&lon=10.861614&exclude=hourly,daily&appid=75812949eb323e3b2b952f77f2102191
          ]}
          tileSize={256}
        >
          <Layer {...weatherLayer} />
        </Source> */}
      </ReactMapGL>
    </Card>
  )
}
