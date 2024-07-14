const GetXY_Position_API = (key, data) => { // local = '읍면동'
  let location = data.split(' ')[1];
  // console.log(data, location);
  return new Promise((resolev, reject) => {
    var xhr = new XMLHttpRequest();
    var url = 'https://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getTMStdrCrdnt'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+`${key}`; /*Service Key*/
    queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('json'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('3'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('umdName') + '=' + encodeURIComponent(location); /**/    
  
    xhr.open('GET', url + queryParams, true);  // 비동기 요청을 위해 true로 설정
  
    xhr.onreadystatechange = function () { //send() 이후 작동
      if (this.readyState == 4) {
        if (this.status === 200) {
          console.log('Status: XY_Position', this.status);
          sessionStorage.setItem('XY_Position', this.responseText);
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

export default GetXY_Position_API
