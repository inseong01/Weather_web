/* eslint-disable */
import { useEffect } from "react";


export default function Site2_item_box({ time, data }) {
  const translateTimeCode = (value) => {
    return value === time ? '지금' : value.slice(0, 2) + ':' + value.slice(2, 4)
  }
  useEffect(() => {


  }, [time])

  return (
    <>
      <div className="item_box">
        <p className="time">{translateTimeCode(data.fcstTime)}</p>
        <div className="icon"></div>
        <div className="temp">{data.fcstValue}°</div>
      </div>
    </>
  )
}