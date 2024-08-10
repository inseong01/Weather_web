const GetThird_temperature_API = async (API_KEY, currentDate, currentLocation, midFcstMapData, currentTime, yesterday) => { // 1일 2회(06, 18) 중기기온예보
  let regId;
  let firstLc = currentLocation["1단계"].split(/[도특별시특별자치시광역시]/g)[0];
  let secondLc = currentLocation["2단계"].split(/[시군구특별자치시]/g)[0];
  secondLc = secondLc.length !== 1 ? secondLc : secondLc + '구';
  for (let i = 0; i < midFcstMapData.length; i++) {
    if (!midFcstMapData[i]["지역"].includes(firstLc) && !midFcstMapData[i]["지역"].includes(secondLc)) continue;
    regId = midFcstMapData[i]["코드"];
  }
  let tmFc = currentTime < "0600" ? yesterday + '1800' : currentDate + '0600';
  // console.log('tmFc2', regId, firstLc, secondLc);

  // URL
  const url = 'https://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa';

  // 쿼리스트링
  const setParam = {};
  setParam['serviceKey'] = API_KEY;
  setParam['pageNo'] = 1
  setParam['numOfRows'] = 10;
  setParam['dataType'] = 'JSON'
  setParam['regId'] = `${regId}`; // 지역ID
  setParam['tmFc'] = `${tmFc}`;

  let queryString = Object.keys(setParam).reduce((prev, curr) => prev + curr + '=' + setParam[curr] + '&', '?');
  queryString = queryString.substring(0, queryString.length - 1);

  // fetch
  let response;
  try {
    response = await fetch(url + queryString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('getSecond_weatherState_API.js', err);
  }

  // ------------ 전 -------------

  // return new Promise((resolev, reject) => {
  //   let xhr = new XMLHttpRequest();
  //   let url = 'https://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa'; 
  //   let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `${key}`; 
  //   queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  //   queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
  //   queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
  //   queryParams += '&' + encodeURIComponent('regId') + '=' + encodeURIComponent(`${regId}`); // 지역ID
  //   queryParams += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(`${tmFc}`);

  //   xhr.open('GET', url + queryParams, true);  // 비동기 요청을 위해 true로 설정

  //   xhr.onreadystatechange = function () { //send() 이후 작동
  //     if (this.readyState == 4) {
  //       if (this.status == 200) {
  //         // 요청이 성공했을 때 응답 처리
  //         console.log('Status: 4', this.status);
  //         // console.log('Headers:', this.getAllResponseHeaders());
  //         // console.log('Body:', this.responseText);
  //         sessionStorage.setItem('res4', this.responseText);
  //         resolev(this.responseText);
  //       } else {
  //         // 요청이 실패했을 때 오류 처리
  //         console.error('Request failed. Status:', this.status);
  //         console.error('Response:', this.responseText);
  //         reject(0);
  //       }
  //     }
  //   }
  //   xhr.send(); // Http 전송 역할
  // })
}

export default GetThird_temperature_API