import getWeatherIconNameTranslator from "./getWeatherIconNameTranslator.js";
import mergeWeatherTwoDays from "./mergeWeatherTwoDays.js";

const weatherState = {
  twoDaysLater: [
    {
      regId: '11B00000',
      rnSt3Am: 30,
      rnSt3Pm: 70,
      rnSt4Am: 40,
      rnSt4Pm: 80,
      rnSt5Am: 40,
      rnSt5Pm: 40,
      rnSt6Am: 40,
      rnSt6Pm: 40,
      rnSt7Am: 40,
      rnSt7Pm: 40,
      rnSt8: 40,
      rnSt9: 40,
      rnSt10: 40,
      wf3Am: '구름많음',
      wf3Pm: '흐리고 비',
      wf4Am: '흐림',
      wf4Pm: '흐리고 비',
      wf5Am: '흐림',
      wf5Pm: '구름많음',
      wf6Am: '구름많음',
      wf6Pm: '구름많음',
      wf7Am: '구름많음',
      wf7Pm: '구름많음',
      wf8: '구름많음',
      wf9: '흐림',
      wf10: '흐림',
    },
  ],
  twoDays: [
    {
      baseDate: '20240817',
      baseTime: '1100',
      category: 'SKY',
      fcstDate: '20240818',
      fcstTime: '0600',
      fcstValue: '3',
      nx: 56,
      ny: 129,
    },
    {
      baseDate: '20240817',
      baseTime: '1100',
      category: 'PTY',
      fcstDate: '20240818',
      fcstTime: '0600',
      fcstValue: '0',
      nx: 56,
      ny: 129,
    },
    {
      baseDate: '20240817',
      baseTime: '1100',
      category: 'SKY',
      fcstDate: '20240818',
      fcstTime: '1800',
      fcstValue: '3',
      nx: 56,
      ny: 129,
    },
    {
      baseDate: '20240817',
      baseTime: '1100',
      category: 'PTY',
      fcstDate: '20240818',
      fcstTime: '1800',
      fcstValue: '0',
      nx: 56,
      ny: 129,
    },
    {
      baseDate: '20240817',
      baseTime: '1100',
      category: 'SKY',
      fcstDate: '20240819',
      fcstTime: '0600',
      fcstValue: '3',
      nx: 56,
      ny: 129,
    },
    {
      baseDate: '20240817',
      baseTime: '1100',
      category: 'PTY',
      fcstDate: '20240819',
      fcstTime: '0600',
      fcstValue: '0',
      nx: 56,
      ny: 129,
    },
    {
      baseDate: '20240817',
      baseTime: '1100',
      category: 'SKY',
      fcstDate: '20240819',
      fcstTime: '1800',
      fcstValue: '3',
      nx: 56,
      ny: 129,
    },
    {
      baseDate: '20240817',
      baseTime: '1100',
      category: 'PTY',
      fcstDate: '20240819',
      fcstTime: '1800',
      fcstValue: '0',
      nx: 56,
      ny: 129,
    },
  ],
};

function getWeatherArr(weatherState) {
  if (!weatherState.twoDays) return;
  // 주간 날씨 아이콘
  const twoDaysWeather = mergeWeatherTwoDays(weatherState.twoDays);

  const twoDaysLaterWeather = [];
  let mergeObj = {};

  Object.keys(weatherState.twoDaysLater[0]).forEach((key) => {
    if (!key.includes('wf')) return;

    const dayNum = key.match(/\d+/)[0];
    if (Object.keys(mergeObj).length > 1) {
      mergeObj = {};
      return;
    }

    mergeObj = {
      [`wf${dayNum}Am`]: {
        url: getWeatherIconNameTranslator(weatherState.twoDaysLater[0][`wf${dayNum}Am`])
      },
      [`wf${dayNum}Pm`]: {
        url: getWeatherIconNameTranslator(weatherState.twoDaysLater[0][`wf${dayNum}Pm`])
      },
      [`regId`]: weatherState.twoDaysLater[0][`regId`],
    };

    twoDaysLaterWeather.push(mergeObj);
  });

  // 1~7일차까지 추출 
  return twoDaysWeather.concat(twoDaysLaterWeather).splice(0, 7);
}

const weekWeatherArr = getWeatherArr(weatherState);

console.log('weekWeatherArr', weekWeatherArr);


/*

// 변경 전
weekWeatherArr [
  { key: 'wf1AM', value: 'url(/img/cloud.png)', origin: [ 3, 0 ] },
  { key: 'wf1PM', value: 'url(/img/cloud.png)', origin: [ 3, 0 ] }
]

// 변경 후
const weekWeatherArr = 
  {
    {
      'wf1AM': {
        url: 'url(/img/cloud.png)', 
        sky: [ 3, 0 ]
      },
      'wf1PM': {
        url: 'url(/img/cloud.png)', 
        sky: [ 3, 0 ]  
      } 
    }
  }

*/