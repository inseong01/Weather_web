/* eslint-disable */
import { useEffect, useState } from 'react'

import './Home.css'
import UseTitle from '../hooks/UseTitle'
import Site1 from '../components/Site1'
import Site2 from '../components/Site2'
import Site3 from '../components/Site3'
import Site4 from '../components/Site4'
import GetSecond_weatherState_API from '../functions/second_weatherState_api'
import GetThird_temperature_API from '../functions/third_temperature_api'
import GetSecondAPI from '../functions/second_api'
import GetFirstAPI from '../functions/first_api'
import GetForth_airConditionValue_API from '../functions/forth_airConditionValue_api'
import GetXY_Position_API from '../functions/forth_xyPosition_API'
import GetStaionName_API from '../functions/forth_stationName'
sessionStorage.clear()

// Date
const getCurrentTime = () => {
  const getCurrentTime = new Date().getHours() + '00';
  console.log(getCurrentTime)
  return getCurrentTime
}
const currentDate = new Date().toISOString().slice(0,10).replaceAll('-', '');

// API
const API_KEY = 'dviGmZuftX3h7VNSS2UVxZ1M7AfjXEQRTTQVoMhes28TPZETMMXENDJ%2FT60N5MkIHuZGTVGLZqYBfbZTwGUPUw%3D%3D'

const dailyWeather_API = GetFirstAPI(API_KEY, currentDate, getCurrentTime);
const dailyHoursTemperature_API = GetSecondAPI(API_KEY, currentDate);
const dailyWeatherState_API = GetSecond_weatherState_API(API_KEY, currentDate);
const weeklyTemperature_API = GetThird_temperature_API(API_KEY, currentDate);

// 코드 모음
const ultraSrtFcstCategory = [ // 초단기예보
  {category: 'T1H',	value: '기온'}, //	℃	10
	{category: 'RN1',	value: '1시간 강수량'}, //	범주 (1 mm)	8
	{category: 'SKY',	value: '하늘상태'}, //	코드값	4
	{category: 'UUU',	value: '동서바람성분'}, //	m/s	12
	{category: 'VVV',	value: '남북바람성분'}, //	m/s	12
	{category: 'REH',	value: '습도'}, //	%	8
	{category: 'PTY',	value: '강수형태'}, //	코드값	4
	{category: 'LGT',	value: '낙뢰'}, //	kA(킬로암페어)	4
	{category: 'VEC',	value: '풍향'}, //	deg	10
	{category: 'WSD',	value: '풍속'}, //	m/s	10
]
const vilageFcstCategory = [ // 단기예보
  {category: 'POP',	value: '강수확률'},	// %	8
	{category: 'PTY',	value: '강수형태'},	// 코드값	4
	{category: 'PCP',	value: '1시간 강수량'}, //	범주 (1 mm)	8
	{category: 'REH',	value: '습도'},	// %	8
	{category: 'SNO',	value: '1시간 신적설'}, //	범주(1 cm)	8
	{category: 'SKY',	value: '하늘상태'}, //	코드값	4
	{category: 'TMP',	value: '1시간 기온'}, //	℃	10
	{category: 'TMN',	value: '일 최저기온'}, //	℃	10
	{category: 'TMX',	value: '일 최고기온'}, //	℃	10
	{category: 'UUU',	value: '풍속(동서성분)'}, //	m/s	12
	{category: 'VVV',	value: '풍속(남북성분)'}, //	m/s	12
	{category: 'WAV',	value: '파고'}, //	M	8
	{category: 'VEC',	value: '풍향'}, //	deg	10
	{category: 'WSD',	value: '풍속'}, //	m/s	10

]
const localData = [ // 지역 코드, nx-ny 좌표 중복 있음
  { "nx": 57, "ny": 128, "local": "덕양구 주교동" },
  { "nx": 57, "ny": 129, "local": "덕양구 원신동" },
  { "nx": 58, "ny": 128, "local": "덕양구 흥도동" },
  { "nx": 57, "ny": 129, "local": "덕양구 성사1동" },
  { "nx": 57, "ny": 128, "local": "덕양구 성사2동" },
  { "nx": 59, "ny": 128, "local": "덕양구 효자동" },
  { "nx": 58, "ny": 129, "local": "덕양구 삼송1동" },
  { "nx": 58, "ny": 129, "local": "덕양구 삼송2동" },
  { "nx": 58, "ny": 128, "local": "덕양구 창릉동" },
  { "nx": 59, "ny": 130, "local": "덕양구 고양동" },
  { "nx": 58, "ny": 129, "local": "덕양구 관산동" },
  { "nx": 57, "ny": 128, "local": "덕양구 능곡동" },
  { "nx": 57, "ny": 128, "local": "덕양구 화정1동" },
  { "nx": 57, "ny": 128, "local": "덕양구 화정2동" },
  { "nx": 57, "ny": 128, "local": "덕양구 행주동" },
  { "nx": 57, "ny": 128, "local": "덕양구 행신1동" },
  { "nx": 57, "ny": 128, "local": "덕양구 행신2동" },
  { "nx": 57, "ny": 128, "local": "덕양구 행신3동" },
  { "nx": 58, "ny": 128, "local": "덕양구 행신4동" },
  { "nx": 58, "ny": 127, "local": "덕양구 화전동" },
  { "nx": 58, "ny": 127, "local": "덕양구 대덕동" },
  { "nx": 56, "ny": 129, "local": "일산동구 식사동" },
  { "nx": 56, "ny": 129, "local": "일산동구 중산1동" },
  { "nx": 56, "ny": 129, "local": "일산동구 중산2동" },
  { "nx": 56, "ny": 129, "local": "일산동구 정발산동" },
  { "nx": 57, "ny": 129, "local": "일산동구 풍산동" },
  { "nx": 57, "ny": 128, "local": "일산동구 백석1동" },
  { "nx": 57, "ny": 128, "local": "일산동구 백석2동" },
  { "nx": 57, "ny": 129, "local": "일산동구 마두1동" },
  { "nx": 56, "ny": 128, "local": "일산동구 마두2동" },
  { "nx": 56, "ny": 128, "local": "일산동구 장항1동" },
  { "nx": 56, "ny": 128, "local": "일산동구 장항2동" },
  { "nx": 57, "ny": 130, "local": "일산동구 고봉동" },
  { "nx": 56, "ny": 129, "local": "일산서구 일산1동" },
  { "nx": 56, "ny": 129, "local": "일산서구 일산2동" },
  { "nx": 56, "ny": 129, "local": "일산서구 일산3동" },
  { "nx": 56, "ny": 129, "local": "일산서구 탄현1동" },
  { "nx": 56, "ny": 130, "local": "일산서구 탄현2동" },
  { "nx": 56, "ny": 129, "local": "일산서구 주엽1동" },
  { "nx": 56, "ny": 129, "local": "일산서구 주엽2동" },
  { "nx": 56, "ny": 129, "local": "일산서구 대화동" },
  { "nx": 56, "ny": 129, "local": "일산서구 송포동" },
  { "nx": 56, "ny": 129, "local": "일산동구 덕이동" },
  { "nx": 55, "ny": 129, "local": "일산동구 가좌동" }
]
const skyCode = [ // 하늘 상태 코드
  {category: '맑음', value: 1}, 
  {category: '구름많음', value: 3}, 
  {category: '흐림', value: 4}, 
]
const PTYCode = [ // 단기 강수형태 코드
  {category: '없음', value: 0},
  {category: '비', value: 1},
  {category: '비/눈', value: 2},
  {category: '눈', value: 3},
  {category: '소나기', value: 4},
]
const vilageUpdateTime = [
  '0200', '0500', '0800', '1100', '1400', '1700', '2000', '2300'
];

