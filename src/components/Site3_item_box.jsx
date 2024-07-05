import { useEffect, useState } from "react"

const days = [
  '일', '월', '화', '수', '목', '금', '토'
]

let num = 1
let dayNumber = new Date().getDay();

export default function Site3_item_box({ tempArr, idx }) {
  const [day, setDay] = useState('');
  
  useEffect(() => {
    let day = dayNumber + num
    if (day > 6) {
      day = dayNumber + num - 7;
    }
    if (num > 7) {
      num = 1;
    }
    setDay(days[day]);
    num++;
  }, [idx])
  console.log('day', day)

  return (
    <>
      <div className="item_box">
        <p className="day">{day}</p>
        <div className="icon"></div>
        <div className="lowTemp">{tempArr[0]}°</div>
        <div className="bar"></div>
        <div className="highTemp">{tempArr[1]}°</div>
      </div>
    </>
  )
}