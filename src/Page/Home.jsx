/* eslint-disable */
import { useEffect, useRef, useState } from 'react'

import './Home.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
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
import getSecondAPI_lowtemp from '../functions/second_api_lowTemp'
import filteringVilageFcstDaily from '../functions/filteringVilageFcstDaily'
import getSecondAPI_temp from '../functions/second_api_temp'
sessionStorage.clear()


// Date
const getCurrentTime = () => {
  const getCurrentTime = new Date().getHours() + '00';
  let currentTime = getCurrentTime.length > 3 ? getCurrentTime : '0'.repeat(4 - getCurrentTime.length) + getCurrentTime;
  console.log(currentTime);
  return currentTime
}
let currentTime = getCurrentTime();
// let currentTime = "0000"; // 예외처리 적용 시험 데이터
let currentDate = new Date().toISOString().slice(0,10).replaceAll('-', '');
let currentDateMinusOne;
// API
const API_KEY = import.meta.env.VITE_API_KEY;

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
const getHighTemp = (data) => {
  let highTemp;
  // console.log('highTemp', data)
  for (let i = 0; i < data.length; i++) {
    if (data[i].category !== "TMX" || data[i].fcstDate !== currentDate) continue;
      highTemp = data[i].fcstValue;
    }
  return highTemp;
}
const getLowTemp = (data) => {
  let lowTemp;
  // console.log('lowTemp', data)
  for (let i = 0; i < data.length; i++) {
    if (data[i].category !== "TMN" || data[i].fcstDate !== currentDate) continue;
      lowTemp = data[i].fcstValue;
    }
  return lowTemp;
}
const findPreviousUpdateTime = (arr, currentTime) => {
  let previousTime = null;
  if (currentTime < "0200") {
    previousTime = "2300";
  }
  if (currentTime > 1400) {
    previousTime = '1100';
    return previousTime;
  }
  for (let time of arr) { // 정렬되어 있어야 함
    if (time < currentTime) {
      previousTime = time;
    }
  }
  return previousTime;
};
function getYesterdayDate() {
  const today = new Date();
  const yesterday = new Date(today);
    
  yesterday.setDate(today.getDate() - 1);
    
  return yesterday;
}
function formatDate(date) {
  const year = date.getFullYear();
  let month = String(date.getMonth() + 1); // 월은 0부터 시작하므로 +1
  month = month.length > 1 ? month : '0' + month; // 20240711
  const day = String(date.getDate());

  return `${year}${month}${day}`;
}
function reloadPopup(load, setReload) {
  console.log('reload')
  if (load) {
    setReload(true);
  }
}

