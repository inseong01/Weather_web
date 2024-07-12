import { useEffect, useState } from "react"

const airCategories = [
  "pm10", "pm25", "o3"
];
const airCategoriesGrade = [
  "없음", "좋음", "보통", "나쁨", "매우나쁨"
]
const calculateAirQualityIndexCSS = (grade, value) => {
  let cssValueBox = [];
  let transitionXValue; // 각 25% 
  let bgColor; 
  switch (true) {
    case grade === "좋음":
      transitionXValue = (value / 30) * 25 ? ((value / 30) * 25) : 0;
      bgColor = '#4e97f5';
      break;
    case  grade === "보통" :
      transitionXValue = (value / 80) * 25 + 25 > 25 ? ((value / 80) * 25 + 25) : 26;
      bgColor = '#3CB371';
      break;
    case  grade === "나쁨" :
      transitionXValue = (value / 150) * 25 + 50 > 50 ? ((value / 150) * 25 + 50) : 51;
      bgColor = '#FFD700';
      break;
    case grade === "아주나쁨" :
      transitionXValue = (value / 151) * 25 + 50 < 100 ? ((value / 151) * 25 + 50) : 100;
      bgColor = '#FF0000';
      break;
    default :
      transitionXValue = 0;
      bgColor = "FFF";
  }
  cssValueBox = [Math.floor(transitionXValue), bgColor]
  return cssValueBox;
}

const getData = ([ data ]) => { 
  let returnData = [];
  let airValue = [];
  let airGrade = [];
  
  for (let i in data) {
    if (!i.includes('Value') && !i.includes('Grade')) continue;
    for (let name of airCategories) {
      if (!i.includes(name)) continue;
      if (i.includes("Value")) {
        let value = {
          key: i,
          value: data[i] || '측정오류'
        }
        airValue.push(value);
      } else {
        let grade = {
          key: i,
          grade: airCategoriesGrade[data[i]] || airGrade[0]
        }
        airGrade.push(grade);
      }
    }
  }
  returnData.push(airValue, airGrade)
  // console.log('returnData', returnData);
  return returnData; // [[{key: , value: }], [...]]
}

/* eslint-disable */
export default function Site4({ data }) {
  const [airState, setAirState] = useState({
    value: "",
    grade: ""
  })
  const [pm10, setPm10] = useState([]); // [grade, value, [tranX, color]]
  const [pm20, setPm20] = useState([]);
  
  useEffect(() => { // data === [{...}]
    // console.log('data', data[0])
    if (!data[0]) return;
    // 미세먼지 상태
    const airConditionState = getData(data);
    setAirState([ 
      airConditionState[0],
      airConditionState[1],
    ]);
  }, [data]);

  useEffect(() => { // airState === [[...], [...], [...]]
    // console.log('airState', airState)
    if (!airState[0]) return;

    setPm10([
      airState[1][2].grade,
      `${airState[0][0].value}㎍/㎥`,
      calculateAirQualityIndexCSS(airState[1][2].grade, airState[0][0].value),
    ])
    setPm20([
      airState[1][1].grade,
      `${airState[0][1].value}㎍/㎥`,
      calculateAirQualityIndexCSS(airState[1][1].grade, airState[0][1].value),
    ])
  }, [airState])
  // console.log('pm10', pm10, 'pm20', pm20)

  // 수치값에 따라서 bar 그래프 길이 달라짐, 수치에 따라서 색 또한 달라짐
  // 수치값 기준 pm10 >> 0-30, 31-80, 81-150, 151- 
  // 수치값 기준 pm20 >> 0-15, 16-35, 36-75, 76-

  return (
    <>
      <div className="site4" >
        <div className="item_box_wrap">
            <div className="item_box">
              <p className="title">미세먼지</p>
              <div className="value">{!pm10[0] ? null : pm10[0]} {pm10[1]}</div>
              <div className="bar_wrap pm10">
                <div className="bar" style={{'--transitionX': !pm10[2] ? 0 : `${pm10[2][0]}%`, '--bg-color': !pm10[2] ? '#FFF' : pm10[2][1]}} ></div>
              </div>
            </div>
            <div className="item_box">
              <p className="title">초미세먼지</p>
              <div className="value">{!pm20[0] ? null : pm20[0]} {pm20[1]}</div>
              <div className="bar_wrap pm20">
                <div className="bar" style={{'--transitionX': !pm20[2] ? 0 : `${pm20[2][0]}%`, '--bg-color': !pm20[2] ? '#FFF' : pm20[2][1]}} ></div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}