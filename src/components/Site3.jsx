/* eslint-disable */
import { useEffect, useState } from 'react';
import './site.css'
import Site3_item_box from './Site3_item_box';
import getWeatherIconName from '../functions/getWeatherIcon';
import getWeatherIconNameTranslator from '../functions/getWeatherIconNameTranslator';

const keys =  [
  'taMin1', 'taMax1', 'taMin2', 'taMax2', 'taMin3', 'taMax3', 
  'taMin4', 'taMax4', 'taMin5', 'taMax5', 'taMin6', 'taMax6'
];

const mergeWeekData = (data) => {
  let num = 0;
  let weekArr = [];
  const threeDaysBefore = [...data.before].filter((item) => 
    item.category === 'TMN' || item.category === 'TMX'
  )

  // 객체 변환
  const resultArray = data.threeDaysLater.map(item => 
    Object.entries(item).map(([key, value]) => ({ key, value }))
  ).flat()

  threeDaysBefore.map(item => {
    if (item.category === 'TMN') {
      item['key'] = `taMin${num}`;
      item[`value`] = item.fcstValue;
    } else if (item.category === 'TMX') {
      item[`key`] = `taMax${num}`;
      item[`value`] = item.fcstValue;
      num++
    }
    weekArr.push(item)
  })
  // 정렬
  let arr = weekArr.concat(resultArray).filter(value => 
    /ta(Max|Min)\d*$/.test(value.key)
  );
  // console.log('arr', arr)
  
  // 합병
  let collectTemp = [];
  for (let i = 0; i < arr.length; i+=2) { // 오류나면 arr의 fcstDate 확인(16시 전 i=1, 이후 i=0, ???)
    let mergeArr = [
      Number(arr[i].value).toFixed(0),
      Number(arr[i+1].value).toFixed(0),
    ];
    // console.log('min', Number(arr[i].value).toFixed(0))
    // console.log('max', Number(arr[i+1].value).toFixed(0))
    collectTemp.push(mergeArr) // [min, max]
  }
  // console.log('collectTemp', collectTemp)
  return collectTemp.slice(0, 6);
}
const mergeWeatherTwoDays = (data) => {
  let mergeBox = [];
  for (let i = 0; i < data.length; i+=2) {
    let box = [data[i], data[i+1]];
    mergeBox.push(box);
  }
  let value = [];
  let num = 1;
  for (let i = 0; i < mergeBox.length; i+=2) {
    let name = [{
      key: `wf${num}AM`, 
      value: getWeatherIconName(+mergeBox[i][0].fcstValue, +mergeBox[i][1].fcstValue),
      origin: [+mergeBox[i][0].fcstValue, +mergeBox[i][1].fcstValue],
    },
    {
      key: `wf${num}PM`, 
      value: getWeatherIconName(+mergeBox[i+1][0].fcstValue, +mergeBox[i+1][1].fcstValue),
      origin: [+mergeBox[i+1][0].fcstValue, +mergeBox[i+1][1].fcstValue],
    }];
    value.push(name);
    num++;
  }
  return value;
}

export default function Site3({ data, weatherState }) {
  const [weekTempArr, setWeekTempArr] = useState([]);
  const [weekWeatherArr, setWeekWeatherArr] = useState([]);

  useEffect(() => {
    if (!data.before.length) return;
    // 일간 기온 최저/최고 병합
    let arr = mergeWeekData(data);
    setWeekTempArr(arr);
  }, [data])

  useEffect(() => {
    // console.log('weatherState', weatherState.twoDays)
    if (!weatherState.twoDays) return;
    // 일간 날씨 아이콘
    let twoDaysWeather = mergeWeatherTwoDays(weatherState.twoDays);
    let twoDaysLaterWeather = []; 
    let box = [];
    for (let i in weatherState.twoDaysLater[0]) { // [{...}]
      if (i.includes('wf')) {
        if (box.length > 1) {
          twoDaysLaterWeather.push(box); // [{value}, {value}]
          box = [];
        }
        let value = {
          key: i,
          value: getWeatherIconNameTranslator(weatherState.twoDaysLater[0][i]), // 함수적용
          origin: weatherState.twoDaysLater[0][i]
        }; 
        box.push(value);
        // console.log('i', i, weatherState.twoDaysLater[0][i]);
        // console.log(getWeatherIconNameTranslator("흐리다 맑음이요"))
      } 
    }
    // console.log('twoDaysWeather', twoDaysWeather)
    // console.log('twoDaysLaterWeather', twoDaysLaterWeather)
    setWeekWeatherArr(twoDaysWeather.concat(twoDaysLaterWeather));
  }, [weatherState])
  console.log('weekWeatherArr', weekWeatherArr)
  
  return (
    <>
      <div className="site3">
        <div className="item_box_wrap">
          {
            weekTempArr.map((v, i) => { // 07번째부터 AM/PM 없음
              return (
                <Site3_item_box key={`${i}번째 주간날씨`} data={v} idx={i} icons={weekWeatherArr} />
              )
            })
          }
        </div>
      </div>
    </>
  )
}