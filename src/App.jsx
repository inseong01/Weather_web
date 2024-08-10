import { useEffect, useState } from 'react';

import Home from './Page/Home';
import AppMsg from './components/appMsg';
import geolocationCalculator from './functions/geolocationCalculator';
import './App.css';

// geoLocation
let selectedOptionLocation;

function getGeoLocation(setGeoLocation) {
  const success = (e) => {
    // 허용
    const latitude = e.coords.latitude.toFixed(6); // 위도
    const longitude = e.coords.longitude.toFixed(6); // 경도
    selectedOptionLocation = ['success', [latitude, longitude]];
    selectedOptionLocation[1] = geolocationCalculator(selectedOptionLocation[1]); // 위경도 시분초 계산
    console.log('success', selectedOptionLocation);
    setGeoLocation(selectedOptionLocation);
  };
  const error = () => {
    // 거부
    // const latitude = 42.6909130654328; // 위도
    // const longitude = 35.754305253403; // 경도
    const latitude = 37.6909130654328; // 위도
    const longitude = 126.754305253403; // 경도
    selectedOptionLocation = ['error', [latitude.toFixed(6), longitude.toFixed(6)]];
    selectedOptionLocation[1] = geolocationCalculator(selectedOptionLocation[1]); // 위경도 시분초 계산
    console.log('getGeolocationo default', selectedOptionLocation);
    setGeoLocation(selectedOptionLocation);
  };

  navigator.geolocation.getCurrentPosition(success, error);
}

function App() {
  const [vilageFcstMapData, setVilageFcstMapData] = useState('');
  const [midFcstMapData, setMidFcstMapData] = useState('');
  const [geoLocation, setGeoLocation] = useState(null);

  useEffect(() => {
    if (geoLocation) return;
    // 새로고침 데이터 가져옴
    fetch('/data/midFcst_parameter_map.json')
      .then((response) => response.json())
      .then((data) => setMidFcstMapData(data))
      .catch((error) => console.error('Error fetching data:', error));
    fetch('/data/vilageFcst_lamc_parameter_map.json')
      .then((response) => response.json())
      .then((data) => setVilageFcstMapData(data))
      .catch((error) => console.error('Error fetching data:', error));

    getGeoLocation(setGeoLocation);
  }, [geoLocation]);

  return (
    <>
      {!geoLocation ? (
        <AppMsg />
      ) : (
        <Home
          vilageFcstMapData={vilageFcstMapData}
          midFcstMapData={midFcstMapData}
          geolocation={geoLocation[1]}
          geolocationRes={geoLocation[0]}
          setGeoLocation={setGeoLocation}
        />
      )}
    </>
  );
}

export default App;
