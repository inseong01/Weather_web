import { useEffect, useState } from 'react';
import './App.css'
import Home from './Page/Home'

function App() {
  const [vilageFcstMapData, setVilageFcstMapData] = useState('');
  const [midFcstMapData, setMidFcstMapData] = useState('');

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
  }, [])

  return (
    <>
      <div className="fileLoad_wrap">
        <input type="file" className='upload' onChange={onChangeInput} multiple />
        <button className="loadData" onClick={onClickInput}>업로드</button>
      </div>
      <Home vilageFcstMapData={vilageFcstMapData} midFcstMapData={midFcstMapData} />
    </>
  )
}

export default App
