export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  const url = `https://${process.env.VERCEL_URL}/api/weather/hourly?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
  //console.log("QUIIIIIIIIIIIIIIII====> ",url) //chiamata giusta
  const data = await fetch(url)
  if (!data.ok) {
    throw new Error("Failed to fetch data")
  }

  return data.json()
}
