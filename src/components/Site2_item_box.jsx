import PropTypes from 'prop-types';
import getWeatherIconName from '../functions/getWeatherIcon';

const translateTimeCode = (val, time) => {
  if (!val) return;
  return val === time ? '지금' : val.slice(0, 2) + ':' + val.slice(2, 4);
};

export default function Site2_item_box({ time, data }) {
  // data = {{TMP}, {SKY}, {PTY}}
  const current = translateTimeCode(data.TMP.fcstTime, time);
  const weatherIcon = getWeatherIconName(+data.SKY.fcstValue, +data.PTY.fcstValue);
  const temp = data.TMP.fcstValue; // 기온

  return (
    <>
      <div className="item_box">
        <p className="time">{current}</p>
        <div className="icon" style={{ backgroundImage: weatherIcon }}></div>
        <div className="temp">{temp}°</div>
      </div>
    </>
  );
}

Site2_item_box.propTypes = {
  time: PropTypes.string,
  data: PropTypes.object,
  idx: PropTypes.number,
};
