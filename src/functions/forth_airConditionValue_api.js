const GetForth_airConditionValue_API = (key, data) => {
  return new Promise((resolev, reject) => {
    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+`${key}`; /*Service Key*/
    queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('dataTerm') + '=' + encodeURIComponent('DAILY'); /**/
    queryParams += '&' + encodeURIComponent('stationName') + '=' + encodeURIComponent(`${data.stationName}`); /**/
    queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent('1.0'); /**/
  
    xhr.open('GET', url + queryParams, true);  // 비동기 요청을 위해 true로 설정
  
    xhr.onreadystatechange = function () { //send() 이후 작동
      if (this.readyState == 4) {
        if (this.status === 200) {
          console.log('Status: 5', this.status);
          sessionStorage.setItem('res5', this.responseText);
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
export default GetForth_airConditionValue_API
