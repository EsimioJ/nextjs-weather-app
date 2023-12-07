export const getUVData = async ({ lat, lon }: { lat: string; lon: string }) => {
  const url = `https://${process.env.VERCEL_URL}/api/weather/uv_index?lat=${lat}&lon=${lon}`
  console.log("url", url)
  const data = await fetch(url
  )

  if (!data.ok) {
    throw new Error("Failed to fetch data")
  }

  return data.json()
}
