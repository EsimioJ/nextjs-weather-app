export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const appid = searchParams.get("appid")
  const HOURS = 23

  if (!appid) {
    return Response.json(
      { message: "OpenWeather API key not found in environment variables" },
      { status: 401 }
    )
  }
  if (!lat || !lon) {
    return Response.json({ message: "Missing parameters" }, { status: 400 })
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&cnt=${HOURS}&units=metric&appid=${appid}`,
    //`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&cnt=${HOURS}&units=metric&appid=${appid}`,
    //https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=16f80769ea3e3d0f6bda061f3d800c5c
    {
      next: { revalidate: 900 },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await res.json()

  return Response.json(data)
}
