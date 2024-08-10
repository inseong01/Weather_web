import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NoneGeolocation from './NoneGeolocation';

function reloadPopup(setReload, loading) {
  if (loading === false) return;
  setReload(true);
}
function setDefaultGeolocation(setGeoLocation) {
  const defaultGeolocation = ['error', [37, 41, 126, 45]];
  setGeoLocation(defaultGeolocation);
}

function Reload({ loading, pageError, setGeoLocation }) {
  const [reload, setReload] = useState(false);

  // 응답시간
  useEffect(() => {
    const timeOut = setTimeout(reloadPopup, 5000, setReload, loading);
    if (loading === false) {
      clearTimeout(timeOut);
    }
  }, [loading]);
  // reload
  useEffect(() => {
    if (reload === false) return;
    // setTimeout(setDefaultGeolocation, 1800, setGeoLocation);
    // setTimeout(() => {
    //   setReload(false);
    // }, 6500);
  }, [reload]);

  return (
    <>{reload ? <NoneGeolocation pageError={pageError} /> : <p className="msg">날씨 정보 가져오는 중..</p>}</>
  );
}

Reload.propTypes = {
  loading: PropTypes.bool,
  pageError: PropTypes.object,
  setGeoLocation: PropTypes.func,
};

export default Reload;
