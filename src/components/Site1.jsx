/* eslint-disable */
import { useEffect, useState } from 'react'
import './site.css'

export default function Site1({ data, geolocationRes }) {
  const { local, temp, sky, highTemp, lowTemp } = data;
  const [ title, setTitle ] = useState('');
  const [ localName, setLocalName ] = useState('');

  useEffect(() => {
    if (!geolocationRes) return;
    let locationCaption = geolocationRes.includes('error') ? '기본 위치' : '나의 위치';
    setTitle(locationCaption);
  }, [geolocationRes])

  useEffect(() => {
    if (!data) return;
    let localRename = local.replace(/포함/, '');
    setLocalName(localRename);
  }, [data])
  
  return (
    <>
      <div className="first_site" data-aos="fade-up" data-aos-delay="200">
        <div className="title">{title}</div>
        <div className="local">{localName}</div>
        <div className="temp">{temp}°</div>
        <div className="tempSummary">{sky}</div>
        <div className="highLowtemp">최고: {highTemp}° 최저: {lowTemp}°</div>
      </div>
    </>
  )
}