// 계산 함수
const getLocal = (x, y) => { // 주소 선택
  let i  = 0;
  let local = []
  localData.forEach((value) => { // "덕양구 주교동"
    if (value.nx != x) return;
    if (value.ny == y) {
      // console.log(value.local)
      local[i] = value.local;
      // console.log('local', local)
      i++
    }
  })
  return local[7];
}
const getTemp = (data) => {
  let temperature;
  for (let i = 0; i < data.length; i++) {
    if (data[i].category == '기온') {
      temperature = data[i].fcstValue;
      return temperature;
    }    
  }
}
const getSky = (data) => {
  let sky;
  for (let i = 0; i < data.length; i++) {
    if (data[i].category == '하늘상태') {
      sky = parseInt(data[i].fcstValue);
      
      switch(sky) {
        case 1 :
          sky = '맑음'
          break;
        case 3 :
          sky = '구름많음'
          break;
        case 4 :
          sky = '흐림'
          break;
        default:
          sky = '기본값'
      }
      return sky;
    }    
  }

  if (data.value === sky) {
    sky = data.value;
    return sky
  }
}
const getHighTemp = (data, value, time) => {
  let highTemp;
  // if (time > '1100' && data.fcstDate === currentDate) return value;
  data.forEach((value, idx) => {
    if (value.category === 'TMX') { 
      // console.log(idx)
      highTemp = value.fcstValue
    }
    return highTemp;
  })
  return highTemp;
}
const getLowTemp = (data, value, time) => {
  let lowTemp;
  // if (time > '0200' && data.fcstDate === currentDate) return value
  data.forEach(value => {
    if (value.category === 'TMN') { 
      lowTemp = value.fcstValue
      return lowTemp;
    }
  })
  return lowTemp;
}
const findPreviousUpdateTime = (arr, currentTime) => {
  let previousTime = null;

  for (let time of arr) {
    if (time < currentTime) {
      previousTime = time;
    } else {
      break;
    }
  }
  return previousTime;
};


