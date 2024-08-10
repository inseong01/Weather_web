const getSecondAPI = async (API_KEY, currentDate, currentLocation, updateTime, row, yesterday, currentTime) => { // 3시간 마다
  const nx = currentLocation["격자 X"];
  const ny = currentLocation["격자 Y"];
  const base_time = updateTime ? updateTime : '2300';

  let numOfRows = row ? row : '780';
  let base_date = currentDate;
  if (currentTime < "0300") {
    base_date = yesterday;
    numOfRows = '1000';
  }
  // console.log('base_time', base_time, base_date)

  // URL
  const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

  // 쿼리스트링
  const setParam = {};
  setParam['serviceKey'] = API_KEY;
  setParam['pageNo'] = 1
  setParam['numOfRows'] = numOfRows;
  setParam['dataType'] = 'JSON'
  setParam['base_date'] = `${base_date}`;
  setParam['base_time'] = `${base_time}`;
  setParam['nx'] = `${nx}`;
  setParam['ny'] = `${ny}`;

  let queryString = Object.keys(setParam).reduce((prev, curr) => prev + curr + '=' + setParam[curr] + '&', '?');
  queryString = queryString.substring(0, queryString.length - 1);

  // fetch
  let response;
  try {
    response = await fetch(url + queryString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('second_api.js', err);
  }


  // ------------ 전 -------------

  // return new Promise((resolev, reject) => {
  //   var xhr2 = new XMLHttpRequest();
  //   var url2 = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; 
  //   /* URL */
  //   var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `${API_KEY}`; 
  //   /* Service Key */
  //   queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  //   queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(`${numOfRows}`);
  //   queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
  //   queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(`${base_date}`);
  //   queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(`${base_time}`);
  //   queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(`${nx}`);
  //   queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(`${ny}`);

  //   xhr2.open('GET', url2 + queryParams, true);  // 비동기 요청을 위해 true로 설정

  //   xhr2.onreadystatechange = function () { //send() 이후 작동
  //     if (this.readyState == 4) {
  //       if (this.status == 200) {
  //         // 요청이 성공했을 때 응답 처리
  //         console.log('Status: 2_1', this.status);
  //         // console.log('Headers:', this.getAllResponseHeaders());
  //         // console.log('Body:', this.responseText);
  //         sessionStorage.setItem('res2', this.responseText);
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

export default getSecondAPI