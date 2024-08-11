const getSecondAPI_temp = async (API_KEY, currentDate, currentLocation, time, row) => { // 3시간 마다
  let nx = currentLocation["격자 X"];
  let ny = currentLocation["격자 Y"];
  let base_time = time ? time : '0200';
  let numOfRows = row ? row : '780'

  // URL
  const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

  // 쿼리스트링
  const setParam = {};
  setParam['serviceKey'] = API_KEY;
  setParam['pageNo'] = 1
  setParam['numOfRows'] = numOfRows
  setParam['dataType'] = 'JSON'
  setParam['base_date'] = currentDate;
  setParam['base_time'] = base_time;
  setParam['nx'] = nx;
  setParam['ny'] = ny; // 종로구

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
    console.error('getSecondAPI_temp.js', err);
  }

  // return new Promise((resolev, reject) => {
  //   var xhr2 = new XMLHttpRequest();
  //   var url2 = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; 
  //   /* URL */
  //   var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `${key}`; 
  //   /* Service Key */
  //   queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  //   queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(`${numOfRows}`);
  //   queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
  //   queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(`${currentDate}`);
  //   queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(`${base_time}`);
  //   queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(`${nx}`);
  //   queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(`${ny}`);

  //   xhr2.open('GET', url2 + queryParams, true);  // 비동기 요청을 위해 true로 설정

  //   xhr2.onreadystatechange = function () { //send() 이후 작동
  //     if (this.readyState == 4) {
  //       if (this.status == 200) {
  //         // 요청이 성공했을 때 응답 처리
  //         console.log('Status: 2_3', this.status);
  //         // console.log('Headers:', this.getAllResponseHeaders());
  //         // console.log('Body:', this.responseText);
  //         sessionStorage.setItem('res3_temp', this.responseText);
  //         resolev(this.responseText);
  //       } else {
  //         // 요청이 실패했을 때 오류 처리
  //         console.error('Request failed. Status:', this.status);
  //         console.error('Response:', this.responseText);
  //         reject(0);
  //       }
  //     }
  //   }
  //   xhr2.send(); // Http 전송 역할
  // })
}

export default getSecondAPI_temp