import Site5_item_box_wrap from './Site5_item_box_wrap';
import PropTypes from 'prop-types';

const getFilterData = (data, currentTime) => {
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    const isMatch = data[i].category.match(/강수형태|하늘상태|기온/);
    const fcstTime = data[i].fcstTime;

    if (fcstTime !== currentTime) continue;
    if (isMatch) continue;
    arr.push(data[i]);
  }
  return arr;
};

export default function Site5({ data, currentTime }) {
  // 단기예보 = [{...}, {...} ...]
  const filteredDataArr = getFilterData(data, currentTime);

  return (
    <>
      <div className="site5">
        <div className="box_wrap">
          {filteredDataArr.map((item) => (
            <Site5_item_box_wrap key={item.category} data={item} />
          ))}
        </div>
      </div>
    </>
  );
}

Site5.propTypes = {
  data: PropTypes.array,
  currentTime: PropTypes.string,
};
