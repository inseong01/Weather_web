/* eslint-disable */
import { useEffect, useState } from 'react';

import './Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import UseTitle from '../hooks/UseTitle';
import Site1 from '../components/Site1';
import Site2 from '../components/Site2';
import Site3 from '../components/Site3';
import Site4 from '../components/Site4';
import Site5 from '../components/Site5';

import getSecond_weatherState_API from '../functions/second_weatherState_api';
import getThird_temperature_API from '../functions/third_temperature_api';
import getSecondAPI from '../functions/second_api';
import getFirstAPI from '../functions/first_api';
import getForth_airConditionValue_API from '../functions/forth_airConditionValue_api';
import getXY_Position_API from '../functions/forth_xyPosition_API';
import getStaionName_API from '../functions/forth_stationName';
import getSecondAPI_lowtemp from '../functions/second_api_lowTemp';
import filteringVilageFcstDaily from '../functions/filteringVilageFcstDaily';
import getSecondAPI_temp from '../functions/second_api_temp';
import Reload from '../components/Reload';

// Date
const getCurrentTime = () => {
  const getCurrentTime = new Date().getHours() + '00';
  const currentTime =
    getCurrentTime.length > 3 ? getCurrentTime : '0'.repeat(4 - getCurrentTime.length) + getCurrentTime;
  console.log(currentTime);
  return currentTime;
};
let currentTime = getCurrentTime();
// let currentTime = '0200'; // 예외처리 적용 시험 데이터
let currentDate = new Date().toISOString().slice(0, 10).replaceAll('-', '');
let currentDateMinusOne;
let previousUpdateTime;

// API
const API_KEY = import.meta.env.VITE_API_KEY;

// 코드 모음
const ultraSrtFcstCategory = [
  // 초단기예보
  { category: 'T1H', value: '기온' }, //	℃	10
  { category: 'RN1', value: '1시간 강수량' }, //	범주 (1 mm)	8
  { category: 'SKY', value: '하늘상태' }, //	코드값	4
  { category: 'UUU', value: '동서바람성분' }, //	m/s	12
  { category: 'VVV', value: '남북바람성분' }, //	m/s	12
  { category: 'REH', value: '습도' }, //	%	8
  { category: 'PTY', value: '강수형태' }, //	코드값	4
  { category: 'LGT', value: '낙뢰' }, //	kA(킬로암페어)	4
  { category: 'VEC', value: '풍향' }, //	deg	10
  { category: 'WSD', value: '풍속' }, //	m/s	10
];
const vilageFcstCategory = [
  // 단기예보
  { category: 'POP', value: '강수확률' }, // %	8
  { category: 'PTY', value: '강수형태' }, // 코드값	4
  { category: 'PCP', value: '1시간 강수량' }, //	범주 (1 mm)	8
  { category: 'REH', value: '습도' }, // %	8
  { category: 'SNO', value: '1시간 신적설' }, //	범주(1 cm)	8
  { category: 'SKY', value: '하늘상태' }, //	코드값	4
  { category: 'TMP', value: '1시간 기온' }, //	℃	10
  { category: 'TMN', value: '일 최저기온' }, //	℃	10
  { category: 'TMX', value: '일 최고기온' }, //	℃	10
  { category: 'UUU', value: '풍속(동서성분)' }, //	m/s	12
  { category: 'VVV', value: '풍속(남북성분)' }, //	m/s	12
  { category: 'WAV', value: '파고' }, //	M	8
  { category: 'VEC', value: '풍향' }, //	deg	10
  { category: 'WSD', value: '풍속' }, //	m/s	10
];
const PTYCode = [
  // 단기 강수형태 코드
  { category: '없음', value: 0 },
  { category: '비', value: 1 },
  { category: '비/눈', value: 2 },
  { category: '눈', value: 3 },
  { category: '소나기', value: 4 },
];
const vilageUpdateTime = ['0200', '0500', '0800', '1100', '1400', '1700', '2000', '2300'];
const airCondition = {};

