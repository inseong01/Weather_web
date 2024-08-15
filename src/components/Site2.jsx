import { Swiper, SwiperSlide } from 'swiper/react';
import Site2_item_box from './Site2_item_box';
import PropTypes from 'prop-types';

import './site.css';
import 'swiper/css';

// 시간 별 온도
function getTimeArr(time, temperature, sky) {
  const timeTemperatureArr = [];
  console.log('temperature', temperature);
  for (let i = 0; i < sky.length; i++) {
    const TMP = temperature[i].TMP;
    const SKY = sky[i].SKY;
    const PTY = sky[i].PTY;

    timeTemperatureArr.push({ TMP, SKY, PTY });
  }
  return timeTemperatureArr;
}

export default function Site2({ time, temperature, sky }) {
  const timeStandard = time.slice(0, 2) + ':' + time.slice(2, 4);
  const timeArr = getTimeArr(time, temperature, sky);

  return (
    <>
      <div className="site2">
        <div className="item_box_wrap">
          <div className="title">
            시간 별 날씨 <span>{timeStandard} 기준</span>
          </div>
          <Swiper
            className="swiper"
            spaceBetween={30}
            slidesPerView={4}
            breakpoints={{
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
          >
            {timeArr.map((value, idx) => {
              return (
                <SwiperSlide key={`${idx + 1}번째 슬라이드`}>
                  <Site2_item_box data={value} time={time} idx={idx} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
}

Site2.propTypes = {
  time: PropTypes.string,
  temperature: PropTypes.array,
  sky: PropTypes.array,
};