function Home({ vilageFcstMapData, midFcstMapData, geolocation, geolocationRes }) {
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
    baseData: '',
  })
  const [filteredData, setFilteredData] = useState([]);
  const [timeSessionTMPData, setTimeSessionTMPData] = useState([]);
  const [timeSessionSKYData, setTimeSessionSKYData] = useState([]);
  const [updateTime, setUpdateTime] = useState('');
  const [currentLocation, setCurrentLocation] = useState({});
  const [siteCount, setSiteCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [stationNotFound, setStationNotFound] = useState(false);
  const setTime = useRef('');


  useEffect(() => {
    if (currentTime < "0600") { // 06시 이전일 때
      const yesterdayDate = getYesterdayDate();
      const yesterdayDateFormatted = formatDate(yesterdayDate);
      currentDateMinusOne = yesterdayDateFormatted;
    }
    // currentDateMinusOne = currentDate;
    // 주간 최신화 시간
    const previousUpdateTime = findPreviousUpdateTime(vilageUpdateTime, currentTime);
    // console.log('previousUpdateTime', previousUpdateTime);
    setUpdateTime(previousUpdateTime);

    // AOS 실행
    AOS.init();
  }, [])
  
  // 응답시간
  useEffect(() => {
    // console.log('siteCount', siteCount)
    if (siteCount === 0) {
      setTime.current = setTimeout(reloadPopup, 5000, loading, setReload);
    }
    if (siteCount !== 4) return;
    else {
      clearTimeout(setTime.current);
      setLoading(false);
    }
  }, [siteCount])
  
  // 현재위치
  useEffect(() => {
    if (!vilageFcstMapData) return;
    let selectedLocations = []; // [{단기예보 엑셀 행}, {...}, ...]
    for (let i = 0; i < vilageFcstMapData.length; i++) {
      if (
        +vilageFcstMapData[i]["위도(시)"] !== geolocation[0] ||
        +vilageFcstMapData[i]["경도(시)"] !== geolocation[2] ||
        +vilageFcstMapData[i]["위도(분)"] !== geolocation[1] ||
        +vilageFcstMapData[i]["경도(분)"] !== geolocation[3] 
      ) continue;
      // console.log('vilageFcstMapData', vilageFcstMapData[i]);
      selectedLocations.push(vilageFcstMapData[i]);
    }
    setCurrentLocation(selectedLocations); // [{1단계: '경기도', 2단계: '고양시일산동구', 3단계: '중산1동', …}, ...]
  }, [vilageFcstMapData])
  // console.log('currentLocation', currentLocation);

  // API 데이터 추출
  useEffect(() => {
    if (!currentLocation[0]) return;    
    let res1;
    let res2;
    try {
    GetFirstAPI(API_KEY, currentDate, currentTime, currentLocation[0]) //1
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
    GetSecondAPI(API_KEY, currentDate, currentLocation[0], updateTime, '', currentDateMinusOne, currentTime) //2
      .then((result) => {
        res2 = JSON.parse(result).response.body.items.item;
        setVilageFcstDaily(res2);
        return;
      })
    GetSecond_weatherState_API(API_KEY, currentDate, currentLocation[0], currentTime, currentDateMinusOne) //3
      .then((resolve) => {
        let data = JSON.parse(resolve).response.body.items.item;
        setDailyState({
          twoDaysLater: data,
        })
        return;
      })
    GetThird_temperature_API(API_KEY, currentDate, currentLocation[0], midFcstMapData, currentTime, currentDateMinusOne) //4
      .then((resolve) => {
        let data = JSON.parse(resolve).response.body.items.item;
        setWeeklyData({
          ...weeklyData,
          threeDaysLater: data,
        })
        return;
      })
    } catch(error) {
      console.log('API', error)
      setPageError(true);
    }
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
      baseData: filteredData[0],
    })
    setSiteCount(siteCount+1);
  }, [filteredData])

  // 공기상태
  useEffect(() => { 
    if (!mainSec.local || mainSec.highTemp) return;
      GetXY_Position_API(API_KEY, mainSec.local.replace(/[\d\d,\d.제]/g, ''))
        .then((res) => { // tmX, tmY 좌표 계산
          let data = JSON.parse(res).response.body.items; 
          // [{sggName: '고양시 일산서구', umdName: '덕이동', tmX: '177349.530865', tmY: '465945.611074', sidoName: '경기도'}]
          return GetStaionName_API(API_KEY, data.flat());
        })
        .then((resolve) => { // 측정소 검색
          let data = JSON.parse(resolve).response.body.items;
          // 측정소가 있어도 값이 없을 수 있음 (totalCount = 0)
          return GetForth_airConditionValue_API(API_KEY, data[0]) //6;
        })
        .then((res) => {
          let data = JSON.parse(res).response.body.items;
          if (!data[0]) {
            setStationNotFound(true);
            setSiteCount(siteCount+1);
            return;
          }
          setAirCondition([data[0]])
          setSiteCount(siteCount+1);
          // console.log('-------------------------', data)
        })
        .catch((e) => {
          console.log('erroe', e)
          setStationNotFound(true);
          setSiteCount(siteCount+1);
        })
  }, [mainSec])

  // 사용 데이터 추출
  useEffect(() => { 
    if (!vilageFcstDaily || vilageFcstDaily[0].baseTime === currentTime) return;
    let arr = filteringVilageFcstDaily(vilageFcstDaily, currentDate, currentTime); // [beforeArr, weatherState, otherDataArr];
    // console.log('arr', arr)
    let beforeArr = arr[0];
    let weatherState = arr[1];
    let otherDataArr = arr[2];
    setWeeklyData({
      ...weeklyData,
      before: beforeArr,
      otherData: otherDataArr,
    })
    setMainSec({
      ...mainSec,
      highTemp: getHighTemp(vilageFcstDaily),
    })
    // timeSessionData 추출
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
    setSiteCount(siteCount+1);
  }, [vilageFcstDaily])
  useEffect(() => { // 당일 최저온도 생성/11:00이후 데이터 갱신
    if (!mainSec.highTemp) return;
    try {
      getSecondAPI_lowtemp(API_KEY, currentDate, currentLocation[0], '', 50) //2_2
        .then((result) => {
          let res = JSON.parse(result).response.body.items.item;
          setMainSec({
            ...mainSec,
            lowTemp: getLowTemp(res),
          })
        })
        setSiteCount(siteCount+1);
      if (currentTime < '1400') return;
      getSecondAPI_temp(API_KEY, currentDate, currentLocation[0], updateTime) //2_2
        .then((result) => {
          let res = JSON.parse(result).response.body.items.item;
          let arr = filteringVilageFcstDaily(res, currentDate, currentTime);
          setWeeklyData({
            ...weeklyData,
            before: arr[0],
          })
      })
    } catch(error) {
      if (pageError) return;
      setPageError(true);
      setSiteCount(siteCount+1);
    }
  }, [mainSec.highTemp])

  UseTitle('오늘의 날씨');

  return (
    <>
      {
        loading ? reload ? <p className='msg'>{pageError ? `API 문제` : `응답시간 초과`}, 새로고침을 눌러주세요</p> :
        <p className='msg'>날씨 정보 가져오는 중..</p> : 
        <div className="Home_wrap">
            <Site1 data={mainSec} geolocationRes={geolocationRes} />
            <div className="site_wrap" data-aos="fade-up" data-aos-delay="500">
              <Site2 temperature={timeSessionTMPData} sky={timeSessionSKYData} time={currentTime} />
              <Site3 data={weeklyData} weatherState={dailyState} currentDate={currentDate} />
              <Site4 data={airCondition} stationNotFound={stationNotFound} />
              <Site5 data={ultraSrtFcstData} currentTime={currentTime} />
            </div>
        </div>
      }
    </>
  )
}

export default Home
