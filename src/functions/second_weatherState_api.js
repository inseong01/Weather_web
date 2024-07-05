const GetSecond_weatherState_API = (key, currentDate) => { // 1일 2회(06, 18)
  return new Promise((resolev, reject) => {
    let xhr = new XMLHttpRequest();
    let url = 'http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst'; 
    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `${key}`; 
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
    queryParams += '&' + encodeURIComponent('regId') + '=' + encodeURIComponent('11B00000');
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