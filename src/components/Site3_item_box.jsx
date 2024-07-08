/* eslint-disable */
import { useEffect, useState } from "react"

const days = [
  '일', '월', '화', '수', '목', '금', '토'
]

let num = 1
let dayNumber = new Date().getDay();

export default function Site3_item_box({ data, idx, icons }) {
  const [day, setDay] = useState('');
  const [amIcon, setAmIcon] = useState('');
  const [pmIcon, setPmIcon] = useState('');
  
  useEffect(() => {
    let day = dayNumber + num
    if (day > 6) {
      day = dayNumber + num - 7;
    }
    if (num >= 7) {
      num = 0;
    }
    setDay(days[day]);
    setAmIcon(icons[idx][0].value);
    setPmIcon(icons[idx][1].value);
    num++;
  }, [idx])
  // console.log('data', data)

  useEffect(() => {
    
  }, [icons])

  return (
    <>
      <div className="item_box">
        <p className="day">{day}</p>
        <div className="dayInfo_wrap">
          <div className="icon" style={{backgroundImage: amIcon}}></div>
          <div className="icon" style={{backgroundImage: pmIcon}}></div>
          <div className="lowTemp">{data[0]}°</div>
          <div className="highTemp">{data[1]}°</div>
        </div>
      </div>
    </>
  )
}