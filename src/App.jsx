import { useEffect, useState } from 'react';
import './App.css'
import Home from './Page/Home'
import AppMsg from './components/appMsg';
import geolocationCalculator from './functions/geolocationCalculator';

// geoLocation
let defaultGeoloacation;
let currentGeoloacation;
const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

function App() {
  const [vilageFcstMapData, setVilageFcstMapData] = useState('');
  const [midFcstMapData, setMidFcstMapData] = useState('');
  const [geolocationSuccessRes, setGeolacationSuccessRes] = useState(undefined);
  const [geolocationRejectRes, setGeolacationRejectRes] = useState(undefined);
  const [geolocation, setGeolacation] = useState(undefined);
  
  useEffect(() => { // 새로고침 마다 데이터 가져옴
  fetch('/data/midFcst_parameter_map.json')
    .then((response) => response.json())
    .then((data) => setMidFcstMapData(data))
    .catch((error) => console.error('Error fetching data:', error));
  fetch('/data/vilageFcst_lamc_parameter_map.json')
    .then((response) => response.json())
    .then((data) => setVilageFcstMapData(data))
    .catch((error) => console.error('Error fetching data:', error));

    // geoLocation
    const success = (e) => { // 허용
      let latitude = e.coords.latitude.toFixed(6); // 위도
      let longitude = e.coords.longitude.toFixed(6); // 경도
      currentGeoloacation = ['success', [latitude, longitude]];
      setGeolacationSuccessRes(currentGeoloacation);
      // console.log('success', currentGeoloacation);
    }
    const error = () => { // 거부
      let latitude = 37.6909130654328; // 위도
      let longitude = 126.754305253403; // 경도
      defaultGeoloacation = ['error', [latitude.toFixed(6), longitude.toFixed(6)]];
      setGeolacationRejectRes(defaultGeoloacation);
      // console.log('getGeolocationo set default');
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);
  
  useEffect(() => {
    if (!geolocationSuccessRes && !geolocationRejectRes) return;
    let res = geolocationSuccessRes || geolocationRejectRes; // ["success", [위도, 경도]]
    let geolocationArr = geolocationCalculator(res[1]); // [위도_d, 위도_f, 경도_d, 경도_f]
    setGeolacation([res[0], geolocationArr]);
  }, [geolocationSuccessRes, geolocationRejectRes])
  
  return (
    <>
      {
        !geolocation ? <AppMsg /> :
        <Home vilageFcstMapData={vilageFcstMapData} midFcstMapData={midFcstMapData} geolocation={geolocation[1]} geolocationRes={geolocation[0]} /> 
      }
    </>
  )
}

export default App
