const GetStaionName_API = (key, [data]) => {
  // console.log('GetStaionName_API', data)
  return new Promise((resolev, reject) => {
    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+`${key}`; /*Service Key*/
    queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /**/
    queryParams += '&' + encodeURIComponent('tmX') + '=' + encodeURIComponent(data.tmX); /**/
    queryParams += '&' + encodeURIComponent('tmY') + '=' + encodeURIComponent(data.tmY); /**/
    queryParams += '&' + encodeURIComponent('ver') + '=' + encodeURIComponent(''); /**/
  
    xhr.open('GET', url + queryParams, true);  // 비동기 요청을 위해 true로 설정
  
    xhr.onreadystatechange = function () { //send() 이후 작동
      if (this.readyState == 4) {
        if (this.status === 200) {
          console.log('Status: stationName', this.status);
          sessionStorage.setItem('stationName', this.responseText);
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
export default GetStaionName_API