function Home() {
  const [ultraSrtFcstData, setUltraSrtFcstData] = useState(); // 초단기예보 
  const [vilageFcstDaily, setVilageFcstDaily] = useState(); // 단기예보 
  const [weeklyData, setWeeklyData] = useState({
    before: [],
    threeDaysLater: [],
  });
  const [dailyState, setDailyState] = useState();
  const [airCondition, setAirCondition] = useState([])

  const [mainSec, setMainSec] = useState({
    local: '',
    temp: '',
    sky: '',
    highTemp: '',
    lowTemp: '',
    baseTime: '',
  })
  const [currentTime, setCurrentTime] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [timeSessionData, setTimeSessionData] = useState([]);
  const [updateTime, setUpdateTime] = useState('');

  // 데이터 추출
  useEffect(() => {
    let res1;
    let res2;
    dailyWeather_API //1
      .then((resolve) => {
        res1 = JSON.parse(resolve).response.body.items.item;
        res1.map(value => { // 번역
          ultraSrtFcstCategory.forEach(e => {
            if (e.category == value.category) {
              return value.category = e.value
            }
          })
        })
        setUltraSrtFcstData(res1);
        return;
      })
    dailyHoursTemperature_API //2
      .then((result) => {
        res2 = JSON.parse(result).response.body.items.item;
        // res2.map((value) => {
        //   dailyData.push(value);
        // })
        setVilageFcstDaily(res2);
        
        return result + 1;
      })
    dailyWeatherState_API //3
      .then((resolve) => {
        let data = JSON.parse(resolve).response.body.items.item;
        setDailyState(data)
        return;
      })
    weeklyTemperature_API //4
      .then((resolve) => {
        let data = JSON.parse(resolve).response.body.items.item;
        setWeeklyData({
          ...weeklyData,
          threeDaysLater: data,
        })
        return;
      })

    setCurrentTime(getCurrentTime);
    const previousUpdateTime = findPreviousUpdateTime(vilageUpdateTime, currentTime);
    setUpdateTime(previousUpdateTime)
  }, [])
  // console.log('airCondition', !airCondition[0].PM10)

  // 데이터 분류
  useEffect(() => { 
    if (!ultraSrtFcstData) return;
    // filteredData 추출
    setFilteredData(
      ultraSrtFcstData.filter(item => {
        return currentTime === item.fcstTime
      })
    )
  }, [ultraSrtFcstData])
  useEffect(() => {
    if (!filteredData.length) return
    setMainSec({
      ...mainSec,
      local: getLocal(filteredData[0].nx, filteredData[0].ny), // 위치
      temp: getTemp(filteredData), // 기온
      sky: getSky(filteredData), // 하늘
      baseTime: currentTime,
    })
  }, [filteredData])

  useEffect(() => {
    if (!mainSec.local) return;
    GetXY_Position_API(API_KEY, mainSec.local.replace(/\d/g, ''))
      .then((res) => { // tmX, tmY 좌표 계산
        // console.log(0, res)
        let data = JSON.parse(res).response.body.items; 
        // [{sggName: '고양시 일산서구', umdName: '덕이동', tmX: '177349.530865', tmY: '465945.611074', sidoName: '경기도'}]
        return GetStaionName_API(API_KEY, data.flat());
      })
      .then((resolve) => { // 측정소 검색
        let data = JSON.parse(resolve).response.body.items;
        // console.log('data3', data[0])
        return GetForth_airConditionValue_API(API_KEY, data[0]) //6;
      })
      .then((res) => {
        let data = JSON.parse(res).response.body.items;
        setAirCondition([data[0]])
        // console.log('-------------------------', data)
      })

  }, [mainSec])
  

  useEffect(() => {
    if (!vilageFcstDaily) return;
    // 최저/최고온도 저장
    let highLowTmpArr = [];
    for (let i = 0; i < vilageFcstDaily.length; i++) {
      // console.log('vilageFcstDaily', vilageFcstDaily)
      if (
        vilageFcstDaily[i].category === 'TMP' || 
        vilageFcstDaily[i].category === 'TMX' || 
        vilageFcstDaily[i].category === 'TMN'
      ) {
        highLowTmpArr.push(vilageFcstDaily[i]);
      }
    }
    setWeeklyData({
      ...weeklyData,
      before: highLowTmpArr,
    })
    setMainSec({
      ...mainSec,
      highTemp: getHighTemp(highLowTmpArr, mainSec.highTemp, currentTime), // 최고온도 11
      lowTemp: getLowTemp(highLowTmpArr, mainSec.lowTemp, currentTime), // 최고온도 11
    })
    // timeSessionData 추출
    let dailyTMP = [];
    highLowTmpArr.forEach((value) => {
      if (currentDate == value.fcstDate && value.fcstTime < currentTime) return;
      dailyTMP.push(value)
    })
    setTimeSessionData(dailyTMP);
  }, [vilageFcstDaily])
  
  // console.log('weeklyData', weeklyData)


  // 현재 시간 받아오면서 자동 새로고침, 수동 새로고침 버튼 삽입
  UseTitle('오늘의 날씨');

  return (
    <>
      <div className="Home_wrap">
        <div className="header_wrap">
          <div className="site_wrap">
            <Site1 data={mainSec} />
            <Site2 data={timeSessionData} time={mainSec.baseTime} />
            <Site3 data={weeklyData} date={currentDate} />
            <Site4 data={airCondition} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
