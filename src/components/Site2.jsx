/* eslint-disable */
import { useEffect, useState } from "react";
import Site2_item_box from "./Site2_item_box";
import './site.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Site2({ time, data }) {
  const [timeStandard, setTimeStandard] = useState('');
  const [timeArr, setTimeArr] = useState([]);
  let timeData = [];

  useEffect(() => {
    setTimeStandard(
      time.slice(0, 2) + ':' + time.slice(2, 4)
    )
    // 시간 별 날씨(현재 시간 + 10h 값 10개 추출)
    data.forEach(value => {
      if (timeData.length > 10) return;
      if (value.fcstTime == time) {
        timeData.push(value);
        return;
      }
      timeData.push(value);
    })
    setTimeArr(timeData);
  }, [data])

  return (
    <>
      <div className="site2">
        <div className="item_box_wrap">
          <div className="title">시간 별 날씨 <span>{timeStandard} 기준</span></div>
          <Swiper 
            className="swiper"
            spaceBetween={30} 
            slidesPerView={5}
          >
            {
              timeArr.map((item, idx) => {
                return (
                  <SwiperSlide key={`${idx + 1}번째 슬라이드`}>
                    <Site2_item_box data={item} time={time} />
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