import { getAirPollutionData } from "@/actions/getAirPollutionData"
import { getHourlyData } from "@/actions/getHourlyData"
import { getTenDayForecast } from "@/actions/getTenDayForecast"
import { getUVData } from "@/actions/getUVData"
import CurrentWeather from "@/components/widgets/CurrentWeather"
import HourlyForecast from "@/components/widgets/HourlyForecast"
 import Map from "@/components/widgets/Map"
import OtherLargeCities from "@/components/widgets/OtherLargeCities"
import TenDayForecast from "@/components/widgets/TenDayForecast"
import WeatherWidgets from "@/components/widgets/WeatherWidgets"
import { DEFAULT_LOCATION } from "@/lib/config"
import {
  AirPollutionResponse,
  HourlyForecastResponse,
  TenDayForecastData,
  UVIndexResponse,
} from "@/lib/types"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: `${DEFAULT_LOCATION.city} - Weather Forecast`,
  description: `${DEFAULT_LOCATION.city} weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
}

export default async function Home() {
  const { lat, lon } = DEFAULT_LOCATION.coord
  const city  = DEFAULT_LOCATION.city
  
  

  const HourlyDataRequest: HourlyForecastResponse = await getHourlyData({
    lat,
    lon,
  })
  const TenDayForecastRequest: TenDayForecastData = await getTenDayForecast({
    lat,
    lon,
  })
  const AirDataRequest: AirPollutionResponse = await getAirPollutionData({
    lat,
    lon,
  })
  const UvIndexRequest: UVIndexResponse = await getUVData({ lat, lon })

  const [hourly_data, ten_day_forecast, air_pollution, uv_index] =
    await Promise.all([
      HourlyDataRequest,
      TenDayForecastRequest,
      AirDataRequest,
      UvIndexRequest,
    ])
console.log("QUIIII ====>",hourly_data.hourly[0])
//console.log("hourly_data:", JSON.stringify(hourly_data, null, 2));
// console.log("",ten_day_forecast)
// console.log("air pollution", air_pollution)
// console.log("uv",uv_index)
  if (!hourly_data || !ten_day_forecast || !air_pollution) return notFound()

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
         <CurrentWeather data={hourly_data.hourly[0]} city={city} />
          {/* <TenDayForecast data={ten_day_forecast} /> */}
          test
        </div>
        <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <WeatherWidgets
            data={hourly_data.hourly[0]}
            city={city}
            airQuality={air_pollution.hourly[0]}
            uvIndexForToday={uv_index.daily.uv_index_max[0]}
          />
           {/* <HourlyForecast data={hourly_data.list} /> */}
          <Map />
          <OtherLargeCities /> 
        </section>
      </div>
    </>
  )
}
