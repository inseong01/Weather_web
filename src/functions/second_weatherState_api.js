const locationCode = [
  { key: "11B00000", value: "서울, 인천, 경기도" },
  { key: "11D10000", value: "강원도영서" },
  { key: "11D20000", value: "강원도영동" },
  { key: "11C20000", value: "대전, 세종, 충청남도" },
  { key: "11C10000", value: "충청북도" },
  { key: "11F20000", value: "광주, 전라남도" },
  { key: "11F10000", value: "전라북도" },
  { key: "11H10000", value: "대구, 경상북도" },
  { key: "11H20000", value: "부산, 울산, 경상남도" },
  { key: "11G00000", value: "제주도" }
]
const gangwondoCode = [
  { key: "강원도영서", value: "원주 춘천 홍천 횡성 영월 평창 정선 양구 인제 화천 철원" },
  { key: "강원도영동", value: "강릉, 동해, 속초, 삼척, 태백, 양양, 고성" },
]
const getSecond_weatherState_API = async (API_KEY, currentDate, currentLocation, currentTime, yesterday) => { // 1일 2회(06, 18) 중기육상예보
  let regId;
  let firstLocation = currentLocation["1단계"].replace(/[도광역시특별시특별자치시]/g, ''); // 특별시 특별자치시 인식오류, 'g' 모두 처리
  let secondLocation = currentLocation["2단계"].replace(/[구군특별시특별자치시]/g, '');
  secondLocation = secondLocation.length !== 1 ? secondLocation : secondLocation + '구';

  if (firstLocation.includes('강원')) {
    let gangwondoLc = gangwondoCode.filter(code => code.value.includes(secondLocation));
    regId = locationCode.filter(code => code.value.includes(gangwondoLc[0].key))[0].key; // {key, value}
  } else {
    regId = locationCode.filter(code => code.value.includes(firstLocation))[0].key;
  }
  let tmFc = currentTime < "0600" ? yesterday + '1800' : currentDate + '0600';

  // URL
  const url = 'https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst';

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
    console.log(data.response.header);

    if (data.response.header.resultCode !== '00') {
      // 에러 문구 'Error Code (숫자코드), (오류내용)'
      throw new Error(`Code ${data.response.header.resultCode}, ${data.response.header.resultMsg}`);
    }
    return data;
  } catch (err) {
    console.error('getSecond_weatherState_API.js', err);
  }

  // ------------ 전 -------------

  // return new Promise((resolev, reject) => {
  //   let xhr = new XMLHttpRequest();
  //   let url = 'https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst'; 
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
  //         console.log('Status: 3', this.status);
  //         // console.log('Headers:', this.getAllResponseHeaders());
  //         // console.log('Body:', this.responseText);
  //         sessionStorage.setItem('res3', this.responseText);
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

export default getSecond_weatherState_API