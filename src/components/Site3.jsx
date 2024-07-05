/* eslint-disable */
import { useEffect, useState } from 'react';
import './site.css'
import Site3_item_box from './Site3_item_box';

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
  for (let i = 2; i < arr.length; i+=2) { // [min, max]
    let mergeArr = [
      Number(arr[i].value).toFixed(0),
      Number(arr[i+1].value).toFixed(0),
    ];
    // console.log('min', Number(arr[i].value).toFixed(0))
    // console.log('max', Number(arr[i+1].value).toFixed(0))
    collectTemp.push(mergeArr)
  }
  // console.log('collectTemp', collectTemp)
  return collectTemp;
}


export default function Site3({ data, date }) {
  const [weekTempArr, setWeekTempArr] = useState([]);
  
  useEffect(() => {
    if (!data.before.length) return;
    let arr = mergeWeekData(data);
    setWeekTempArr(arr)
  }, [data])
  // console.log('weekTempArr', weekTempArr)
  console.log()

  
  const arr = [1, 2, 3];
  return (
    <>
      <div className="site3">
        <div className="item_box_wrap">
          {
            weekTempArr.map((v, i) => {
              return (
                <Site3_item_box key={`${i}번째 주간날씨`} tempArr={v} idx={i} />
              )
            })
          }
        </div>
      </div>
    </>
  )
}