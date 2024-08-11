// function getFirstAPI(API_KEY, currentDate, currentTime, currentLocation) { // 1시간 마다
//   let getTime = String(currentTime - 100);
//   let beforeOneHour = getTime.length > 3 ? getTime : '0'.repeat(4 - getTime.length) + getTime;

//   return new Promise((resolve, reject) => {
//     var xhr1 = new XMLHttpRequest();
//     var url1 = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'; 
//     /* URL */
//     var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `${API_KEY}`; 
//     /* Service Key */
//     queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
//     queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000');
//     queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
//     queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(currentDate);
//     queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(`${beforeOneHour}`); // 현재시간 예보 포함하려면 1시간 전 시각으로 시간 대입
//     queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(`${currentLocation["격자 X"]}`);
//     queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(`${currentLocation["격자 Y"]}`);

//     xhr1.open('GET', url1 + queryParams, true);  // 비동기 요청을 위해 true로 설정

//     xhr1.onreadystatechange = function () { //send() 이후 작동
//       if (this.readyState == 4) {
//         if (this.status == 200) {
//           // 요청이 성공했을 때 응답 처리
//           console.log('Status: 1', this.status);
//           // console.log('Headers:', this.getAllResponseHeaders());
//           // console.log('Body:', this.responseText);
//           sessionStorage.setItem('res1', this.responseText)
//           return resolve(this.responseText);
//         } else {
//           // 요청이 실패했을 때 오류 처리
//           console.error('Request failed. Status:', this.status);
//           console.error('Response:', this.responseText);
//           return reject(0);
//         }
//       }
//     }
//     xhr1.send(); // Http 전송 역할
//   })
// }


// ----------------- 코드 수정 -----------------

// 변수 더미
// const setParam = {};
// setParam['serviceKey'] = 'dviGmZuftX3h7VNSS2UVxZ1M7AfjXEQRTTQVoMhes28TPZETMMXENDJ%2FT60N5MkIHuZGTVGLZqYBfbZTwGUPUw%3D%3D';
// setParam['pageNo'] = 1
// setParam['numOfRows'] = 1000
// setParam['dataType'] = 'JSON'
// setParam['base_date'] = '20230810';
// setParam['base_time'] = `0600`;
// setParam['nx'] = `60`;
// setParam['ny'] = `127`; // 종로구

async function getFirstAPI(API_KEY, currentDate, currentTime, currentLocation) { // 1시간 마다
  let getTime = String(currentTime - 100);
  let beforeOneHour = getTime.length > 3 ? getTime : '0'.repeat(4 - getTime.length) + getTime;

  // URL
  const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';

  // 쿼리스트링
  const setParam = {};
  setParam['serviceKey'] = API_KEY;
  setParam['pageNo'] = 1
  setParam['numOfRows'] = 1000
  setParam['dataType'] = 'JSON'
  setParam['base_date'] = `${currentDate}`;
  setParam['base_time'] = `${beforeOneHour}`;
  setParam['nx'] = `${currentLocation["격자 X"]}`;
  setParam['ny'] = `${currentLocation["격자 Y"]}`; // 종로구

  let queryString = Object.keys(setParam).reduce((prev, curr) => prev + curr + '=' + setParam[curr] + '&', '?');
  queryString = queryString.substring(0, queryString.length - 1);

  // fetch
  let response;
  try {
    response = await fetch(url + queryString);
    const data = await response.json();
    console.log(data.response.header);
    if (data.response.header.resultCode !== '00') {
      // 에러 문구 'Error Code (숫자코드), (오류내용)'
      throw new Error(`Code ${data.response.header.resultCode}, ${data.response.header.resultMsg}`);
    }
    return data;
  } catch (err) {
    console.error('first_api.js', err);
  }
}

export default getFirstAPI