import { useEffect, useState } from 'react';
import './App.css'
import Home from './Page/Home'

function App() {
  const [vilageFcstMapData, setVilageFcstMapData] = useState('');

  const onChangeInput = (e) => { // 엑셀 파일 업로드
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, {type: 'array'});

      const firstSheetName = workbook.SheetNames[0]; // 시트 이름
      const worksheet = workbook.Sheets[firstSheetName]; // 시트이름의 데이터
      const json = XLSX.utils.sheet_to_json(worksheet);

      setVilageFcstMapData(json);
    }
    
    reader.readAsArrayBuffer(file);
  }
  const onClickInput = () => { // 엑셀파일, localStorage 추가
    localStorage.setItem('vilageFcstMapXY', JSON.stringify(vilageFcstMapData))
  }
  
  useEffect(() => { // 새로고침 마다 데이터 가져옴
    const mapData = localStorage.getItem('vilageFcstMapXY');
    setVilageFcstMapData(JSON.parse(mapData));
  }, [])

  return (
    <>
      <div className="fileLoad_wrap">
        <input type="file" className='upload' onChange={onChangeInput} />
        <button className="loadData" onClick={onClickInput}>업로드</button>
      </div>
      <Home geoLocationData={vilageFcstMapData} />
    </>
  )
}

export default App
