const locationCode = [
  {key: "11B00000",	value: "서울, 인천, 경기도"},
  {key: "11D10000",	value: "강원도영서"},
  {key: "11D20000",	value: "강원도영동"},
  {key: "11C20000",	value: "대전, 세종, 충청남도"},
  {key: "11C10000",	value: "충청북도"},
  {key: "11F20000",	value: "광주, 전라남도"},
  {key: "11F10000",	value: "전라북도"},
  {key: "11H10000",	value: "대구, 경상북도"},
  {key: "11H20000",	value: "부산, 울산, 경상남도"},
  {key: "11G00000",	value: "제주도"}
]
const gangwondoCode = [
  {key: "강원도영서", value: "영월, 평창, 정선, 화천, 양구"},
  {key: "강원도영동", value: "원주, 강릉, 동해, 삼척, 태백"},
]
const GetSecond_weatherState_API = (key, currentDate, currentLocation) => { // 1일 2회(06, 18) 중기육상예보
  let regId;
  let firstLocation = currentLocation["1단계"].replace(/[도광역시특별자치시특별시]/, '');
  let secondLocation = currentLocation["2단계"].replace(/[군시]/, '');
  if (firstLocation.includes('강원')) {
    let gangwondoLc = gangwondoCode.filter(code => code.value.includes(secondLocation));
    regId = locationCode.filter(code => code.value.includes(gangwondoLc))[0].key; // {key, value}
  } else {
    regId = locationCode.filter(code => code.value.includes(firstLocation))[0].key;
  }
  // console.log('firstLocation', firstLocation, 'regId', regId)

  return new Promise((resolev, reject) => {
    let xhr = new XMLHttpRequest();
    let url = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst'; 
    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `${key}`; 
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
    queryParams += '&' + encodeURIComponent('regId') + '=' + encodeURIComponent(`${regId}`); // 지역ID
    queryParams += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(`${currentDate}0600`);
  
    xhr.open('GET', url + queryParams, true);  // 비동기 요청을 위해 true로 설정
  
    xhr.onreadystatechange = function () { //send() 이후 작동
      if (this.readyState == 4) {
        if (this.status == 200) {
          // 요청이 성공했을 때 응답 처리
          console.log('Status: 3', this.status);
          // console.log('Headers:', this.getAllResponseHeaders());
          // console.log('Body:', this.responseText);
          sessionStorage.setItem('res3', this.responseText);
          resolev(this.responseText);
        } else {
          // 요청이 실패했을 때 오류 처리
          console.error('Request failed. Status:', this.status);
          console.error('Response:', this.responseText);
          reject(0);
        }
      }
    }
    xhr.send(); // Http 전송 역할
  })
}

export default GetSecond_weatherState_API