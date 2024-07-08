const getSecondAPI = (key, currentDate) => { // 3시간 마다
  return new Promise((resolev, reject) => {
    var xhr2 = new XMLHttpRequest();
    var url2 = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; 
    /* URL */
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + `${key}`; 
    /* Service Key */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('780');
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(`${currentDate}`);
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0200');
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('56');
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('129');
  
    xhr2.open('GET', url2 + queryParams, true);  // 비동기 요청을 위해 true로 설정
  
    xhr2.onreadystatechange = function () { //send() 이후 작동
      if (this.readyState == 4) {
        if (this.status == 200) {
          // 요청이 성공했을 때 응답 처리
          console.log('Status: 2', this.status);
          // console.log('Headers:', this.getAllResponseHeaders());
          // console.log('Body:', this.responseText);
          sessionStorage.setItem('res2', this.responseText);
          resolev(this.responseText);
        } else {
          // 요청이 실패했을 때 오류 처리
          console.error('Request failed. Status:', this.status);
          console.error('Response:', this.responseText);
          reject(0);
        }
      }
    }
    xhr2.send(); // Http 전송 역할
  })
}

export default getSecondAPI