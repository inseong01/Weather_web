/* eslint-disable */
import { useEffect, useState } from 'react'

import './Home.css'
import UseTitle from '../hooks/UseTitle'
import Site1 from '../components/Site1'
import Site2 from '../components/Site2'
import Site3 from '../components/Site3'
import Site4 from '../components/Site4'
import Site5 from '../components/Site5'
import GetSecond_weatherState_API from '../functions/second_weatherState_api'
import GetThird_temperature_API from '../functions/third_temperature_api'
import GetSecondAPI from '../functions/second_api'
import GetFirstAPI from '../functions/first_api'
import GetForth_airConditionValue_API from '../functions/forth_airConditionValue_api'
import GetXY_Position_API from '../functions/forth_xyPosition_API'
import GetStaionName_API from '../functions/forth_stationName'
import GetGeolocation from '../functions/getGeolocation'
sessionStorage.clear()

// geoLocation
const geolocation = GetGeolocation(); // [위도_d, 위도_f, 경도_d, 경도_f]

// Date
const getCurrentTime = () => {
  const getCurrentTime = new Date().getHours() + '00';
  let currentTime = getCurrentTime.length > 3 ? getCurrentTime : '0'.repeat(4 - getCurrentTime.length) + getCurrentTime;
  console.log(currentTime);
  return currentTime
}
const currentDate = new Date().toISOString().slice(0,10).replaceAll('-', '');

