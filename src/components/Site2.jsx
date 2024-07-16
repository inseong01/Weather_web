/* eslint-disable */
import { useEffect, useState } from "react";
import Site2_item_box from "./Site2_item_box";
import './site.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const SKYCode = [ // 하늘 상태 코드
  {category: '맑음', value: 1}, 
  {category: '구름많음', value: 3}, 
  {category: '흐림', value: 4}, 
]
const PTYCode = [ // 강수형태 코드
  {category: "없음", value:0},
  {category: "비", value:1},
  {category: "비/눈", value:2},
  {category: "눈", value:3},
  {category: "소나기", value:4},
]

export default function Site2({ time, temperature, sky }) {
  const [timeStandard, setTimeStandard] = useState('');
  const [timeArr, setTimeArr] = useState([]);
  
  useEffect(() => { // temperature
    // console.log('temperature[0]', temperature)
    if (!temperature[0]) return; // {...}
    setTimeStandard(
      time.slice(0, 2) + ':' + time.slice(2, 4)
    )

    let arr = [];
    // 시간 별 온도
    for (let i = 0; i < temperature.length; i++) {
      let box = [temperature[i], sky[i]]; // [{"TMP"}, [Array(2)]]
      arr.push(box);
    }
    // console.log('arr', arr)
    setTimeArr(arr);
  }, [temperature]);
  // console.log('setTimeArr', timeArr)

  return (
    <>
      <div className="site2">
        <div className="item_box_wrap">
          <div className="title">시간 별 날씨 <span>{timeStandard} 기준</span></div>
          <Swiper 
            className="swiper"
            spaceBetween={30} 
            slidesPerView={4}
            breakpoints={{
              768: {
                slidesPerView:4
              },
              1024: {
                slidesPerView:5
              }
            }}
          >
            {
              timeArr.map((value, idx) => {
                return (
                  <SwiperSlide key={`${idx + 1}번째 슬라이드`}>
                    <Site2_item_box data={value} time={time} />
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
      </div>
    </>
  )
}