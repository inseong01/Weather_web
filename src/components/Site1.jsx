import { useEffect, useState } from 'react'
import './site.css'



export default function Site1({ data }) {
  const { local, temp, sky, highTemp, lowTemp } = data;


  return (
    <>
      <div className="first_site">
        <div className="title">나의 위치</div>
        <div className="local">{local}</div>
        <div className="temp">{temp}°</div>
        <div className="tempSummary">{sky}</div>
        <div className="highLowtemp">최고: {highTemp}° 최저: {lowTemp}°</div>
      </div>
    </>
  )
}