// API
const API_KEY = 'dviGmZuftX3h7VNSS2UVxZ1M7AfjXEQRTTQVoMhes28TPZETMMXENDJ%2FT60N5MkIHuZGTVGLZqYBfbZTwGUPUw%3D%3D'

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
const getLocal = (secondLc, thirdLc) => { // 주소 선택
  let location;
  let splitedSecondLc = secondLc.split(/(?<=.*?[시군])/); // ["~시|군", "~구"]
  if (splitedSecondLc.length > 1) {
    location = splitedSecondLc[1] + ' ' + thirdLc;
  } else {
    location = secondLc + ' ' + thirdLc;
  }
  // console.log('location', location)
  return location;
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


function Home({ geoLocationData }) {
  const [ultraSrtFcstData, setUltraSrtFcstData] = useState(); // 초단기예보 
  const [vilageFcstDaily, setVilageFcstDaily] = useState(); // 단기예보 
  const [weeklyData, setWeeklyData] = useState({
    before: [],
    threeDaysLater: [],
    otherData: [],
  });
  const [dailyState, setDailyState] = useState({
    twoDays: [],
    twoDaysLater: [],
  });
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
  const [timeSessionTMPData, setTimeSessionTMPData] = useState([]);
  const [timeSessionSKYData, setTimeSessionSKYData] = useState([]);
  const [updateTime, setUpdateTime] = useState('');
  const [currentLocation, setCurrentLocation] = useState({});

  // 현재위치
  useEffect(() => {
    if (!geoLocationData) return;
    let selectedLocations = []; // [{단기예보 엑셀 행}, {...}, ...]
    for (let i = 0; i < geoLocationData.length; i++) {
      if (
        +geoLocationData[i]["경도(시)"] !== geolocation[2] ||
        +geoLocationData[i]["경도(분)"] !== geolocation[3] ||
        +geoLocationData[i]["위도(분)"] !== geolocation[1] 
      ) continue;
      // console.log('geoLocationData', geoLocationData[i]);
      selectedLocations.push(geoLocationData[i]);
    }
    setCurrentLocation(selectedLocations);

    // 현재시간
    setCurrentTime(getCurrentTime);
    const previousUpdateTime = findPreviousUpdateTime(vilageUpdateTime, currentTime);
    setUpdateTime(previousUpdateTime)
  }, [geoLocationData])
  // console.log('currentLocation', currentLocation);

  // API 데이터 추출
  useEffect(() => {
    if (!currentLocation[0]) return;
    let res1;
    let res2;
    GetFirstAPI(API_KEY, currentDate, getCurrentTime, currentLocation[0]) //1
      .then((resolve) => {
        // console.log('resolve', resolve)
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
    GetSecondAPI(API_KEY, currentDate, currentLocation[0]) //2
      .then((result) => {
        res2 = JSON.parse(result).response.body.items.item;
        // res2.map((value) => {
        //   dailyData.push(value);
        // })
        setVilageFcstDaily(res2);
        
        return result + 1;
      })
    GetSecond_weatherState_API(API_KEY, currentDate, currentLocation[0]) //3
      .then((resolve) => {
        let data = JSON.parse(resolve).response.body.items.item;
        setDailyState({
          twoDaysLater: data,
        })
        return;
      })
    GetThird_temperature_API(API_KEY, currentDate, currentLocation[0]) //4
      .then((resolve) => {
        let data = JSON.parse(resolve).response.body.items.item;
        setWeeklyData({
          ...weeklyData,
          threeDaysLater: data,
        })
        return;
      })

  }, [currentLocation])
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
      local: getLocal(currentLocation[0]["2단계"], currentLocation[0]["3단계"]), // 위치
      temp: getTemp(filteredData), // 기온
      sky: getSky(filteredData), // 하늘
      baseTime: currentTime,
    })
  }, [filteredData])

  useEffect(() => {
    console.log('mainSec')
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
  
  // 사용 데이터 추출
  useEffect(() => { 
    if (!vilageFcstDaily) return;

    let beforeArr = [];
    let weatherState = [];
    let otherDataArr = [];
    for (let i = 0; i < vilageFcstDaily.length; i++) { // 단기예보 데이터 분류
      // console.log('vilageFcstDaily', vilageFcstDaily)
      if (
        currentDate == vilageFcstDaily[i].fcstDate 
        && vilageFcstDaily[i].fcstTime < currentTime
      ) continue;
      if (
        vilageFcstDaily[i].category === 'TMP' || 
        vilageFcstDaily[i].category === 'TMX' || 
        vilageFcstDaily[i].category === 'TMN' 
      ) {
        beforeArr.push(vilageFcstDaily[i]);
      } else if (
        vilageFcstDaily[i].category === "SKY" ||
        vilageFcstDaily[i].category === "PTY"
      ) {
        weatherState.push(vilageFcstDaily[i]);
      } else if (vilageFcstDaily[i].category === 'REH') {
        otherDataArr.push(vilageFcstDaily[i]);
      }
    }
    setWeeklyData({
      ...weeklyData,
      before: beforeArr,
      otherData: otherDataArr,
    })
    setMainSec({
      ...mainSec,
      highTemp: getHighTemp(beforeArr, mainSec.highTemp, currentTime), // 최고온도 11
      lowTemp: getLowTemp(beforeArr, mainSec.lowTemp, currentTime), // 최저온도 11
    })
    // timeSessionTMPData 추출
    let dailyTMP = [];
    let dailyWeather = [];
    // console.log('selectedVilageFcst', selectedVilageFcst)
    for (let i = 0; i < beforeArr.length; i++) { // 시간 별 기온
      let item = [];
      if (dailyTMP.length > 9) continue;
      if (beforeArr[i].category !== "TMP") continue;
      item = beforeArr[i];
      dailyTMP.push(item);
    }
    for (let i = 0; i < weatherState.length; i+=2) { // 시간 별 날씨
      let item = [];
      if (dailyWeather.length > 9) {
        setTimeSessionTMPData(dailyTMP);
        setTimeSessionSKYData(dailyWeather);
        continue;
      }
      if (weatherState[i].fcstTime === weatherState[i+1].fcstTime) { // [{SKY}, {PTY}]
        item = [weatherState[i], weatherState[i+1]];
      }
      dailyWeather.push(item);
    }
    let justTwoDays = [];
    for (let i = 0; i < weatherState.length; i++) { // 일간 날씨 이틀치
      let arr = [];
      // console.log('weatherState[i].fcstDate', weatherState[i].fcstDate, currentDate)
      if (weatherState[i].fcstDate === currentDate) continue;
      if (
        weatherState[i].fcstTime === "0600" ||
        weatherState[i].fcstTime === "1800"
      ) {
        justTwoDays.push(weatherState[i]);
      }
    }
    setDailyState({
      ...dailyState,
      twoDays: justTwoDays,
    })
  }, [vilageFcstDaily])
  // console.log('timeSessionTMPData', timeSessionTMPData)
  // console.log('dailyState', dailyState)


  // 현재 시간 받아오면서 자동 새로고침, 수동 새로고침 버튼 삽입
  UseTitle('오늘의 날씨');

  return (
    <>
      <div className="Home_wrap">
          <Site1 data={mainSec} />
          <div className="site_wrap">
            <Site2 temperature={timeSessionTMPData} sky={timeSessionSKYData} time={mainSec.baseTime} />
            <Site3 data={weeklyData} weatherState={dailyState} currentDate={currentDate} />
            <Site4 data={airCondition} />
            <Site5 data={ultraSrtFcstData} currentTime={currentTime} />
          </div>
      </div>
    </>
  )
}

export default Home
