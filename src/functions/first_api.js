function getFirstAPI(API_KEY, currentDate, getCurrentTime) { // 1시간 마다
  let getTime = String(getCurrentTime() - 100);
  let currentTime = getTime.length > 3 ? getTime : '0'.repeat(4 - getTime.length) + getTime;
  
  return new Promise((resolve, reject) => {
    var xhr1 = new XMLHttpRequest();
    var url1 = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'; 
    /* URL */
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `${API_KEY}`; 
    /* Service Key */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000');
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(currentDate);
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(`${currentTime}`); // 현재시간 예보 포함하려면 1시간 전 시각으로 시간 대입
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('56');
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('129');

    xhr1.open('GET', url1 + queryParams, true);  // 비동기 요청을 위해 true로 설정

    xhr1.onreadystatechange = function () { //send() 이후 작동
      if (this.readyState == 4) {
        if (this.status == 200) {
          // 요청이 성공했을 때 응답 처리
          console.log('Status: 1', this.status);
          // console.log('Headers:', this.getAllResponseHeaders());
          // console.log('Body:', this.responseText);
          sessionStorage.setItem('res1', this.responseText)
          return resolve(this.responseText);
        } else {
          // 요청이 실패했을 때 오류 처리
          console.error('Request failed. Status:', this.status);
          console.error('Response:', this.responseText);
          return reject(0);
        }
      }
    }
    xhr1.send(); // Http 전송 역할
  })
}

export default getFirstAPI