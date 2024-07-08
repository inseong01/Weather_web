/* eslint-disable */
import { useEffect, useState } from "react";
import getWeatherIconName from "../functions/getWeatherIcon";

const translateTimeCode = (val, time) => {
  if (!val) return;
  return val === time ? '지금' : val.slice(0, 2) + ':' + val.slice(2, 4)
}


export default function Site2_item_box({ time, data }) { // data = [{"TMP"}, [{"SKY"}, {"PTY"}]]
  const [current, setCurrent] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [temp, setTemp] = useState(''); // 기온
  // console.log('data', data)
  useEffect(() => {
    if (!data) return;
    let currentTime = translateTimeCode(data[0].fcstTime, time);
    setCurrent(currentTime);

    let weatherIconName = getWeatherIconName(+data[1][0].fcstValue, +data[1][1].fcstValue)
    setWeatherIcon(weatherIconName);

    setTemp(data[0].fcstValue);
  }, [data])
  // console.log('item', data)

  return (
    <>
      <div className="item_box">
        <p className="time">{current}</p>
        <div className="icon" style={{backgroundImage: weatherIcon}}></div>
        <div className="temp">{temp}°</div>
      </div>
    </>
  )
}