// 계산 함수
const getLocal = (secondLc, thirdLc) => {
  // 주소 선택
  let location;
  let splitedSecondLc = secondLc.split(/(?<=.*?[시군])/); // ["~시|군", "~구"]
  if (splitedSecondLc.length > 1) {
    return (location = splitedSecondLc[1] + ' ' + thirdLc);
  } else {
    return (location = secondLc + ' ' + thirdLc);
  }
};
const getTemp = (data) => {
  let temperature;
  for (let i = 0; i < data.length; i++) {
    if (data[i].category == '기온') {
      temperature = data[i].fcstValue;
      return temperature;
    }
  }
};
const getSky = (data) => {
  let sky;
  for (let i = 0; i < data.length; i++) {
    if (data[i].category == '하늘상태') {
      sky = parseInt(data[i].fcstValue);

      switch (sky) {
        case 1:
          sky = '맑음';
          break;
        case 3:
          sky = '구름많음';
          break;
        case 4:
          sky = '흐림';
          break;
        default:
          sky = '기본값';
      }
      return sky;
    }
  }

  if (data.value === sky) {
    sky = data.value;
    return sky;
  }
};
const getHighTemp = (data) => {
  let highTemp;
  // console.log('highTemp', data)
  for (let i = 0; i < data.length; i++) {
    if (data[i].category !== 'TMX' || data[i].fcstDate !== currentDate) continue;
    highTemp = data[i].fcstValue;
  }
  return highTemp;
};
const getLowTemp = (data) => {
  let lowTemp;
  // console.log('lowTemp', data)
  for (let i = 0; i < data.length; i++) {
    if (data[i].category !== 'TMN' || data[i].fcstDate !== currentDate) continue;
    lowTemp = data[i].fcstValue;
  }
  return lowTemp;
};
const findPreviousUpdateTime = (vilageUpdateTime, currentTime) => {
  let previousTime = null;
  if (currentTime < '0200') {
    // 00~01
    return (previousTime = '2300');
  }
  if (currentTime >= '1400') {
    // 14~23
    previousTime = '1100';
    return previousTime;
  }
  for (let time of vilageUpdateTime) {
    // 02~13
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

function Home({ vilageFcstMapData, midFcstMapData, geolocation, geolocationRes, setGeoLocation }) {
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
  const [mainSec, setMainSec] = useState({
    local: '',
    temp: '',
    sky: '',
    highTemp: '',
    lowTemp: '',
    baseData: '',
  });
  const [timeSessionTMPData, setTimeSessionTMPData] = useState([]);
  const [timeSessionSKYData, setTimeSessionSKYData] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [siteCount, setSiteCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState({
    apiError: false,
    noneGeolocationError: false,
  });
  const [stationNotFound, setStationNotFound] = useState(false);

  useEffect(() => {
    if (currentTime < '0600') {
      // 06시 이전일 때
      const yesterdayDate = getYesterdayDate();
      const yesterdayDateFormatted = formatDate(yesterdayDate);
      currentDateMinusOne = yesterdayDateFormatted;
    }
    // 주간 최신화 시간
    previousUpdateTime = findPreviousUpdateTime(vilageUpdateTime, currentTime);

    // AOS 실행
    AOS.init();
  }, []);

  // 응답시간
  useEffect(() => {
    if (siteCount >= 4) {
      setLoading(false);
    }
  }, [siteCount]);

  // 현재위치
  useEffect(() => {
    if (!geolocation || !vilageFcstMapData) return;
    let selectedLocations = []; // [{단기예보 엑셀 행}, {...}, ...]
    for (let i = 0; i < vilageFcstMapData.length; i++) {
      if (
        +vilageFcstMapData[i]['위도(시)'] !== geolocation[0] ||
        +vilageFcstMapData[i]['위도(분)'] !== geolocation[1] ||
        +vilageFcstMapData[i]['경도(시)'] !== geolocation[2] ||
        +vilageFcstMapData[i]['경도(분)'] !== geolocation[3]
      )
        continue;
      selectedLocations.push(vilageFcstMapData[i]);
    }
    if (selectedLocations.length === 0) {
      // 오류 추가
      return setPageError((prev) => ({ ...prev, noneGeolocationError: true }));
    }
    setCurrentLocation(selectedLocations); // [{1단계: '경기도', 2단계: '고양시일산동구', 3단계: '중산1동', …}, ...]
  }, [geolocation, vilageFcstMapData]);

  // API 데이터 추출
  useEffect(() => {
    if (!currentLocation[0]) return;

    try {
      getFirstAPI(API_KEY, currentDate, currentTime, currentLocation[0])
        .then((res) => {
          const { response } = res;
          const data = response.body.items.item;

          // res 결과 반환
          data.map((value) => {
            // 번역
            ultraSrtFcstCategory.forEach((e) => {
              if (e.category == value.category) {
                return (value.category = e.value);
              }
            });
          });
          setUltraSrtFcstData(data);
        })
        .catch((err) => {
          console.error('getFirstAPI', err);
        });

      getSecondAPI(
        API_KEY,
        currentDate,
        currentLocation[0],
        previousUpdateTime,
        '',
        currentDateMinusOne,
        currentTime
      ) //2
        .then((res) => {
          const { response } = res;
          const data = response.body.items.item;

          // res 결과 반환
          setVilageFcstDaily(data);
        });
      getSecond_weatherState_API(API_KEY, currentDate, currentLocation[0], currentTime, currentDateMinusOne) //3
        .then((res) => {
          const { response } = res;
          const data = response.body.items.item;

          // res 결과 반환
          setDailyState({
            twoDaysLater: data,
          });
        });
      getThird_temperature_API(
        API_KEY,
        currentDate,
        currentLocation[0],
        midFcstMapData,
        currentTime,
        currentDateMinusOne
      ) //4
        .then((res) => {
          const { response } = res;
          const data = response.body.items.item;

          // res 결과 반환
          setWeeklyData((prev) => ({
            ...prev,
            threeDaysLater: data,
          }));
        });
    } catch (error) {
      console.log('API', error);
      setPageError((prev) => ({ ...prev, apiError: true }));
    }
  }, [currentLocation]);

  // 데이터 분류
  useEffect(() => {
    if (!ultraSrtFcstData) return;
    // filteredData 추출
    ultraSrtFcstData.map((item) => {
      currentTime === item.fcstTime;
    });

    setMainSec((prev) => ({
      ...prev,
      local: getLocal(currentLocation[0]['2단계'], currentLocation[0]['3단계']), // 위치
      temp: getTemp(ultraSrtFcstData), // 기온
      sky: getSky(ultraSrtFcstData), // 하늘
      baseData: ultraSrtFcstData[0],
    }));
    setSiteCount((prev) => prev + 1);
  }, [ultraSrtFcstData]);

  // 공기상태
  useEffect(() => {
    if (!mainSec.local || mainSec.highTemp) return;
    getXY_Position_API(API_KEY, mainSec.local.replace(/[\d\d,\d.제]/g, ''))
      .then((res) => {
        // tmX, tmY 좌표 계산
        const { response } = res;
        const data = response.body.items;
        // [{sggName: '고양시 일산서구', umdName: '덕이동', tmX: '177349.530865', tmY: '465945.611074', sidoName: '경기도'}]
        // 측정소가 있어도 값이 없을 수 있음 (totalCount = 0)

        // res 결과 반환
        return getStaionName_API(API_KEY, data[0]);
      })
      .then((res) => {
        // 측정소 검색
        const { response } = res;
        const data = response.body.items;

        // res 결과 반환
        return getForth_airConditionValue_API(API_KEY, data[0]); //5;
      })
      .then((res) => {
        const { response } = res;
        const data = response.body.items;

        // res 결과 반환
        if (!data[0]) {
          setStationNotFound(true);
          setSiteCount((prev) => prev + 1);
          return;
        }
        // setAirCondition(data[0]);
        airCondition['firstPlace'] = data[0];
        setSiteCount((prev) => prev + 1);
      })
      .catch((e) => {
        console.log(e);
        setStationNotFound(true);
        setSiteCount((prev) => prev + 1);
      });
  }, [mainSec]);

  // 사용 데이터 추출
  useEffect(() => {
    if (!vilageFcstDaily || vilageFcstDaily[0].baseTime === currentTime) return;
    const { beforeArr, weatherState, otherDataArr } = filteringVilageFcstDaily(
      vilageFcstDaily,
      currentDate,
      currentTime
    ); // {beforeArr, weatherState, otherDataArr};

    setWeeklyData({
      ...weeklyData,
      before: beforeArr,
      otherData: otherDataArr,
    });
    setMainSec({
      ...mainSec,
      highTemp: getHighTemp(vilageFcstDaily),
    });

    // timeSessionData 추출
    const dailyTMP = [];
    const timeSessionData = {
      dailyWeather: [],
      justTwoDays: {
        PTY: [],
        SKY: [],
      },
    };

    // 시간 별 기온
    for (let i = 0; i < beforeArr.length; i++) {
      if (beforeArr[i].category !== 'TMP') continue;
      if (beforeArr[i].fcstTime < currentTime && beforeArr[i].fcstDate === currentDate) continue;
      dailyTMP.push({ TMP: beforeArr[i] });
    }

    for (let i = 0; i < weatherState.number; i++) {
      if (timeSessionData.dailyWeather.length > 9) {
        // 데이터 10가지만 받음
        setTimeSessionTMPData(dailyTMP);
        setTimeSessionSKYData(timeSessionData.dailyWeather);
        continue;
      }

      // 시간 별 날씨
      if (weatherState.SKY[i].fcstTime === weatherState.PTY[i].fcstTime) {
        // [{SKY}, {PTY}]
        const obj = {
          SKY: weatherState.SKY[i],
          PTY: weatherState.PTY[i],
        };

        timeSessionData.dailyWeather.push(obj);
      }
    }

    for (let i = 0; i < weatherState.number; i++) {
      // 일간 날씨 이틀치
      if (weatherState.SKY[i].fcstDate === currentDate) continue;
      if (weatherState.SKY[i].fcstTime === '0600' || weatherState.SKY[i].fcstTime === '1800') {
        timeSessionData.justTwoDays.PTY.push(weatherState.PTY[i]);
        timeSessionData.justTwoDays.SKY.push(weatherState.SKY[i]);
      }
    }

    setDailyState((prev) => ({
      ...prev,
      twoDays: timeSessionData.justTwoDays,
    }));

    setSiteCount((prev) => prev + 1);
  }, [vilageFcstDaily]);

  useEffect(() => {
    // 당일 최저온도 생성/11:00이후 데이터 갱신
    if (!mainSec.highTemp) return;
    try {
      getSecondAPI_lowtemp(API_KEY, currentDate, currentLocation[0], '', 50) // 2_1
        .then((res) => {
          const data = res.response.body.items.item;

          // res 결과 반환
          setMainSec((prev) => ({
            ...prev,
            lowTemp: getLowTemp(data),
          }));
          return true;
        })
        .then((res) => {
          setSiteCount((prev) => prev + 1);
        });

      if (currentTime < '1400') return;
      getSecondAPI_temp(API_KEY, currentDate, currentLocation[0], previousUpdateTime) // 2_2
        .then((res) => {
          const data = res.response.body.items.item;
          const filteredVilage = filteringVilageFcstDaily(data, currentDate, currentTime);

          // res 결과 반환
          setWeeklyData((prev) => ({
            ...prev,
            before: filteredVilage.beforeArr,
          }));
        });
    } catch (error) {
      if (pageError) return;
      setPageError((prev) => ({ ...prev, apiError: true }));

      setSiteCount((prev) => prev + 1);
    }
  }, [mainSec.highTemp]);

  UseTitle('오늘의 날씨');

  return (
    <>
      {loading ? (
        <Reload loading={loading} pageError={pageError} setGeoLocation={setGeoLocation} />
      ) : (
        <div className="Home_wrap">
          <Site1 data={mainSec} geolocationRes={geolocationRes} />
          <div className="site_wrap" data-aos="fade-up" data-aos-delay="500">
            <div className="site_left_wrap">
              <Site2 temperature={timeSessionTMPData} sky={timeSessionSKYData} time={currentTime} />
              <Site3 data={weeklyData} weatherState={dailyState} currentDate={currentDate} />
            </div>
            <div className="site_right_wrap">
              <Site4 data={airCondition.firstPlace} stationNotFound={stationNotFound} />
              <Site5 data={ultraSrtFcstData} currentTime={currentTime} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
