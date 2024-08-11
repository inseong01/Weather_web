/* eslint-disable */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const dayArr = ['일', '월', '화', '수', '목', '금', '토'];

function calculate7Days() {
  const dayNumber = new Date().getDay();
  return dayArr.map((_, index) => dayArr[(dayNumber + index) % 7]);
}

export default function Site3_item_box({ data, idx, icons }) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(calculate7Days());
  }, []);

  const day = days[idx + 1];
  const amIcon = icons[idx][0].value;
  const pmIcon = icons[idx][1].value;

  return (
    <div className="item_box">
      <p className="day">{day}</p>
      <div className="dayInfo_wrap">
        <div className="icon" style={{ backgroundImage: amIcon }}></div>
        <div className="icon" style={{ backgroundImage: pmIcon }}></div>
        <div className="lowTemp">{data.taMin}°</div>
        <div className="highTemp">{data.taMax}°</div>
      </div>
    </div>
  );
}

Site3_item_box.propTypes = {
  data: PropTypes.object,
  idx: PropTypes.number,
  icons: PropTypes.array,
};
