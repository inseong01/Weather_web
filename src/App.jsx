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

  const onChangeInput = (e) => { // 엑셀 파일 업로드
    const files = e.target.files;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();

      reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
  
        const firstSheetName = workbook.SheetNames[0]; // 시트 이름
        const worksheet = workbook.Sheets[firstSheetName]; // 시트이름의 데이터
        const json = XLSX.utils.sheet_to_json(worksheet);
  
        if (file.name.includes('vilageFcst')) {
          setVilageFcstMapData(json);
        } else if (file.name.includes('midFcst')) {
          setMidFcstMapData(json);
        }
      }
      reader.readAsArrayBuffer(file);
    })
  }
  const onClickInput = () => { // 엑셀파일, localStorage 추가
    localStorage.setItem('vilageFcstMapData', JSON.stringify(vilageFcstMapData));
    localStorage.setItem('midFcstMapData', JSON.stringify(midFcstMapData));
  }
  
  useEffect(() => { // 새로고침 마다 데이터 가져옴
    const vilageFcstMapData = localStorage.getItem('vilageFcstMapData');
    const midFcstMapData = localStorage.getItem('midFcstMapData');
    setVilageFcstMapData(JSON.parse(vilageFcstMapData));
    setMidFcstMapData(JSON.parse(midFcstMapData));

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
      defaultGeoloacation = ['error', [latitude.toFixed(6), longitude.toFixed(6)]]; // 예) 종로 청운효자동
      setGeolacationRejectRes(defaultGeoloacation);
      // console.log('getGeolocationo set default');
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [])
  
  useEffect(() => {
    if (!geolocationSuccessRes && !geolocationRejectRes) return;
    let res = geolocationSuccessRes || geolocationRejectRes; // ["success", [위도, 경도]]
    let geolocationArr = geolocationCalculator(res[1]); // [위도_d, 위도_f, 경도_d, 경도_f]
    setGeolacation([res[0], geolocationArr]);
  }, [geolocationSuccessRes, geolocationRejectRes])
  
  return (
    <>
      <div className="fileLoad_wrap">
        <input type="file" className='upload' onChange={onChangeInput} multiple />
        <button className="loadData" onClick={onClickInput}>업로드</button>
      </div>
      {
        !geolocation ? <AppMsg /> :
        <Home vilageFcstMapData={vilageFcstMapData} midFcstMapData={midFcstMapData} geolocation={geolocation[1]} geolocationRes={geolocation[0]} /> 
      }
    </>
  )
}

export default App
