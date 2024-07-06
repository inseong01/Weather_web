import { useEffect, useState } from "react"

const gyeonggi_do = [ // 지역모음
  '북부: (북부 지역 모음), 경기도 고양시',
  '남부: (남부 지역 모음)'
]

const getData = (data, local) => {
  let selecedLocation = local;
  let returnData = [];

  if (local.includes("경기")) {
    let find_Gyeonggi_do = gyeonggi_do.filter(value => 
      value.includes(local)
    )[0].split(':')[0]; // '북부' || '남부'
    selecedLocation = find_Gyeonggi_do;
  }

  data.map((item, i) => {
    Object.entries(item).forEach(([key, value]) => { // [ PM10, PM25, O3 ]
      returnData[i] = [
        key,
        value.split(',').filter(value => value.includes(selecedLocation))
      ].flat();
    }) // ['PM10', ['경기북부 : 보통']]
  })
  return returnData;
}

/* eslint-disable */
export default function Site4({ data }) { // 경기남부, 경기북부 따로 판별
  const [airState, setAirState] = useState({
    PM10: "",
    PM25: "",
    O3: "",
  })
  
  useEffect(() => {
    if (!data[0].PM10) return;
    // 미세먼지 상태
    const airConditionState = getData(data, '서울');
    setAirState([ // ['PM10', '서울 : 좋음']
      airConditionState[0],
      airConditionState[1],
      airConditionState[2],
    ]);

  }, [data])
  console.log('airState', airState[0][1].split(' : ')[1])
  
  return (
    <>
      <div className="site4">
        <div className="item_box_wrap">
            <div className="item_box">
              <p className="title">미세먼지</p>
              <div className="value">{airState[0][1].split(' : ')[1]} (19㎍/㎥)</div>
              <div className="bar"></div>
            </div>
            <div className="item_box">
              <p className="title">초미세먼지</p>
              <div className="value">{airState[1][1].split(' : ')[1]} (19㎍/㎥)</div>
              <div className="bar"></div>
            </div>
        </div>
      </div>
    </>
  )
}