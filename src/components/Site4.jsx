import { useEffect, useState } from 'react';
import Site4_item_box from './Site4_item_box';
import PropTypes from 'prop-types';

const checkStationError = (data, setStationError) => {
  let stationState = Object.values(data).includes('통신장애');
  setStationError(stationState);
};

export default function Site4({ data, stationNotFound }) {
  const [stationError, setStationError] = useState(false);

  // 측정소 통신상태 확인
  useEffect(() => {
    if (!data[0]) return;
    checkStationError(data[0], setStationError);
  }, [data]);

  return (
    <>
      <div className="site4">
        <div className="item_box_wrap">
          {stationNotFound ? (
            <p>주변 측정소 없음</p>
          ) : stationError ? (
            <p>측정소 통신장애</p>
          ) : (
            <Site4_item_box data={data} setStationError={setStationError} />
          )}
        </div>
      </div>
    </>
  );
}

Site4.propTypes = {
  data: PropTypes.array,
  stationNotFound: PropTypes.bool,
};
