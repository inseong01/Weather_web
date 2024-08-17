import './site.css';
import Site3_item_box from './Site3_item_box';
import mergeWeekData from '../functions/mergeWeekData';
import PropTypes from 'prop-types';
import getWeatherArr from '../functions/getWeatherArr';

export default function Site3({ data, weatherState, currentDate }) {
  // data = [{단기예보}, {주간최고/저온도}]
  // 주간 기온 최저/최고 병합
  const weekTempArr = mergeWeekData(data, currentDate);

  // ------------------ 여기까지 함 ------------------
  // 주간 날씨 기온/아이콘
  const weekWeatherArr = getWeatherArr(weatherState);

  return (
    <>
      <div className="site3">
        <div className="item_box_wrap">
          {weekTempArr.map((data, i) => {
            // wf8번째부터 AM/PM 없음
            return <Site3_item_box key={`${i}번째 주간날씨`} data={data} idx={i} icons={weekWeatherArr} />;
          })}
        </div>
      </div>
    </>
  );
}

Site3.propTypes = {
  data: PropTypes.object,
  weatherState: PropTypes.object,
  currentDate: PropTypes.string,
};
