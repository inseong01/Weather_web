import AirconditionCalculator from "../functions/AirconditionCalculator";
import PropTypes from "prop-types";

const airCategories = ["pm10", "pm25", "o3"];
const airCategoriesGrade = ["없음", "좋음", "보통", "나쁨", "매우나쁨"];
const calculateAirQualityIndexCSS = (grade, value) => {
  let cssValueBox = [];
  let transitionXValue; // 각 25%
  let bgColor;
  switch (true) {
    case grade === "좋음":
      transitionXValue = (value / 30) * 25 ? (value / 30) * 25 : 0;
      bgColor = "#4e97f5";
      break;
    case grade === "보통":
      transitionXValue = (value / 80) * 25 + 25 > 25 ? (value / 80) * 25 + 25 : 26;
      bgColor = "#3CB371";
      break;
    case grade === "나쁨":
      transitionXValue = (value / 150) * 25 + 50 > 50 ? (value / 150) * 25 + 50 : 51;
      bgColor = "#FFD700";
      break;
    case grade === "아주나쁨":
      transitionXValue =
        (value / 151) * 25 + 50 < 100 ? (value / 151) * 25 + 50 : 100;
      bgColor = "#FF0000";
      break;
    default:
      transitionXValue = 0;
      bgColor = "FFF";
  }
  cssValueBox = [Math.floor(transitionXValue), bgColor];
  return cssValueBox;
};
const getData = ([data], setStationError) => {
  let returnData = [];
  let airValue = [];
  let airGrade = [];

  for (let key in data) {
    if (!key.includes("Value") && !key.includes("Grade")) continue;
    for (let name of airCategories) {
      if (!key.includes(name)) continue;
      if (key.includes("Value")) {
        let value = {
          key: key,
          value: data[key] || setStationError(true),
        };
        airValue.push(value);
      } else {
        let grade = {
          key: key,
          grade: airCategoriesGrade[data[key]] ?? AirconditionCalculator(key, data),
        };
        airGrade.push(grade);
      }
    }
  }
  returnData.push(airValue, airGrade);
  return returnData; // [[{key: , value: }], [...]]
};
const checkStationError = (data, setStationError) => {
  let stationState = Object.values(data).includes("통신장애");
  setStationError(stationState);
};

export default function Site4_item_box({ data, setStationError }) {
  // 측정소 통신상태 확인
  checkStationError(data[0], setStationError);

  // 미세먼지 상태
  const airState = getData(data, setStationError);
  const pm10 = [
    // [grade, '㎍/㎥', css]
    airState[1][2].grade,
    `${airState[0][0].value}㎍/㎥`,
    calculateAirQualityIndexCSS(airState[1][2].grade, airState[0][0].value),
  ];
  const pm20 = [
    airState[1][1].grade,
    `${airState[0][1].value}㎍/㎥`,
    calculateAirQualityIndexCSS(airState[1][1].grade, airState[0][1].value),
  ];

  return (
    <>
      <div className="item_box">
        <p className="title">미세먼지</p>
        <div className="value">
          {!pm10[0] ? null : pm10[0]} {pm10[1]}
        </div>
        <div className="bar_wrap pm10">
          <div
            className="bar"
            style={{
              "--transitionX": !pm10[2] ? 0 : `${pm10[2][0]}%`,
              "--bg-color": !pm10[2] ? "#FFF" : pm10[2][1],
            }}
          ></div>
        </div>
      </div>
      <div className="item_box">
        <p className="title">초미세먼지</p>
        <div className="value">
          {!pm20[0] ? null : pm20[0]} {pm20[1]}
        </div>
        <div className="bar_wrap pm20">
          <div
            className="bar"
            style={{
              "--transitionX": !pm20[2] ? 0 : `${pm20[2][0]}%`,
              "--bg-color": !pm20[2] ? "#FFF" : pm20[2][1],
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

Site4_item_box.propTypes = {
  data: PropTypes.array,
  setStationError: PropTypes.func,
};
