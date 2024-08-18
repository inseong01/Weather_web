import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import NoneGeolocation from './NoneGeolocation';

function reloadPopup(setReload) {
  setReload(true);
}
function setDefaultGeolocation(setGeoLocation) {
  const defaultGeolocation = ['error', [37, 41, 126, 45]];
  setGeoLocation(defaultGeolocation);
}

function Reload({ loading, pageError, setGeoLocation }) {
  const [reload, setReload] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    timeout.current = setTimeout(reloadPopup, 6000, setReload, loading);
  }, []);

  // 응답시간
  useEffect(() => {
    if (loading === true) return;
    clearTimeout(timeout.current);
  }, [loading]);
  // reload
  useEffect(() => {
    if (pageError.noneGeolocationError === false) return;
    setTimeout(setDefaultGeolocation, 1800, setGeoLocation);
    setTimeout(() => {
      setReload(false);
    }, 6500);
  }, [pageError]);

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
