import AirconditionCalculator from '../functions/AirconditionCalculator';
import PropTypes from 'prop-types';

const airCategories = ['pm10', 'pm25', 'o3'];
const airCategoriesGrade = ['없음', '좋음', '보통', '나쁨', '매우나쁨'];
const calculateAirQualityIndexCSS = (grade, value) => {
  let cssValueBox = {};
  let transitionXValue; // 각 25%
  let bgColor;
  switch (true) {
    case grade === '좋음':
      transitionXValue = (value / 30) * 25 ? (value / 30) * 25 : 0;
      bgColor = '#4e97f5';
      break;
    case grade === '보통':
      transitionXValue = (value / 80) * 25 + 25 > 25 ? (value / 80) * 25 + 25 : 26;
      bgColor = '#3CB371';
      break;
    case grade === '나쁨':
      transitionXValue = (value / 150) * 25 + 50 > 50 ? (value / 150) * 25 + 50 : 51;
      bgColor = '#FFD700';
      break;
    case grade === '아주나쁨':
      transitionXValue = (value / 151) * 25 + 50 < 100 ? (value / 151) * 25 + 50 : 100;
      bgColor = '#FF0000';
      break;
    default:
      transitionXValue = 0;
      bgColor = 'FFF';
  }
  cssValueBox = { transitionXValue: Math.floor(transitionXValue), bgColor: bgColor };
  return cssValueBox;
};
const getData = ([data]) => {
  let returnData = {};
  let airValue = new Map();
  let airGrade = new Map();

  for (let key in data) {
    if (!key.includes('Value') && !key.includes('Grade')) continue;
    for (let name of airCategories) {
      if (!key.includes(name)) continue;
      if (key.includes('Value')) {
        airValue.set(key, data[key]);
      } else {
        const grade = airCategoriesGrade[data[key]] ?? AirconditionCalculator(key, data);
        airGrade.set(key, grade);
      }
    }
  }
  returnData = { airValue, airGrade };
  return returnData; // {airValue: Map(3) {...}, ...}
};

export default function Site4_item_box({ data }) {
  // 미세먼지 상태
  const airState = getData(data);
  const pm10Grade = airState.airGrade.get('pm10Grade');
  const pm25Grade = airState.airGrade.get('pm25Grade');
  const pm10Value = airState.airValue.get('pm10Value');
  const pm25Value = airState.airValue.get('pm25Value');
  const pm10CSS = calculateAirQualityIndexCSS(pm10Grade, pm10Value);
  const pm25CSS = calculateAirQualityIndexCSS(pm25Grade, pm25Value);

  return (
    <>
      <div className="item_box">
        <p className="title">미세먼지</p>
        <div className="value">
          {pm10Grade || null} {isNaN(pm10Value) ? '측정오류' : `${pm10Value}㎍/㎥`}
        </div>
        <div className="bar_wrap pm10">
          <div
            className="bar"
            style={{
              '--transitionX': `${pm10CSS.transitionXValue}%`,
              '--bg-color': pm10CSS.bgColor,
            }}
          ></div>
        </div>
      </div>
      <div className="item_box">
        <p className="title">초미세먼지</p>
        <div className="value">
          {pm25Grade || null} {isNaN(pm25Value) ? '측정오류' : `${pm25Value}㎍/㎥`}
        </div>
        <div className="bar_wrap pm20">
          <div
            className="bar"
            style={{
              '--transitionX': `${pm25CSS.transitionXValue}%`,
              '--bg-color': pm25CSS.bgColor,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

Site4_item_box.propTypes = {
  data: PropTypes.array,
};
