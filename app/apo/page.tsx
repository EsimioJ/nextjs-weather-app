"use client"
import Map from "@/components/widgets/Map"
import React, { useEffect } from "react"

type Props = {}

async function getData() {
  const res = await fetch(
    "https://api.openweathermap.org/data/3.0/onecall?lat=44.1544355&lon=10.861614&exclude=hourly,daily&appid=16f80769ea3e3d0f6bda061f3d800c5c"
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

const Page = (props: Props) => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getData();
          console.log("DATA", data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    return <div>
      <Map />
    </div>;
  };
  
  export default Page;